/**
 * 
 */

var getMessage = function() {
	return document.getElementById("message-widget").innerHTML;
}

var setMessage = function(message) {
	if(getMessage != message) {
		document.getElementById("message-widget").innerHTML = message;
	}
}

var appendMessage = function(message) {
	var currentMsg = getMessage();
	if(currentMsg == null || currentMsg.indexOf(message)) {
		document.getElementById("message-widget").innerHTML += message;
	}
}