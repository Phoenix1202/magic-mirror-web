<?php
	$temp_num = "N/A";
	$path = "/sys/bus/w1/devices/".$_GET["addr"]."/w1_slave";
	
	if(file_exists($path)) {
		$file = file_get_contents();
		$temp = explode("t=",$file)[1];
		$temp_num = floatval($temp)/1000.0;
		$temp_num = round($temp_num,1);
	}
	
	echo($temp_num);
?>