/*

JUICE SALON MAIN JAVASCRIPT FILE

@ Creator: Techsperia

Use of this file without permission of the owner is prohibited

*/


$( document ).ready(function(){


	/****************************************
	jQuery Script for Home page
	*****************************************/

	/*
	* Instagram Testimonials Slide
	*/

	var igCarousel = $('.ig-feed-boxes').owlCarousel({
	    loop:true,
	    margin: 0,
	    nav:false,
	    dots:false, 
	    items: 3,
	    responsive:{
	        0:{
	            items:1
	        },

	        600:{
	            items:2
	        },

	        1000:{
	            items:3
	        }
	    }
	});


	$(".ig-slide-nav").on("click", function(e){
		var navDirection = $(this).attr('data-slide');
		if ( navDirection == "next" ) {
			igCarousel.trigger('next.owl.carousel');
		}
		else if ( navDirection == "prev" ) {
			igCarousel.trigger('prev.owl.carousel');
		}
		else {
			console.error("No data-slide value on the given anchor element");
		}

		e.preventDefault();
	});


	igCarousel.on("changed.owl.carousel", function(e){
		console.log( e );
		var $animatingElems = $(e.relatedTarget.$element).find("[data-animation ^= 'animated']");
		doAnimations( $animatingElems );
	});


	// Slider Animation
	function doAnimations( elems ) {
		//Cache the animationend event in a variable
		var animEndEv = 'webkitAnimationEnd animationend';
		
		elems.each(function () {
			var $this = $(this),
				$animationType = $this.attr('data-animation');

			$this.addClass($animationType).one(animEndEv, function () {
				$this.removeClass($animationType);
			});
		});
	}
		

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

	$( '.services-list .close-infowindow ' ).on('click', function(e){

		window.setTimeout(function(){
			$( _currentInfoWindow ).removeClass("active");
			$( _currentInfoWindow ).attr("hidden", "");
			$( _services ).animate({ opacity: 1 });

			_currentInfoWindow = undefined;
		}, 200);


		e.preventDefault();
	});



	/****************************************
	jQuery Script for `Product` page
	*****************************************/
	/*
	* Header Carousel
	*/


	var productsCarousel = $("#products_slide_1").owlCarousel({
	    loop:true,
	    margin: 60,
	    nav:true,
	    dots:false, 
	    items: 1,
	    responsive:{
	        0:{
	            items:1
	        },

	        600:{
	            items:1
	        },

	        1000:{
	            items:1
	        }
	    }
	});


	productsCarousel.on("changed.owl.carousel", function(e){
		console.log( e );
		var $animatingElems = $(e.relatedTarget.$element).find("[data-animation ^= 'animated']");
		doAnimations( $animatingElems );
	});


	

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


	/*
	* Slides on the Product page
	*/


	/****************************************
	jQuery Script for `Academy` page
	*****************************************/

	/* 
	 * Cart Button on the Academy page  
	 */

	$("#action_btns_stripe .action-btn .options-btn").on("click", function(e){
	  
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
	
	$("#action_btns_stripe .action-btn .close-btn a").on("click", function(e){
		
	  // Find the target by using `this`'s data-target attribute
	  var target_elm = $(this).data("target");
	  
	  // Show or hide the target element
	  $( target_elm ).fadeOut( 100 );

	  e.preventDefault();
	});





	/* InfoWindow Open / Close Controller */
	//  List Expand Window
	var _infoWindowLinks = $(".infowindow-btn");
	var _currentInfoWindow_;


	$( _infoWindowLinks ).on('click', function(e){

		var target_infoWindow = $(this).attr("data-target");

		if ( target_infoWindow ) {
			_currentInfoWindow_ = target_infoWindow;
			$( _infoWindowLinks ).animate({ opacity: 0 });
			window.setTimeout(function(){
				$( target_infoWindow ).removeAttr("hidden");
				$( target_infoWindow ).addClass("active");

				$('html, body').animate({
				        scrollTop: $( target_infoWindow ).offset().top - 150
				}, 200);

			}, 200);

			e.preventDefault();
		}
	});

	// Taking care of sub-sectionized infowindows
	var _sub_infoWindowLinks = $(".sub--infowindow-btn");
	var _sub_currentInfoWindow_;

	$( _sub_infoWindowLinks ).on('click', function(e){
		var target_infoWindow = $(this).attr("data-target");

		if ( target_infoWindow ) {

			_sub_currentInfoWindow_ = $(target_infoWindow);


			$( _currentInfoWindow_ ).removeClass("active");
			$( _currentInfoWindow_ ).attr("hidden", "");

			window.setTimeout(function(){

				$(target_infoWindow).addClass("active");
				$(target_infoWindow).removeAttr("hidden");

			}, 200);

			e.preventDefault();
		}


	});



	$( '.infowindow .close-infowindow' ).on('click', function(e){
		var parentInfoWindow = $(this).parent().parent().parent('.infowindow');

		    $( parentInfoWindow ).removeClass("active");
		    $( parentInfoWindow ).attr("hidden", "");


			if ( _sub_currentInfoWindow_ ) {

					$( _currentInfoWindow_ ).removeAttr("hidden");
				    $( _currentInfoWindow_ ).addClass("active");

				$('html, body').animate({
				        scrollTop: $( _currentInfoWindow_ ).offset().top - 150
				}, 200);

				_sub_currentInfoWindow_ = undefined;
			}

			else {

				$( _infoWindowLinks ).animate({ opacity: 1 });
		     	_currentInfoWindow_ = undefined;
			}


		e.preventDefault();
	});



});