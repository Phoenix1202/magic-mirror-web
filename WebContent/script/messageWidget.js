/**
 * Widget that displays a mesage at the center of the screen
 */

function initMessageWidget(message) {
	var div = document.createElement("div");
	var style = document.createElement("link");
	
	div.id = "message-widget";
	div.className = "widget";
	div.innerHTML = message;
	
	style.rel = "stylesheet";
	style.type = "text/css";
	style.href = "css/messageWidget.css";
	

	document.getElementsByTagName('head')[0].appendChild(style);
	document.getElementsByTagName('body')[0].appendChild(div);
}

function getMessage() {
	return document.getElementById("message-widget").innerHTML;
}

function setMessage(message) {
	if(getMessage != message) {
		document.getElementById("message-widget").innerHTML = message;
	}
}

function appendMessage(message) {
	var currentMsg = getMessage();
	if(currentMsg == null || currentMsg.indexOf(message)) {
		document.getElementById("message-widget").innerHTML += message;
	}
}