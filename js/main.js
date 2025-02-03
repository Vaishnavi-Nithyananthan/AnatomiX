(function ($) {
    "use strict";
    
    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: {
        opacity: 'show'
        },
        speed: 400
    });

    // Intro carousel
    $(document).ready(function() {
      var introCarousel = $(".carousel");
      var introCarouselIndicators = $(".carousel-indicators");
  
      introCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
          var desktopImg = $(this).find('.desktop-img').attr('src');
          var mobileImg = $(this).find('.mobile-img').attr('src');
  
          // Add carousel indicators dynamically
          (index === 0) ?
              introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
              introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");
  
          // Detect screen size and set background image accordingly
          function updateBackgroundImage() {
              var imageUrl = (window.innerWidth < 768) ? mobileImg : desktopImg;
              $(this).css("background-image", "url('" + imageUrl + "')");
          }
  
          // Apply image on page load and resize
          updateBackgroundImage.call(this);
          $(window).resize(updateBackgroundImage.bind(this));
  
          $(this).children('.carousel-background').remove();
      });
  
      // Enable swipe for mobile users
      $(".carousel").swipe({
          swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
              if (direction == 'left') $(this).carousel('next');
              if (direction == 'right') $(this).carousel('prev');
          },
          allowPageScroll: "vertical"
      });
  });
  

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
        id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
        'class': '',
        'id': ''
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function(e) {
        $(this).next().toggleClass('menu-item-active');
        $(this).nextAll('ul').eq(0).slideToggle();
        $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function(e) {
        $('body').toggleClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('#mobile-body-overly').toggle();
        });

        $(document).click(function(e) {
        var container = $("#mobile-nav, #mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
            }
        }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

  // Header scroll class
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
        } else {
        $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

  // Smooth scroll for the menu and links with .scrollto classes
    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        if (target.length) {
            var top_space = 0;

            if ($('#header').length) {
            top_space = $('#header').outerHeight();

            if (! $('#header').hasClass('header-scrolled')) {
                top_space = top_space - 20;
            }
            }

            $('html, body').animate({
            scrollTop: target.offset().top - top_space
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.nav-menu').length) {
            $('.nav-menu .menu-active').removeClass('menu-active');
            $(this).closest('li').addClass('menu-active');
            }

            if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
            }
            return false;
        }
        }
    });

  // Initiate the wowjs animation library
  new WOW().init();

  // Scroll to the top of the page after refresh
//   window.addEventListener('load', function() {
//     window.scrollTo(0, 0); 
//   });

  // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.nav-menu, #mobile-nav');
    var main_nav_height = $('#header').outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();
    
        nav_sections.each(function() {
        var top = $(this).offset().top - main_nav_height,
            bottom = top + $(this).outerHeight();
    
        if (cur_pos >= top && cur_pos <= bottom) {
            main_nav.find('li').removeClass('menu-active menu-item-active');
            main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('menu-active menu-item-active');
        }
        });
    });

    // Get the button and hidden section
    const showButton = document.getElementById('show-button');
    const hiddenSection = document.getElementById('hidden-section');

    showButton.addEventListener('click', function () {
        hiddenSection.style.display = 'block'; // Make it visible
        setTimeout(() => (hiddenSection.style.opacity = '1'), 10); // Trigger fade-in
        showButton.style.display = 'none'; // Hide the button after showing the section
      });

    // Add click event listener to the button
     // Function to set the visibility state
    //  function setSectionVisibility(isVisible) {
    //     if (isVisible) {
    //       hiddenSection.style.display = 'block';
    //       setTimeout(() => (hiddenSection.style.opacity = '1'), 10);
    //       toggleButton.textContent = 'Hide Section';
    //       hiddenSection.classList.add('visible');
    //     } else {
    //       hiddenSection.style.opacity = '0';
    //       setTimeout(() => (hiddenSection.style.display = 'none'), 500);
    //       toggleButton.textContent = 'Click to Show Section';
    //       hiddenSection.classList.remove('visible');
    //     }
    //   }
  
      // Load state from localStorage
    //   const isSectionVisible = localStorage.getItem('sectionVisible') === 'true';
  
      // Apply the saved state on page load
    //   setSectionVisibility(isSectionVisible);
  
      // Add click event listener to the button
    //   toggleButton.addEventListener('click', function () {
    //     const currentlyVisible = hiddenSection.classList.contains('visible');
    //     const newVisibility = !currentlyVisible; // Toggle the visibility state
    //     setSectionVisibility(newVisibility);
    //     localStorage.setItem('sectionVisible', newVisibility); // Save the state
    //   });
})(jQuery);