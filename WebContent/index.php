<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>H.A.N.A. Dashboard</title>
<script src="https://apis.google.com/js/client.js?onload=checkAuth"></script>
<link rel="stylesheet" type="text/css" href="./css/styles.css">
<link rel="stylesheet" type="text/css" href="./css/weather-icons.css">
<script type="text/javascript" src="./script/weatherWidget.js"></script>
<script type="text/javascript" src="./script/clockWidget.js"></script>
<script type="text/javascript" src="./script/messageWidget.js"></script>
<script type="text/javascript" src="./script/temperatureWidget.js"></script>
<script type="text/javascript" src="./script/calendarWidget.js"></script>
</head>
<body>
	<div class="load-screen">
		<div class="flower">
			<div class="petal-container"><div class="petal"></div></div>
			<div class="petal-container"><div class="petal"></div></div>
			<div class="petal-container"><div class="petal"></div></div>
			<div class="petal-container"><div class="petal"></div></div>
			<div class="petal-container"><div class="petal"></div></div>
			<div class="petal-container"><div class="petal"></div></div>
		</div>
		<p>H.A.N.A.<span class="version-number">v0.1</span></p>
	</div>
	<div class="container"></div>
	<script>

		var birthDay = 12;
		var birthMonth = 1;

		document.addEventListener("init", function(e) {
			if(weatherInit && temperatureInit) {
			document.getElementsByTagName("body")[0].style ="transform: translateY(-100vh)";
			}
		}, false);

		initClockWidget();
		initWeatherWidget("545299");
		initTemperatureWidget("28-000008597ee4", 5000);
		initMessageWidget("Why, hello there!");
		initCalendarWidget();
		setInterval(function() {
			var today = new Date();
			var h = today.getHours();

			if(today.getMonth() == 11 && today.getDate() > 23 && today.getDate() < 27) {
				setMessage("Merry Christmas!");
			} else if(today.getMonth() == 0 && today.getDate() == 1 && today.getHours() > 2) {
				setMessage("Happy New Year!");
			} else if(today.getMonth() == birthMonth && today.getDate() == birthDay) {
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
			} else if(h > 17 && h <= 22) {
				setMessage("Good evening.")
			} else if(h >= 23) {
				setMessage("You should consider going to bed.")
			} else if(h >= 0 && h <= 4) {
				setMessage("GO. TO. SLEEP!")
			} else {
				setMessage("You look splendid today!")
			}
		}, 5000);
	</script>
</body>
</html>
<!-- full weather query: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20545299%20and%20u='c'&format=json&callback=callbackFunction" -->
