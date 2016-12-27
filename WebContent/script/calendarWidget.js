// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = "970074172582-5mrsrhmmfijtm9lgm67o3em35864qj2k.apps.googleusercontent.com";
var SCOPES = [ "https://www.googleapis.com/auth/calendar.readonly" ];
var calendarInit = false;
/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event}
 *            event Button click event.
 */
function initCalendarWidget() {

	this.sensor_id = sensor_id;
	calendarDiv = document.createElement("div");
	var style = document.createElement("link");
	calendarDiv.id = "calendar-widget";
	calendarDiv.className = "widget";

	style.rel = "stylesheet";
	style.type = "text/css";
	style.href = "css/calendarWidget.css";

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://apis.google.com/js/client.js?onload=checkAuth";

	document.getElementsByTagName('head')[0].appendChild(style);
	document.getElementsByClassName('container')[0].appendChild(calendarDiv);
	document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
	gapi.auth.authorize({
		'client_id' : CLIENT_ID,
		'scope' : SCOPES.join(' '),
		'immediate' : false
	}, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object}
 *            authResult Authorization result.
 */
function handleAuthResult(authResult) {
	var authorizeDiv = document.getElementById('authorize-div');
	if (authResult && !authResult.error) {
		loadCalendarApi();
	}
}
/**
 * Load Google Calendar client library. List upcoming events once client library
 * is loaded.
 */
function loadCalendarApi() {
	gapi.client.load('calendar', 'v3', listUpcomingEvents);
}


function listUpcomingEvents() {
//	alert(Date.now());

	var oneDay = 24*60*60*1000;
	var now = Date.now();
	var today = new Date(now - (now % oneDay) + oneDay);
	var tomorrow = new Date(today.getTime() + oneDay);

	var request = gapi.client.calendar.events.list({
		'calendarId' : 'primary',
		'timeMin' : (new Date(now)).toISOString(),
		'timeMax' : (new Date(now + 7*oneDay)).toISOString(),
		'showDeleted' : false,
		'singleEvents' : true,
		'orderBy' : 'startTime'
	});
	request.execute(function(resp) {
		var events = resp.items;
		calendarDiv.innerHTML = "";

		if (events.length > 0) {
			var eventDate = new Date(today - oneDay * 2);

			for (i = 0; i < events.length; i++) {
				var event = events[i];
				var curEventDate = event.start.date;

				if(!curEventDate) {
					curEventDate = event.start.dateTime;
					curEventDate = new Date(new Date(curEventDate).getTime() - (new Date(curEventDate).getTime() % oneDay));
				} else {
					curEventDate = new Date(event.start.date);
				}

				var eventDiv = calendarDiv.appendChild(document.createElement("div"));
				if(curEventDate > eventDate) {
					var eventDiv = calendarDiv.appendChild(document.createElement("div"));
					var dateSpan = document.createElement("span");
					eventDiv.className = "calendar-event";
					eventDiv.appendChild(dateSpan);
					eventDate = curEventDate;
					if(eventDate < today) {
						dateSpan.innerHTML = "Today";
						eventDiv.className += " calendar-today";
					} else if(eventDate < tomorrow) {
						dateSpan.innerHTML = "Tomorrow";
					} else {
						dateSpan.innerHTML = weekday[(new Date(eventDate)).getDay()];
					}
				}
				var when = event.start.dateTime;
				if (!when) {
					when = event.start.date;
					eventDiv.innerHTML += event.event.summary;
				} else {
					var eventTime = new Date(event.start.dateTime);
					var timeString = eventTime.toTimeString().split(" ")[0];
					eventDiv.innerHTML += timeString.split(":")[0] + ":" + timeString.split(":")[1] + " " +event.summary;
				}
			}
		} else {
			calendarDiv.innerHTML = "No upcoming events this week.";
		}
	});

	if(!calendarInit) {
		calendarInit = true;
		document.dispatchEvent(new Event("init"));
	}

	setTimeout(listUpcomingEvents, 60000);
}
