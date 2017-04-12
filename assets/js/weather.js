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
			
			
			//Assign data
			var loc      = data.query.results.channel.title;
			var temp     = data.query.results.channel.item.condition.temp; 
		    var img      = imgUrls[0];
			var con      = data.query.results.channel.item.condition.text; 
		    var forcast  = data.query.results.channel.item.forecast;
		
		    //adding html
			
            divId += '<div class="location">'+loc+'</div>';
			divId += '<div class="weather"><span class="temparature">'+temp+'</span><span class="deg">&deg;</span><img  src="'+img+'"  class="weather-img" ><span class="condition">'+con+'</span></div>';
			divId +='<ul class="forcasts">';
			//divId += '<li><span>'+forcast[0].day+'<br>'+forcast[0].high+'&deg;/'+ forcast[0].low +'</span></li>';
			//divId += '<li><span>'+forcast[1].day+'<br>'+forcast[1].high+'&deg;/'+ forcast[1].low +'</span></li>';
			//divId += '<li><span>'+forcast[2].day+'<br>'+forcast[2].high+'&deg;/'+ forcast[2].low +'</span></li>';
			//divId += '<li><span>'+forcast[3].day+'<br>'+forcast[3].high+'&deg;/'+ forcast[3].low +'</span></li>';
            //divId += '<li><span>'+forcast[4].day+'<br>'+forcast[4].high+'&deg;/'+ forcast[4].low +'</span></li>';
            //divId += '<li><span>'+forcast[5].day+'<br>'+forcast[5].high+'&deg;/'+ forcast[5].low +'</span></li>';
	        //divId +='</ul><div class="clear"></div>';
        
			
			/*
	    return forcast.map(function(author) {
       // let li = createNode('li'),span = createNode('span');
        divId += `${author.day}`;
        //append(li, span);
        //append(ul, li);
        }); */

		var materialsLength3 = forcast.map(function(material) { divId +='<li><span>'+material.day+'<br>'+material.high+'&deg;/'+ material.low +'</span></li>';}); //8,6,7,9
		divId +='</ul><div class="clear"></div>';
		
		console.log(materialsLength3)

			
			/*
			for(var i=0;i<forcast.length;i++){
				for(var keys in forcast[i]){
				console.log(keys +"-->"+forcast[i].day);
				//divId +=   "<br/>"+ keys +"-->"+forcast[i][keys];
				divId += '<li><span>'+forcast[i].day+'<br>'+forcast[i].high+'&deg;/'+ forcast[i].low +'</span></li>';
				}
			}
		 */
			
		
		    //Binding data	
			var elements = document.getElementsByClassName("widget");
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

var theUrl  = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22fairfax%2C%20va%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithke';

//Calling weather method
cvent.cventWeather(theUrl);
  
  

