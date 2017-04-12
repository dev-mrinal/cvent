/*
*	Author: Mrinal Mondal
*	===========================================================================
*/

'use strict';
//Create cvent module
var cvent = (function () {
  
  return {
    cventWeather: function (theUrl) {
   
   
       var xmlHttp = new XMLHttpRequest();
       xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		{
			var data = JSON.parse(xmlHttp.responseText);
			 
			var divId = '';
		
			//Get image url
			var m,
			imgUrls = [], 
			str = data.query.results.channel.item.description,
			rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

			while ( m = rex.exec( str ) ) {
			imgUrls.push( m[1] );
			}
			
			
			//Set data
			var loc      = data.query.results.channel.title;
			var temp     = data.query.results.channel.item.condition.temp; 
		    var img      = imgUrls[0];
			var con      = data.query.results.channel.item.condition.text; 
		    var forcasts = data.query.results.channel.item.forecast;
		
		    //Adding template
            divId += '<div class="cvent-location">'+loc+'</div>';
			divId += '<div class="cvent-weather"><span class="cvent-temparature">'+temp+'</span><span class="cvent-deg">&deg;</span><img  src="'+img+'"  class="cvent-weatherimg" ><span class="cvent-condition">'+con+'</span></div>';
			divId +='<ul class="cvent-forcasts">';
		    forcasts.map(function(forcast) { divId +='<li><span>'+forcast.day+'<br>'+forcast.high+'&deg;/'+ forcast.low +'</span></li>';}); 
		    divId +='</ul><div class="cvent-clear"></div>';
		
		
		    //Binding data to HTMLDOM
			var elements = document.getElementsByClassName("cvent-widget");
			var id = '';
			for(var i=0; i<elements.length; i++) {
			 document.getElementById(elements[i].id).innerHTML = divId;
			}
			 
			 
			 	
			 
		}
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
   
   
    }
  };

})();

//Define API
var theUrl  = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22fairfax%2C%20va%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithke';

//Calling weather method
cvent.cventWeather(theUrl);
  
  

