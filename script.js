$(document).ready(function () {
  // Sticky navbar
  $('.navbar').addClass("sticky");

  // Scroll-up button show/hide
  $(window).scroll(function () {
    if (this.scrollY > 500) {
      $('.scroll-up-btn').addClass("show");
    } else {
      $('.scroll-up-btn').removeClass("show");
    }
  });

  // Disable right-click
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // Typing animation
  var typed = new Typed(".typing", {
    strings: ["Student", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  // Creepy Pop-up Warning Logic
  const popup = $('#popup-warning');
  const closeBtn = $('.close-btn');
  const okBtn = $('#popup-ok-btn');

  setTimeout(() => {
    popup.fadeIn(500);
  }, 4000);

  closeBtn.on('click', () => popup.fadeOut(300));
  okBtn.on('click', () => popup.fadeOut(300));

  $(window).on('click', function (e) {
    if ($(e.target).is(popup)) {
      popup.fadeOut(300);
    }
  });

  setTimeout(() => {
    creepyTypewriter(
      "☠️ This site is just for fun. Expect bugs. Expect chaos. Proceed if you dare.",
      ".popup-typewriter"
    );
  }, 4100);

  // Owl carousel script
  $('.carousel').owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1, nav: false },
      600: { items: 2, nav: false },
      1000: { items: 3, nav: false }
    }
  });

  document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const form = e.target;
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const subject = form.querySelector('select[name="subject"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
  
    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields');
      return;
    }
  
    const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  
    contactMessages.push({ name, email, subject, message, date: new Date().toISOString() });
  
    localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
  
    alert('Thank you for your message!');
  
    form.reset();
  });
  

  // Mobile menu toggle
  $('.menu-btn').click(function () {
    $('.navbar .menu').toggleClass('active');
    $('.menu-btn i').toggleClass('fa-times');
  });

  // Scroll-Up Button
  const scrollUpBtn = document.querySelector('.scroll-up-btn');
  window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollUpBtn.classList.add('show');
    } else {
      scrollUpBtn.classList.remove('show');
    }
  };
  scrollUpBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Preloader logic (4 seconds)
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hidden");
      document.body.classList.add("loaded");
      setTimeout(() => preloader.remove(), 800);
    }
  }, 4000);

  // Wave animation for preloader percent
  const percentDisplay = document.getElementById("percent");
  const wave = document.getElementById("wave");
  let percent = 0;
  const waveHeight = 30;
  const waveWidth = 600;
  const waveFrequency = 0.03;

  const interval = setInterval(() => {
    if (percent >= 100) {
      clearInterval(interval);
    } else {
      percent++;
      percentDisplay.textContent = percent;
      const waveY = 150 - (percent * 1.5);
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
  $("img").on("error", function () {
    $(this).attr("src", "fallback-image.jpg");
  });

  // Service cards generator
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
