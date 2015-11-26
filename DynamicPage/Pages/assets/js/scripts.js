/*
*
* Custom js snippets for Startuply v1.1
* by Vivaco 
*
*/
(function(){
	"use strict";
	// Init global DOM elements, functions and arrays
    window.app 			         = {el : {}, fn : {}};
	app.el['window']         = $(window);
	app.el['document']       = $(document);
    app.el['loader']         = $('#loader');
    app.el['mask']           = $('#mask');
	
	app.fn.screenSize = function() {
		var size, width = app.el['window'].width();
		if(width < 320) size = "Not supported";
		else if(width < 480) size = "Mobile portrait";
		else if(width < 768) size = "Mobile landscape";
		else if(width < 960) size = "Tablet";
		else size = "Desktop";
		// $('#screen').html( size + ' - ' + width );
		// console.log( size, width );
	};	
	
    //Preloader
    app.el['loader'].delay(700).fadeOut();
    app.el['mask'].delay(1200).fadeOut("slow");    
      
		// Resized based on screen size
		app.el['window'].resize(function() {
			app.fn.screenSize();
		});		
      

    // Headhesive init
    var options = {  // set options
            offset: '#showHere',
            classes: {
                clone:   'fixmenu-clone',
                stick:   'fixmenu-stick',
                unstick: 'fixmenu-unstick'
            }
        };
	
	if($('#registration,#career-page').length == 0) {
		var fixmenu = new Headhesive('.navigation-header', options); // init
	}
	
    // Navigation Scroll
//    $('.navigation-bar').onePageNav({
//        currentClass: 'active',
//        changeHash: true,
//        scrollSpeed: 750,
//        scrollThreshold: 0.5,
//        easing: 'swing'
//    });

    //animate service section onclick of down arrow
    $('.scroll-down').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 750, 'swing', function () {
            //window.location.hash = target;
        });
    });
    // Animated Appear Element
	if (app.el['window'].width() > 1024){
		
		$('.animated').appear(function() {
		  var element = $(this);
		  var animation = element.data('animation');
		  var animationDelay = element.data('delay');
		  if(animationDelay) {
			  setTimeout(function(){
				  element.addClass( animation + " visible" );
				  element.removeClass('hiding');
			  }, animationDelay);
		  } else {
			  element.addClass( animation + " visible" );
			  element.removeClass('hiding');
		  }               

		}, {accY: -150});
    
	} else {
		$('.animated').css('opacity', 1);
	}
    //menu links
    $('.navigation-bar').find('a').on('click', function () {
        var scrollAnchor = $(this).attr('data-scroll');
        var scrollPoint = $('section[data-anchor="' + scrollAnchor + '"]').offset().top;
        $('body,html').animate({
            scrollTop: scrollPoint
        }, 750);
        return false;
    });

    $(document).scroll(function () {
        // fade in .back-to-top
        if ($(this).scrollTop() > 500) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
        //change active class
        var url = window.location.href;
        $('nav.fixmenu-unstick,nav.fixmenu-stick').find('a').each(function () {
            if ($(this).attr("href") == url.split("/")[3]){
                $('.navigation-bar').children('li').removeClass('active');
                $(this).parent('li').addClass("active");
            }
        });
        //set home menu active
        if ($(this).scrollTop() ==0) {
            $('.navigation-bar').children('li').removeClass('active');
            $('.navigation-bar').children('li.home_link').addClass('active');
        }
        // Navigation Scroll
        $('section').each(function () {
            if ($(this).offset().top < window.pageYOffset + 10 && $(this).offset().top + $(this).height() > window.pageYOffset + 10) {
                window.location.hash = $(this).attr('id');
            }
        });
    });

    // scroll body to 0px on click
    $('.back-to-top,.logo,.home_link').click(function () {
        $('html, body').animate({
            scrollTop: 0,
            easing: 'swing'
        },750);
        return false;
    });
    //change background color for first section of career page
    var colors, i;
    colors = ['#2B7DBC', '#B53133', '#49A1AC', '#85A33E', '#884E2A'];  // List of colors
    i = 0;
    function animate_bg() {
        $('#career-home').css({'background-color': colors[i++ % colors.length], 'transition':'1s'})
    };
    animate_bg();
    //text animation
        $.fn.extend({
            rotaterator: function (options) {
                var defaults = {
                    fadeSpeed: 1000,
                    pauseSpeed: 100,
                    child: null
                };
                var options = $.extend(defaults, options);
                return this.each(function () {
                    var o = options;
                    var obj = $(this);
                    var items = $(obj.children(), obj);
                    items.each(function () {
                        $(this).hide();
                    })
                    if (!o.child) {
                        var next = $(obj).children(':first');
                    } else {
                        var next = o.child;
                    }
                    $(next).fadeIn(o.fadeSpeed, function () {
                        $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function () {
                            var next = $(this).next();

                            if (next.length == 0) {
                                next = $(obj).children(':first');
                            }
                            $(obj).rotaterator({child: next, fadeSpeed: o.fadeSpeed, pauseSpeed: o.pauseSpeed});
                            animate_bg();
                        });
                    });
                });
            }
        });
})();

$(document).ready(function () {
    $('.animate-div-text').rotaterator({fadeSpeed: 1000, pauseSpeed: 100});

    //onpage load set active menu
    setTimeout(function () {
        $('.fixmenu-stick').find('a').each(function () {
            if ($(this).attr('href').indexOf(window.location.href.split("/")[3]) >= 0) {
                $('.navigation-bar').children('li').removeClass('active');
                $(this).parent('li').addClass("active");
            }
        });
    }, 900);
    var slider = $('.bxslider').bxSlider({
        auto: true,
        infiniteLoop: true
    });
    $('.bx-controls-direction a').click(function (e) {
        var i = $(this).index();
        slider.goToSlide(i);
        slider.stopAuto();
        restart = setTimeout(function () {
            slider.startAuto();
        }, 500);
        return false;
    });
});

