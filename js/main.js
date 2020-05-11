/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 */
 
(function($) {
    var $event = $.event,
        $special,
        resizeTimeout;
    $special = $event.special.debouncedresize = {
        setup: function() {
            $(this).on("resize", $special.handler);
        },
        teardown: function() {
            $(this).off("resize", $special.handler);
        },
        handler: function(event, execAsap) {
            // Save the context
            var context = this,
                args = arguments,
                dispatch = function() {
                    // set correct event type
                    event.type = "debouncedresize";
                    $event.dispatch.apply(context, args);
                };
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            execAsap ?
                dispatch() :
                resizeTimeout = setTimeout(dispatch, $special.threshold);
        },
        threshold: 150
    };
})(jQuery);

//global variables
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
	
//set the page elements based on the user's browser window size
function setDimensions() {
	
	//get the dimensions of the window again
	w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

	//set styles for the page elements
	$('section').css('min-height', y);                                                                      
}
	
//on window resize, reset page elements
$(window).on('debouncedresize', function() {
	  setDimensions();
});

//scroll to ID
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 750);
        return false;
      }
    }
  });
});

$(document).ready(function(){
	
	setDimensions();
	
	$('#wn_menu').click(function(){
		$('#wn_hamburger').toggleClass('open');
		if($('.overlay').hasClass('open')){
			$('.overlay').removeClass('open').addClass('close');
		}
		else {
			$('.overlay').removeClass('close').addClass('open');
		}
		$('.overlay').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', 
			function() {
				$('.overlay').removeClass('close');
			});
	});
	
	$('.overlay li a').click(function(){
		if($('.overlay').hasClass('open')){
			$('.overlay').removeClass('open').addClass('close');
			$('#wn_hamburger').removeClass('open');
		}
		else {
			$('.overlay').removeClass('close').addClass('open');
			$('#wn_hamburger').addClass('open');
		}
		$('.overlay').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', 
			function() {
				$('.overlay').removeClass('close');
			});
	});
});