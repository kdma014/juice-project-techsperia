
  
   // Multiple Markers on Map
   var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   
   var infoWindow = new google.maps.InfoWindow(), _marker, i;
  
   // Loop Through all the markers
   for( i = 0; i < markersData.length; i++ ) { 
     
     var position = new google.maps.LatLng(markersData[i]._lat, markersData[i].lng);
     
     _marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i]._name,
        icon: "http://1.bp.blogspot.com/-47r6BCV0Ra0/WauZKZ16D4I/AAAAAAAAaUs/DeHxrKSQLMEzD9W6y0GTPD9Rg1RQw3I7ACK4BGAYYCw/s58/maps-logo-marker-1_smaller.png"
     });
     
     
     google.maps.event.addListener(_marker, 'click', (function(marker, i) {
       
      var contentString = "";
      contentString += "<img src='http://2.bp.blogspot.com/-dvBmMkhmxt0/WaucBF6wptI/AAAAAAAAaVE/tISHuzCutRsRB-tTE83vX_rLhqURKqo1ACK4BGAYYCw/s400/logo-juice.png' style='width: auto;height: 12px; display: block; margin: 0 0; margin-bottom: 1em;'>";
      contentString += "<h3 style='margin: 0;'>" + markersData[i]._name + "</h3>";
      contentString += "<p class='addressline'>"+  markersData[i]._address +"</p>";
      contentString += "<ul style='list-style-type: none; padding: 0;'><li style='display: inline-block; margin-right: 5px;'><i class='fa fa-phone fa-fw'></i> <span>"+  markersData[i]._contact.split(",")[0] +"</span></li><li style='display: inline-block; margin-right: 5px;'><i class='fa fa-envelope fa-fw'></i> <span>"+  markersData[i]._contact.split(",")[1] +"</span></li></ul>";
  
      //contentString += "<a href='#' target='_blank'>View on Google Maps</a>";
         
         return function() {
             infoWindow.setContent( contentString );
             infoWindow.open(map, _marker);
         }
    })(_marker, i));
     
     
   }
   





 
   var _infowindow = new google.maps.InfoWindow();
   var _marker, i, _contentString;
   for (i = 0; i < markersData.length; i++) {  

    // create the contentString
    _contentString = "";
    _contentString += "<img src='http://2.bp.blogspot.com/-dvBmMkhmxt0/WaucBF6wptI/AAAAAAAAaVE/tISHuzCutRsRB-tTE83vX_rLhqURKqo1ACK4BGAYYCw/s400/logo-juice.png' style='width: auto;height: 12px; display: block; margin: 0 0; margin-bottom: 1em;'>";
    _contentString += "<h3 style='margin: 0;'>" + markersData[i]._name + "</h3>";
    _contentString += "<p class='addressline'>"+  markersData[i]._address +"</p>";
    _contentString += "<ul style='list-style-type: none; padding: 0;'><li style='display: inline-block; margin-right: 5px;'><i class='fa fa-phone fa-fw'></i> <span>"+  markersData[i]._contact.split(",")[0] +"</span></li><li style='display: inline-block; margin-right: 5px;'><i class='fa fa-envelope fa-fw'></i> <span>"+  markersData[i]._contact.split(",")[1] +"</span></li></ul>";

    _marker = new google.maps.Marker({
      position: {
         lat: parseInt(markersData[i]._lat), 
         lng: parseInt(markersData[i]._lng) 
      },
      title: markersData[i]._name,
      icon: juiceMarkerIcon,
      map: map
    });

    google.maps.event.addListener(_marker, 'click', (function(marker, i, content) {
      return function() {
        infowindow.setContent( content );
        infowindow.open(map, marker);
      }
    })(_marker, i, _contentString));

   }





/**/