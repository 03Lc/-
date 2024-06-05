$(document).ready(function() {
    // Add 'sticky' class to navbar by default
    $('.navbar').addClass("sticky");

    $(window).scroll(function(){
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Student",  "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Student", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });



    // Pop-up warning functionality
    var popup = $('#popup-warning');
    var closeBtn = $('.close-btn');
    var okBtn = $('#popup-ok-btn');

    // Show the pop-up warning after a delay (e.g., 2 seconds)
    setTimeout(function() {
        popup.show();
    }, 3000);

    // Close the pop-up when the close button or OK button is clicked
    closeBtn.click(function() {
        popup.hide();
    });

    okBtn.click(function() {
        popup.hide();
    });

    // Close the pop-up when clicking outside of the pop-up content
    $(window).click(function(event) {
        if ($(event.target).is(popup)) {
            popup.hide();
        }
    });
    

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});
