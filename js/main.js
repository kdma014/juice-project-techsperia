/*

JUICE SALON MAIN JAVASCRIPT FILE

@ Creator: Techsperia

Use of this file without permission of the owner is prohibited

*/


$( document ).ready(function(){


	/****************************************
	jQuery Script for `Services` page
	*****************************************/
	// Service List Expand Window
	var _services = $(".service-item");
	var _currentInfoWindow;


	$( _services ).on('click', function(e){
		var target_infoWindow = $(this).attr("data-target");

		_currentInfoWindow = target_infoWindow;
        

		$(_services).animate({ opacity: 0 });

		window.setTimeout(function(){
			$( target_infoWindow ).removeAttr("hidden");
			$( target_infoWindow ).addClass("active");

			$('html, body').animate({
			        scrollTop: $( target_infoWindow ).offset().top - 150
			}, 200);

		}, 200);

		e.preventDefault();
	});

	$( '.close-infowindow ' ).on('click', function(e){

		window.setTimeout(function(){
			$( _currentInfoWindow ).removeClass("active");
			$( _currentInfoWindow ).attr("hidden", "");
			$( _services ).animate({ opacity: 1 });

			_currentInfoWindow = undefined;
		}, 200);


		e.preventDefault();
	});



	/****************************************
	jQuery Script for `Services` page
	*****************************************/
	/* Filter and Cart options
	 * Close / Open and Effects
	 */
	$(".product-page-options .options-btn").on("click", function(e){
	  
	  // Find the target by using `this`'s data-target attribute
	  var target_elm = $(this).data("target");
	  
	  // Show or hide the target element
	  console.log( target_elm );
	  
	  $( target_elm ).addClass( "active" ).fadeIn( 100 ).focus();
	  
	  // Lose focus
	  $(this).blur();
	  
	  // Add event handler to the BG-overlay
	  $(".bg-overlay").one("click", function(){
	    $( target_elm ).fadeOut( 100 );
	    $( target_elm ).removeClass( "active" );
	  });

	  e.preventDefault();
	  
	});
	
	$(".product-page-options .close-btn a").on("click", function(e){
	  // Find the target by using `this`'s data-target attribute
	  var target_elm = $(this).data("target");
	  
	  // Show or hide the target element
	  $( target_elm ).fadeOut( 100 );

	  e.preventDefault();
	});


});