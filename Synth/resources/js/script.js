$(document).ready(function(){
    $('.js--section-feature').waypoint(function(direction) {
        if (direction == "down") {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    }, {
      offset: '250px;'
    });
 
    $('.js--scroll-to-plans').click(function () {
        $('html, body').animate({scrollTop: $('.js--section-plans').offset().top}, 1000); 
     });
     
     $('.js--scroll-to-about').click(function () {
        $('html, body').animate({scrollTop: $('.js--section-feature').offset().top}, 1000); 
     });

     $('.js--scroll-about-nav').click(function () {
        $('html, body').animate({scrollTop: $('.js--section-feature').offset().top}, 1000); 
     });

     $('.js--scroll-how-works').click(function () {
        $('html, body').animate({scrollTop: $('.js--section-steps').offset().top}, 1000); 
     });

     $('.js--scroll-cities').click(function () {
        $('html, body').animate({scrollTop: $('.js--section-cities').offset().top}, 1000); 
     });

     $('.js--scroll-cities').click(function () {
        $('html, body').animate({scrollTop: $('.js--section-cities').offset().top}, 1000); 
     });

     $('.js--scroll-plans-nav').click(function () {
        $('html, body').animate({scrollTop: $('.js--section-plans').offset().top}, 1000); 
     });
});





