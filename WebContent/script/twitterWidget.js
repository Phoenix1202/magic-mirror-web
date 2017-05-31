function initTwitterWidget(widgetId, query) {
	var a = document.createElement("a");
	var style = document.createElement("link");
	a.setAttribute("class","twitter-timeline");
	a.setAttribute("data-dnt","true");
	a.setAttribute("data-chrome","nofooter transparent noscrollbar");
	a.href="https://twitter.com/search?q="+query;
	a.setAttribute("data-widget-id", widgetId);
//	a.innerHTML="Tweets about from:@matthewmercer OR from:@criticalrole OR from:@derstandardAt OR from:@arminwolf OR from:@roosterTeeth OR from:@themilesluna OR from:@kerryshawcross OR from:@snowden";
		
	style.rel = "stylesheet";
	style.type = "text/css";
	style.href = "css/twitterWidget.css";
	
	document.getElementsByTagName('head')[0].appendChild(style);
	document.getElementsByClassName('container')[0].appendChild(a);
	
	window.twttr = (doTwitterThings(document.getElementsByClassName("container")[0],"script","twitter-wjs")); 
}



function doTwitterThings(d,s,id){
	  var js, fjs = document.getElementsByTagName(s)[0],
	    t = window.twttr || {};
	  if (document.getElementById(id)) return t;
	  js = document.createElement(s);
	  js.id = id;
	  js.src = "https://platform.twitter.com/widgets.js";
	  fjs.parentNode.insertBefore(js, fjs);

	  t._e = [];
	  t.ready = function(f) {
	    t._e.push(f);
	  };

	  return t;
}	
