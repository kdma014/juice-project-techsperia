
var _mapContainer = document.getElementById("googlemaps_SalonFinder");

var glob_markers = [];
var glob_infowindows = [];
var glob_map;

function initMap() {

   var map;
   var markers = [];	
   var mumbai = {lat: 19.076,lng: 72.877};
   var juiceMarkerIcon = "img/icons/maps-logo-marker-2_smaller.png";


  // Create the map
  map = new google.maps.Map(_mapContainer, {
    zoom: 12,
    center: mumbai
  });

  // To program it in the global scope
  glob_map = map;


  /* 
     Multiple markers listing all locations saved in `markersData`
     Currently using a JSON object for the data, when implementing in production
     use AJAX to find and place the markers using the data from the server. 
  */ 
  var _labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


  var _infowindow = new google.maps.InfoWindow();
  var _contentString = "";
  var _marker, i;
  var _markers_arr = [];

  for (i = 0; i < markersData.length; i++) {  

  	var this_place = {
  		"name": markersData[i].name,
  		"address": markersData[i].address,
  		"contact": markersData[i].contact,
  		"mapsUrl": markersData[i].mapsUrl,
  		"lat": markersData[i].lat,
  		"lng": markersData[i].lng
  	};
      
      // create the contentString
    _contentString = "";
    _contentString += "<img class='juice-salon-logo-marker' src='http://2.bp.blogspot.com/-dvBmMkhmxt0/WaucBF6wptI/AAAAAAAAaVE/tISHuzCutRsRB-tTE83vX_rLhqURKqo1ACK4BGAYYCw/s400/logo-juice.png' style='width: auto;height: 12px; display: block; margin: 0 0; margin-bottom: 1em;'>";
    _contentString += "<div class='infowindow-content'>";
    _contentString += "<h3 class='marker-name'>" + this_place.name + "</h3>";
    _contentString += "<p class='addressline'>"+  this_place.address +"</p>";

    if ( this_place.contact.length > 0 ) {
      _contentString += "<ul class='contact-inf-list' style='list-style-type: none; padding: 0;'><li style='display: inline-block; margin-right: 5px;'><i class='fa fa-phone fa-fw'></i> <span>"+  this_place.contact.split(",")[0] +"</span></li><li style='display: inline-block; margin-right: 5px;'><i class='fa fa-envelope fa-fw'></i> <span>"+  this_place.contact.split(",")[1] +"</span></li></ul>";
    }
    if ( this_place.mapsUrl.length > 0 ) {
        _contentString += "<a href='"+ this_place.mapsUrl +"' class='view-on-maps'>View on maps</a>";
    }
    _contentString += "</div>";
        
        
    _marker = new google.maps.Marker({
      position: new google.maps.LatLng( this_place.lat ,  this_place.lng),
      map: map,
      icon: juiceMarkerIcon
    });

    _markers_arr.push( _marker ); glob_markers = _markers_arr;

    google.maps.event.addListener(_marker, 'click', (function(_marker) {
      return function() {
        _infowindow.setContent( _contentString );
        _infowindow.open(map, _marker);
      }
    })(_marker));
        
        
   };


  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, _markers_arr, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      

  // Autocomplete input
  var card = document.getElementById('pac-card');
  var input = document.getElementById('locationName');
  var searchBox =  new google.maps.places.SearchBox(input);

  var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
  });   




  var markers = [];
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });

    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();

    places.forEach(function(place) {

      if (!place.geometry) {
      	window.alert("Please enter a place name that's valid..");
        console.log("Returned place contains no geometry");
        return;
      }

      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });


  // Button click
  document.getElementById('location_search_submit').onclick = function () {
      var _input = input;
      google.maps.event.trigger(_input, 'focus')
      google.maps.event.trigger(_input, 'keydown', { keyCode: 13 });
  };


}










/*
Controls and small functions with DOM
*/

$(document).ready(function(){

	// Submitting Location
	$("#location_search_submit").on("click", function(){
		var e = jQuery.Event("keypress");
		    e.which = 13; // Enter
		    $('locationName').trigger(e);

		console.log("clicked");
	});

	// Typeahead
	var locationNameInput = $("#locationName");


	// Populating the salon location boxes
	markersData.map(function(data){
		salon_salonList( data, $("#salonLocationList"));
	});

});




function salon_salonList( data, container ) {

	/*
	Data structure
	  {
	      id: int,
	      name: str,
	      address: str
	  }
	*/

    var salon_item_box = document.createElement('div');    
        salon_item_box.classList.value = "col-sm-6 col-md-4 salon-location-item animated fadeIn";
        salon_item_box.id              = "juice_salon_id_" + data.id; 
        salon_item_box.innerHTML       =   '<div class="inner">' 
                                          +' <h3 class="salon-name">'+ data.name +'</h3>'
                                          +' <p class="salon-address">'
                                          +'    '+ data.address +''
                                          +' </p>'
                                          +'</div>';                    

    container.append( salon_item_box );                       

    return true;
}




/**************************************************
Since the number of Salons is not very big and is 
not subject to change every now and then we can
put the details of the locations in the JS file
as an array filled with JSON Objects
**************************************************/

var markersData = [{
            "id": "10",
            "name": "Juice Hair Salon",
            "address": "Northcote Rd, Glebe NSW 2037",
            "contact": "+180-000-000,example@juice.com",
            "mapsUrl" : "http://example.com/",
            "lat": "19.227638",
            "lng": "77.209488",
         },
         {
            "id": "6",
            "name": "Juice Hair Salon",
            "address": "Lincoln St, Lane Cove West NSW 2066",
            "contact": "+180-000-000,example@juice.com",
            "mapsUrl" : "http://example.com/",
            "lat": "19.227638",
            "lng": "72.852715",
         },
         {
            "id": "7",
            "name": "Juice Hair Salon",
            "address": "Darley Rd, Randwick NSW 2031",
            "contact": "+180-000-000,example@juice.com",
            "mapsUrl" : "http://example.com/",
            "lat": "19.226828",
            "lng": "72.821709",
         },
         {
            "id": "5",
            "name": "Juice Hair Salon",
            "address": "Braidwood Dr, Prestons NSW 2170",
            "contact": "+180-000-000,example@juice.com",
            "mapsUrl" : "http://example.com/",
            "lat": "19.200613",
            "lng": "72.857086",

         },
         {
            "id": "4",
            "name": "Juice Hair Salon",
            "address": "Charlotte Ln, Chatswood NSW 2067",
            "contact": "+180-000-000,example@juice.com",
            "mapsUrl" : "http://example.com/",
            "lat": "19.167742",
            "lng": "72.850479",
 
         },
         {
            "id": "2",
            "name": "Juice Hair Salon",
            "address": "Thalia St, Hassall Grove NSW 2761",
            "contact": "+180-000-000,example@juice.com",
            "mapsUrl" : "http://example.com/",
            "lat": "19.142536",
            "lng": "72.866066",

         },
         {
            "id": "1",
            "name": "Juice Hair Salon",
            "address": "Crowea Pl, Frenchs Forest NSW 2086",
            "contact": "+180-000-000,example@juice.com",
            "mapsUrl" : "http://example.com/",
            "lat": "19.110748",
            "lng": "72.907265",

         },
         {
            "id": "3",
            "name": "Juice Hair Salon",
            "address": "Glenview Avenue, Revesby, NSW 2212",
            "contact": "+180-000-000,example@juice.com",
            "mapsUrl" : "http://example.com/",
            "lat": "19.125620",
            "lng": "72.825073",

         },
         {
            "id": "8",
            "name": "Juice Hair Salon",
            "address": "Brodie St, Rydalmere NSW 2116",
            "contact": "+180-000-000,example@juice.com",
            "mapsUrl" : "http://example.com/",
            "lat": "19.036194",
            "lng": "72.902924",

         },
         {
            "id": "9",
            "name": "Juice Hair Salon",
            "address": "Ferrers Rd, Horsley Park NSW 2175",
            "contact": "+180-000-000,example@juice.com",
            "mapsUrl" : "http://example.com/",
            "lat": "19.025974",
            "lng": "72.871956",
         }];
