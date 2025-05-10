$(document).ready(function() {
    // Add 'sticky' class to navbar by default
    $('.navbar').addClass("sticky");

    // Scroll-up button show/hide script
    $(window).scroll(function() {
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });



    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    


    var typed = new Typed(".typing", {
        strings: ["Student","Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
      });
      



   // Creepy Pop-up Warning Logic
$(document).ready(function () {
    const popup = $('#popup-warning');
    const closeBtn = $('.close-btn');
    const okBtn = $('#popup-ok-btn');
  
    // Show the pop-up 4 seconds after page loads
    setTimeout(() => {
      popup.fadeIn(500); // smooth fade-in
    }, 4000); // 4 seconds
  
    // Close the popup on OK or X click
    closeBtn.on('click', () => popup.fadeOut(300));
    okBtn.on('click', () => popup.fadeOut(300));
  
    // Close when clicking outside the popup content
    $(window).on('click', function (e) {
      if ($(e.target).is(popup)) {
        popup.fadeOut(300);
      }
    });
    // Typewriter creepy text after popup appears
setTimeout(() => {
    creepyTypewriter(
      "☠️ This site is just for fun. Expect bugs. Expect chaos. Proceed if you dare.",
      ".popup-typewriter"
    );
  }, 4100); // Just after the popup appears
  
  });
  
    // Close the pop-up when clicking outside of the pop-up content
    $(window).click(function(event) {
        if ($(event.target).is(popup)) {
            popup.hide();
        }
    });

    // Owl carousel script for my team 
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });

   



    document.querySelector('.contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.querySelector('input[type="text"]').value;
      const email = document.querySelector('input[type="email"]').value;
      const subject = document.querySelector('select').value;
      const message = document.querySelector('textarea').value;

      if(name && email && subject && message) {
        alert(`Message Sent!\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`);
      } else {
        alert('Please fill in all fields.');
      }
    });
  

      // Mobile menu toggle
$('.menu-btn').click(function () {
  $('.navbar .menu').toggleClass('active');
  $('.menu-btn i').toggleClass('fa-times'); // change icon to 'X'
});





// Scroll-Up Button functionality
const scrollUpBtn = document.querySelector('.scroll-up-btn');

// Show the button when the user scrolls down
window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollUpBtn.classList.add('show');
  } else {
    scrollUpBtn.classList.remove('show');
  }
};

// Scroll to top when the button is clicked
scrollUpBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});










const percentDisplay = document.getElementById("percent");
const wave = document.getElementById("wave");

let percent = 0;
const waveHeight = 30; // height of the wave peaks
const waveWidth = 600;
const waveFrequency = 0.03;

const interval = setInterval(() => {
  if (percent >= 100) {
    clearInterval(interval);
    // Hide loader or transition here
  } else {
    percent++;
    percentDisplay.textContent = percent;

    const waveY = 150 - (percent * 1.5); // rise effect
    let pathData = `M0,${waveY} `;

    for (let x = 0; x <= waveWidth; x += 1) {
      const y = waveY + Math.sin(x * waveFrequency + percent / 10) * waveHeight;
      pathData += `L${x},${y} `;
    }

    pathData += `L${waveWidth},150 L0,150 Z`;
    wave.setAttribute("d", pathData);
  }
}, 30);


    // Fallback for broken images
    $("img").on("error", function() {
        $(this).attr("src", "fallback-image.jpg"); // Replace with a fallback image
    });

    // Preloader functionality
    $(".preloader").fadeIn();
    $(window).on("load", function() {
        $(".preloader").fadeOut("slow", function() {
            $(this).remove();
        });
    });

    // Fallback: Force removal after 5 seconds
    setTimeout(function() {
        $(".preloader").fadeOut("slow", function() {
            $(this).remove();
        });
    }, 5500); // 5 seconds fallback


    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      document.querySelector('.preloader').classList.add('hidden');
    });
    
  


    const services = [
        {
          title: "Web Development",
          description: "Modern, responsive, and blazing-fast websites tailored to your needs.",
          icon: "🌐"
        },
        {
          title: "UI/UX Design",
          description: "Beautiful and intuitive designs that enhance user experience.",
          icon: "🎨"
        },
        {
          title: "SEO Optimization",
          description: "Boost your site's visibility and attract more customers.",
          icon: "🚀"
        },
        {
          title: "Branding & Identity",
          description: "Crafting memorable brand experiences that stand out.",
          icon: "💡"
        }
      ];
  
      const servicesContainer = document.getElementById("services");
  
      services.forEach((service) => {
        const card = document.createElement("div");
        card.className = "card";
  
        card.innerHTML = `
          <div class="icon">${service.icon}</div>
          <div class="title">${service.title}</div>
          <div class="desc">${service.description}</div>
        `;
  
        servicesContainer.appendChild(card);
      });
   






});




setTimeout(() => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hidden");
    document.body.classList.add("loaded");
    setTimeout(() => preloader.remove(), 800);
  }
}, 4000);
