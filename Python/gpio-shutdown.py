#!/usr/bin/env python

import RPi.GPIO as gpio
import os
import subprocess

PIN_NUMBER = 15

gpio.setmode(gpio.BCM)
gpio.setup(PIN_NUMBER, gpio.IN)

listen = True

while listen:
	input_value = gpio.input(PIN_NUMBER)
	if input_value == False:
		listen = False	
		subprocess.call("shutdown now", shell=True)
	
