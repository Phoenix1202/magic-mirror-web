<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Smart Home Weather Central</title>
<link rel="stylesheet" type="text/css" href="./css/styles.css">
<link rel="stylesheet" type="text/css" href="./css/weather-icons.css">
<script type="text/javascript" src="./script/weatherWidget.js"></script>
<script type="text/javascript" src="./script/clockWidget.js"></script>
<script type="text/javascript" src="./script/messageWidget.js"></script>	
<script type="text/javascript" src="./script/temperatureWidget.js"></script>
<script type="text/javascript" src="./script/calendarWidget.js"></script>
</head>
<body>
	<script>
		initClockWidget();
		initWeatherWidget("545299");
		initTemperatureWidget("28-000008597ee4", 5000);
		initMessageWidget("Why, hello there!");
		initCalendarWidget();
		setInterval(function() {
			var h = new Date().getHours();
			
			if(h > 4 && h < 11) {
				setMessage("Good morning!");
					if(isCold()) {
					appendMessage(" Don't forget your coat today.");
				}
				if(isRaining()) {
					appendMessage(" I suggest taking an umbrella when heading out.");
				}
				if(isRaining()) {
					appendMessage(" Storms ahead. Be careful.");
				}
			} else if(h > 17 && h < 22) {
				setMessage("Good evening.")
			} else if(h >= 23) {
				setMessage("You should consider going to bed.")
			} else if(h > 0 && h <= 4) {
				setMessage("GO. TO. SLEEP!")
			}
	

		}, 5000);
	</script>
</body>
</html>
<!-- full weather query: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20545299%20and%20u='c'&format=json&callback=callbackFunction" -->