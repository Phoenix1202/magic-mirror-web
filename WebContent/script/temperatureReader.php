<?php
	$file = file_get_contents("/sys/bus/w1/devices/".$_GET["addr"]."/w1_slave");
	$temp = explode("t=",$file)[1];
	$temp_num = floatval($temp)/1000.0;
	$temp_num = round($temp_num,1);
	echo($temp_num);
?>