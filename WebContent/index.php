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
</head>
<body>
	<script>

		var birthDay = 12;
		var birthMonth = 1;

		initClockWidget();
		initWeatherWidget("545299");
		initTemperatureWidget("28-000008597ee4", 5000);
		initMessageWidget("Why, hello there!");
		setInterval(function() {
			var today = new Date();
			var h = today.getHours();

			if(today.getMonth() == 11 && today.getDate() > 23 today.getDate() < 27) {
				setMessage("Merry Christmas!");
			} else if(today.getMonth() == 0 && today.getDate() == 1 && today.getHours() > 2) {
				setMessage("Happy New Year!");
			} else if(today.getMonth() == birthMonth && today.getDate() = birthDay) {
				setMessage("Happy Birthday!");
			} else if(h > 4 && h < 11) {
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
			} else {
				setMessage("You look splendid today!")
			}
		}, 5000);
	</script>
</body>
</html>
<!-- full weather query: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20545299%20and%20u='c'&format=json&callback=callbackFunction" -->
