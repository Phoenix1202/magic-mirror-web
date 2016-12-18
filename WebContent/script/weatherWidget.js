/*
 * Widget that displays weather information pulled from Yahoo! Weather. Updates every minute.
 */

var url="https://query.yahooapis.com/v1/public/yql?q=";
var scriptId = "weatherScript";
var weatherData;
var night = false;

function updateWeather(data) {
	weatherData = data;
	var location = data.query.results.channel.location;
	var condition = data.query.results.channel.item.condition;
	var time = data.query.results.channel.lastBuildDate;
	var text = "Weather for "+  location.city + ", "+ location.country+" at " + time;
	var code = condition.code;
	var sunrise = parseInt(data.query.results.channel.astronomy.sunrise.split(":")[0]);
	var sunset = parseInt(data.query.results.channel.astronomy.sunset.split(":")[0]) + 12;
	document.getElementById("weather-condition").innerHTML = condition.text;
	document.getElementById("weather-temp").innerHTML = condition.temp + "°C<br>";
	document.body.removeChild(document.getElementById(scriptId));
	document.getElementById("weather-icon").className = getClassNameFromCode(code, sunrise, 23);
};

function fetchWeather(woeId) {
	var query = "select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20" + woeId + "%20and%20u='c'&format=json";
	var src =  url +query+"&callback=updateWeather";
	var script = document.createElement("script");
	
	script.id = scriptId;
	script.src = src;
	
	document.body.appendChild(script);
}

function initWeatherWidget(woeId) {
	var parent = document.createElement("div");
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
	
	parent.append(icon);
	parent.append(temp);
	parent.append(condition);
	
	document.head.append(style);
	document.body.append(parent);
	
	setInterval(fetchWeather(woeId),60000);
}

/* List of Yahoo Weather codes: https://developer.yahoo.com/weather/documentation.html#codes */
function getClassNameFromCode(code, sunrise, sunset) {
	var name = "wi-";
	
	var now = new Date().getHours();
	if(now <= sunrise || now > sunset) {
		name += "night-"
		night = true;
	} else {
		name += "day-"
		night: false;
	}
	
	switch (code) {
	case "3","4","37","38","39","45","47":
		name += "thunderstorm"
		break;
	case "5","6","7","8","9","10","35":
		name += "rain-mix"
		break;
	case "11","12","40":
		name += "showers"
		break;
	case "13","14","16","41","42","46":
		name += "snow"
		break;
	case "15":
		name += "snow-wind"
		break;
	case "18":
		name += "sleet"
		break;
	case "20","21":
		name += "fog"
		break;
	case "24":
		name += "windy"
	break;
	case "25","26","27","28","29","30":
		name += "cloudy"
	break;
	case "31":
		name = "wi-night-clear"
	break;
	case "32","33","34":
		name = "wi-day-sunny"
	break;
	case "36":
		name = "wi-hot"
	break;
	default:
		name += "na"
		break;
	}
	return "wi " + name;
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