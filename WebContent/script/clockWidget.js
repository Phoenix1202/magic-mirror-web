/**
 * Widget that displays the current time. Updates every second.
 */
var month = new Array(12);
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var clockDiv;
var uClock = function setClock() {
	var d = new Date();
	var timeArray = d.toTimeString().split(" ")[0].split(":");

	var dateSpan = document.createElement("span");
	dateSpan.id = "clock-date";
	dateSpan.innerHTML = weekday[d.getDay()].substring(0,3) + ", " +   d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear();
	clockDiv.innerHTML = "";
	clockDiv.appendChild(dateSpan)
	clockDiv.innerHTML += timeArray[0] + ":" + timeArray[1] +"<span style='font-size: 0.5em'>:"+timeArray[2] + "</span>";
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
	document.getElementsByClassName('container')[0].appendChild(div);
	clockDiv = div;
	setInterval(uClock, 1000);
}
