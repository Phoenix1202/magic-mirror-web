/**
 * Widget that displays the current time. Updates every second.
 */


var uClock = function setClock() {
	var d = new Date();
	var arr = d.toTimeString().split(" ")[0].split(":");
	
	document.getElementById("clock-widget").innerHTML = arr[0] + ":" + arr[1] +"<span style='font-size: 0.67em'>:"+arr[2] + "</span>";
}

function initClockWidget() {
	var div = document.createElement("div");
	var style = document.createElement("link");
	
	div.id = "clock-widget";
	div.className ="widget";
	
	style.rel = "stylesheet";
	style.type = "text/css";
	style.href = "css/clockWidget.css";
	
	document.getElementsByTagName('head')[0].appendChild(style);
	document.getElementsByTagName('body')[0].appendChild(div);
	
	setInterval(uClock, 1000);
}