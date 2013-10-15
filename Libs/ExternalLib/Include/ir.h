#ifndef IR_H_
#define IR_H_

#include "GenericTypeDefs.h"

extern void ir_configure(BYTE io, BYTE pwm, float freq);
extern void ir_sendRC5(unsigned long data, int nbits);

#endif
