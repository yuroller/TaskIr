/*
 * IRremote
 * Porting of https://github.com/shirriff/Arduino-IRremote
 */

#include "ir.h"
#include "HWlib.h"
#include "Delay.h"
 
// 10us units
#define RC5_T1    89
#define RC5_RPT_LENGTH  4600

// Pulse parms are *50-100 for the Mark and *50+100 for the space
// First MARK is the one after the long gap
// pulse parameters in 10us units
#define NEC_HDR_MARK  900
#define NEC_HDR_SPACE 450
#define NEC_BIT_MARK  56
#define NEC_ONE_SPACE 160
#define NEC_ZERO_SPACE  56
#define NEC_RPT_SPACE 225

#define TOPBIT 0x80000000
static float PWM_DUTY = 33.333f;

static BYTE _io;
static BYTE _pwm;
static float _freq;

static void ir_enableIROut()
{
	IOInit(_io, out);
	IOPut(_io, OFF); // When not sending PWM, we want it low
	PWMInit(_pwm, _freq, PWM_DUTY);
}

static void ir_mark(DWORD time) {
	// Sends an IR mark for the specified number of units of 10us.
	// The mark output is modulated at the PWM frequency.
	PWMOn(_io, _pwm);
	Delay10us(time);
}

static void ir_space(DWORD time) {
	// Sends an IR space for the specified number of units of 10us.
	// A space is no output, so the PWM output is disabled.
	PWMOff(_pwm);
	Delay10us(time);
}

void ir_configure(BYTE io, BYTE pwm, float freq)
{
	_io = io;
	_pwm = pwm;
	_freq = freq;
}

// 36KHz
void ir_sendRC5(unsigned long data, int nbits)
{
	int i;
	ir_enableIROut();
	taskENTER_CRITICAL();
	data = data << (32 - nbits);
	ir_mark(RC5_T1); // First start bit
	ir_space(RC5_T1); // Second start bit
	ir_mark(RC5_T1); // Second start bit
	for (i = 0; i < nbits; i++) {
		if ((data & TOPBIT) != 0) {
			ir_space(RC5_T1); // 1 is space, then mark
			ir_mark(RC5_T1);
		} else {
			ir_mark(RC5_T1);
			ir_space(RC5_T1);
		}
		data <<= 1;
	}
	ir_space(0); // Turn off at end
	taskEXIT_CRITICAL();
}

// 38Khz
void ir_sendNEC(unsigned long data, int nbits)
{
	int i;
	ir_enableIROut();
	taskENTER_CRITICAL();
	ir_mark(NEC_HDR_MARK);
	ir_space(NEC_HDR_SPACE);
	for (i = 0; i < nbits; i++) {
		if ((data & TOPBIT) != 0) {
			ir_mark(NEC_BIT_MARK);
			ir_space(NEC_ONE_SPACE);
		} else {
			ir_mark(NEC_BIT_MARK);
			ir_space(NEC_ZERO_SPACE);
		}
		data <<= 1;
	}
	ir_mark(NEC_BIT_MARK);
	ir_space(0);	
	taskEXIT_CRITICAL();
}

