#include "taskFlyport.h"

#include "time.h"
#include "ir.h"
#include "telesystems.h"

#define ARRAY_LEN(a) (sizeof(a)/sizeof(a[0]))

// delays in 10ms units
#define KEY_DELAY				40
#define POWER_ON_DELAY			2000
#define CHANNEL_CHANGE_DELAY	500
#define STOP_CONFIRM_DELAY		100
#define STOP_REC_DELAY			200

// circa 2009 relative to 1970
#define EPOCH_REFERENCE 1248245820
#define SNTP_SYNC_DELAY 50
#define TIMEZONE 1

static const unsigned long CHANNELS[] = {
	IR_0,
	IR_1,
	IR_2,
	IR_3,
	IR_4,
	IR_5,
	IR_6,
	IR_7,
	IR_8,
	IR_9
};

///////////////////////////////////////////////////////////////////////////
// Globals
///////////////////////////////////////////////////////////////////////////

BOOL g_dst = FALSE; // daylight saving time

///////////////////////////////////////////////////////////////////////////
// Misc
///////////////////////////////////////////////////////////////////////////

static time_t timeAdj(BOOL dst)
{
	int tz = TIMEZONE;
	if (dst) {
		++tz;
	}
	return tz * 60 * 60;
}

///////////////////////////////////////////////////////////////////////////
// IR
///////////////////////////////////////////////////////////////////////////

static void sendKey(unsigned long key)
{
	ir_sendRC5(IR_PRE_DATA_MASK | key, 32);
}

static void sendSequence(const unsigned long *sequence)
{
	while (*sequence != IR_NONE) {
		sendKey(*sequence);
		vTaskDelay(KEY_DELAY);
		sequence++;
	}
}

static void startRec(int ch, BOOL decoderOn)
{
	int i, skip;
	unsigned long seq[5];
	
	seq[4] = IR_NONE;
	for (i = 0; i < ARRAY_LEN(seq)-1; ++i) {
		seq[ARRAY_LEN(seq)-i-2] = CHANNELS[ch % 10];
		ch /= 10;
	}
	if (!decoderOn) {
		sendKey(IR_STANDBY);
		vTaskDelay(POWER_ON_DELAY);
	}
	skip = 0;
	for (i = 0; i < ARRAY_LEN(seq)-2; ++i) {
		if (seq[i] == IR_0) {
			skip++;
		}
	}
	sendSequence(seq + skip);
	vTaskDelay(CHANNEL_CHANGE_DELAY);
	sendKey(IR_REC);
	vTaskDelay(KEY_DELAY);
}

static void stopRec()
{
	sendKey(IR_STOP);
	vTaskDelay(STOP_CONFIRM_DELAY);
	sendKey(IR_OK);
	vTaskDelay(STOP_REC_DELAY);
	sendKey(IR_STANDBY);
	vTaskDelay(KEY_DELAY);
}

///////////////////////////////////////////////////////////////////////////
// FlyPortTask
///////////////////////////////////////////////////////////////////////////

void FlyportTask()
{
	char s[100];
	DWORD epoch = 0;
	time_t now_time = 0;
	struct tm *now_tm = NULL;
	struct tm clock_tm;
	
	vTaskDelay(100);
	UARTWrite(1, "Welcome to TaskIr program!\r\n");
	
	ir_configure(p2, 1, 36000.0f);
	// Flyport connects to default network
	WFConnect(WF_DEFAULT);
	while(WFGetStat() != CONNECTED)
		;
	UARTWrite(1, "Flyport Wi-fi G connected...hello world!\r\n");
	vTaskDelay(200);
	
	for (; epoch < EPOCH_REFERENCE; epoch = SNTPGetUTCSeconds()) {
		vTaskDelay(SNTP_SYNC_DELAY);
	}
	now_time = (time_t)epoch + timeAdj(g_dst);
	now_tm = gmtime(&now_time);
	RTCCSet(now_tm);
	
	sprintf(s, "The time is: %s\r\n", asctime(now_tm));
	UARTWrite(1, s);

	UARTWrite(1, "Start recording\r\n");
	startRec(3, FALSE);
	vTaskDelay(1000);
	UARTWrite(1, "Stop recording\r\n");
	stopRec();
	
	while(1)
	{
		RTCCGet(&clock_tm);
		sprintf(s, "The time is: %s\r\n", asctime(&clock_tm));
		UARTWrite(1, s);
		vTaskDelay(100);
	}
}
