/**
 * This widget reads and displays the temperature measured by a DS18B20 sensor.
 */

var base_dir = "/sys/bus/w1/devices/";
var sensor_id = null;
var inner = null;
var temperatureInit = false;

var uTemp = function updateTemperature() {
	var client = new XMLHttpRequest();
	client.open('GET', 'script/temperatureReader.php?addr='+sensor_id);
	client.onreadystatechange = function() {
	  inner.innerHTML = client.responseText+"°";
	}
	client.send();

	if(!temperatureInit) {
		temperatureInit = true;
		document.dispatchEvent(new Event("init"));
	}
}

function initTemperatureWidget(sensor_id, interval) {
	this.sensor_id = sensor_id;
	var div = document.createElement("div");
	var style = document.createElement("link");
	inner = document.createElement("div");

	div.id = "temperature-widget";
	div.className = "widget";
	div.appendChild(inner);

	style.rel = "stylesheet";
	style.type = "text/css";
	style.href = "css/temperatureWidget.css";

	document.getElementsByTagName('head')[0].appendChild(style);
	document.getElementsByClassName('container')[0].appendChild(div);

	setInterval(uTemp, interval);
}
