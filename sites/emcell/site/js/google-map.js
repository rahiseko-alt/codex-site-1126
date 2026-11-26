var map;



var styles = [
    {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      { hue: '#cdcdcd' },
      { saturation: -100 },
      { lightness: 18 },
      { visibility: 'on' }
    ]
  },{
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      { hue: '#e8e8e8' },
      { saturation: -100 },
      { lightness: 18 },
      { visibility: 'on' }
    ]
  },{
    featureType: 'road',
    elementType: 'all',
    stylers: [
      { hue: '#fdfdfd' },
      { saturation: -100 },
      { lightness: -1 },
      { visibility: 'on' }
    ]
  },{
    featureType: 'road.local',
    elementType: 'all',
    stylers: [
      { hue: '#fdfdfd' },
      { saturation: -100 },
      { lightness: -1 },
      { visibility: 'on' }
    ]
  },{
    featureType: 'poi.park',
    elementType: 'all',
    stylers: [
      { hue: '#c0c0c0' },
      { saturation: -100 },
      { lightness: -3 },
      { visibility: 'on' }
    ]
  },{
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      { hue: '#c0c0c0' },
      { saturation: -100 },
      { lightness: -3 },
      { visibility: 'on' }
    ]
  },{
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      { hue: '#ffffff' },
      { saturation: -100 },
      { lightness: -9 },
      { visibility: 'on' }
    ]
  }

  ];




function initializeMap() {


	if( window.innerWidth > 770 ) {
		var mapZoom = 12;
	}
	else {
		var mapZoom = 11;
	}


  var mapOptions = {
    zoom: mapZoom,
    center: new google.maps.LatLng(50.3496444,30.4740976),
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.BOTTOM_RIGHT
    },
    disableDefaultUI: true,
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
    },
    scaleControl: true,
    streetViewControl: false
    
    
  };

  map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);

  var styledMapOptions = {
      name: "EmCell"
  }

  var jayzMapType = new google.maps.StyledMapType(
      styles, styledMapOptions);

  map.mapTypes.set('bestfromgoogle', jayzMapType);
  map.setMapTypeId('bestfromgoogle');
  

  //setMarkers(map,mapContent);


  latlngset = new google.maps.LatLng(50.3496444,30.4740976);
         
         /*var companyImage = new google.maps.MarkerImage('img/map_boolet.svg',
            new google.maps.Size(16,24),
            new google.maps.Point(0,0),
            new google.maps.Point(8,22)
        );*/

        var companyImage = {
            url: '/img/map_boolet.svg',
            size: new google.maps.Size(84, 84),
            scaledSize: new google.maps.Size(84, 84),
            labelOrigin: new google.maps.Point(24, 84)
        };
         

         
        var marker = new google.maps.Marker({  
            map: map, 
            title: 'EmCell', 
            icon: companyImage,
            position: latlngset
            

        });
            
          map.setCenter(marker.getPosition())
				
}










