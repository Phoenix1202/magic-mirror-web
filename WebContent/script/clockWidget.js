/**
 * 
 */

var setClock = function() {
	var d = new Date();
	var arr = d.toTimeString().split(" ")[0].split(":");
	
	document.getElementById("clock-widget").innerHTML = arr[0] + ":" + arr[1] +"<span style='font-size: 0.67em'>:"+arr[2] + "</span>";
}

var initClock = function() {
	setInterval(setClock, 1000);
}