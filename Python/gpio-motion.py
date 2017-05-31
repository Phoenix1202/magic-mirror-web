#!/usr/bin/env python

import RPi.GPIO as gpio
import os
import subprocess
import time

PIN_NUMBER = 14

gpio.setmode(gpio.BCM)
gpio.setup(PIN_NUMBER, gpio.IN)

os.environ["DISPLAY"] = ":0"
os.environ["XAUTHORITY"] = "/home/pi/.Xauthority"

listen = True
while listen:
	input_value = gpio.input(PIN_NUMBER)
	if(input_value == 1):
		subprocess.call("xset s dpms force on", shell=True)
	time.sleep(0.5)
