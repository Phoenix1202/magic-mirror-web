/*
 * Widget that displays weather information pulled from Yahoo! Weather. Updates every minute.
 */

var url="https://query.yahooapis.com/v1/public/yql?q=";
var scriptId = "weatherScript";
var weatherData;
var night = false;
var youAreHere;
var weatherWidgetInitialized = false;
var weatherInit = false;
/*
 * Callback function for query
 */
function updateWeather(data) {
//	alert(JSON.stringify(data.query.results));
	var time = null;
	var code = -1;
	var sunrise = 0;
	var sunset = 0;
	var temp = "--";
	var text = "Unavailable";
	var high = "-";
	var low = "-";
	weatherData = data;
	var oldText = document.getElementById("weather-condition").innerHTML;
	if(data.query.results != null) {
		var location = data.query.results.channel.location;
		var condition = data.query.results.channel.item.condition;
		var forecast = data.query.results.channel.item.forecast[0];
		var time = data.query.results.channel.lastBuildDate;
		var code = condition.code;
		var high = forecast.high;
		var low = forecast.low;
		time = data.query.results.channel.lastBuildDate;
		code = condition.code;
		sunrise = parseInt(data.query.results.channel.astronomy.sunrise.split(":")[0]);
		sunset = parseInt(data.query.results.channel.astronomy.sunset.split(":")[0]) + 12;
		temp = condition.temp;
		text = condition.text;
	}
	if(data.query.results != null || (data.query.results == null && oldText == "")) {
		document.getElementById("weather-condition").innerHTML = text;
		document.getElementById("weather-temp").innerHTML = temp + "°<div class='weather-extremes'>" + high + "°<br>" + low + "°</div>";
		document.getElementsByClassName("container")[0].removeChild(document.getElementById(scriptId));
		document.getElementById("weather-icon").className = getWeatherIconClass(code);
	}

	if(data.query.results != null) {
		setTimeout(uWeather, 60000)
	} else {
		setTimeout(uWeather, 5000)
	}

	if(!weatherInit) {
		weatherInit = true;
		document.dispatchEvent(new Event("init"));
	}
};

/*
 * Send weather query
 */
var uWeather = function fetchWeather() {
	var query = "select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20" + youAreHere + "%20and%20u='c'&format=json";
	var src =  url +query+"&callback=updateWeather";
	var script = document.createElement("script");
	
	script.id = scriptId;
	script.src = src;

	document.getElementsByClassName('container')[0].appendChild(script);
}

function initWeatherWidget(woeId) {
	var parent = document.createElement("div");
	weatherWidget = parent;
	var icon = document.createElement("div");
	var temp = document.createElement("div");
	var condition = document.createElement("div");
	var style = document.createElement("link");
	
	parent.id = "weather-widget";
	parent.className = "widget"
	
	temp.id = "weather-temp";
	icon.id = "weather-icon";
	condition.id = "weather-condition";
	
	style.rel = "stylesheet";
	style.type = "text/css";
	style.href = "css/weatherWidget.css";
	
	parent.appendChild(icon);
	parent.appendChild(temp);
	parent.appendChild(condition);
	

	document.getElementsByTagName('head')[0].appendChild(style);
	document.getElementsByClassName('container')[0].appendChild(parent);
	
	youAreHere = woeId;

	setTimeout(uWeather);
}

function getWeatherIconClass(code) {
	if(code >= 0) {
		return "wi " + "wi-yahoo-" + code;
	} else {
		return "wi " + "wi-na";

	}
}

var isNight = function() {
	return night;
}

var isCold = function() {
	return parseInt(weatherData.query.results.channel.item.condition.temp) < 10;
}

var isRaining = function() {
	var c = parseInt(weatherData.query.results.channel.item.condition.condition.code);
	return c == 11 || c == 12 || c == 40 || c == 5 || c == 6 || c == 7 || c == 8 || c == 9 || c == 10 || c == 11 || c == 12 || c == 35 || c == 40;
}

var isStorm = function() {
	var c = parseInt(weatherData.query.results.channel.item.condition.condition.code);
	return c == 3 || c == 4 || c == 37 || c == 38 || c == 39 || c == 45 || c == 47;
}