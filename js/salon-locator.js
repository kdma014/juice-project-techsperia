
var _mapContainer = document.getElementById("googlemaps_SalonFinder");

function initMap() {
  // Create the map
  const map = new google.maps.Map(_mapContainer, {

    zoom: 12,

    center: {
      lat: 19.076,
      lng: 72.877
    }
  });

}




/*
Controls and small functions with DOM
*/

$(document).ready(function(){

	// Submitting Location
	$("#location_search_submit").on("click", function(){
		$("#mapsLocationSearch").submit();
		console.log("clicked");
	});

	// Typeahead
	var locationNameInput = $("#locationName");

	$("#typeAheadLocation ul li").on("click", function(){
		var placeName = $(this).attr("data-locationName");

		if ( placeName ) {
			locationNameInput.val( placeName );
		}

		else {
			console.error("Please add data-locationName attribute to the li element.");
		}

		$("#typeAheadLocation").fadeOut();
	});

});