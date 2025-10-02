$(document).ready(function () {
  // Sticky navbar on page load
  $('.unique-navbar').addClass("sticky");

  // Scroll-up button show/hide
  const scrollUpBtn = document.querySelector('.scroll-up-btn');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) scrollUpBtn.classList.add("show");
    else scrollUpBtn.classList.remove("show");
  });

  // Disable right-click
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Typing animation
  new Typed(".typing", {
    strings: ["Student", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  new Typed(".typing-2", {
    strings: ["Developer", "Designer", "student"],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true
  });

  // Creepy Pop-up Warning
  const popup = $('#popup-warning');
  const closeBtn = $('.close-btn');
  const okBtn = $('#popup-ok-btn');

  setTimeout(() => popup.fadeIn(500), 4000);
  closeBtn.on('click', () => popup.fadeOut(300));
  okBtn.on('click', () => popup.fadeOut(300));
  $(window).on('click', e => { if ($(e.target).is(popup)) popup.fadeOut(300); });

  // Owl carousel
  $('.carousel').owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } }
  });

  // Unique-navbar mobile menu + dropdowns
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  });

  dropdownToggles.forEach(dropdown => {
    dropdown.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const submenu = dropdown.nextElementSibling;
        submenu.classList.toggle("active");
        dropdown.classList.toggle("open");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      document.querySelectorAll(".dropdown-menu").forEach(menu => menu.classList.remove("active"));
      dropdownToggles.forEach(drop => drop.classList.remove("open"));
    }
  });

  // Sticky navbar on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".unique-navbar");
    if (window.scrollY > 20) navbar.classList.add("sticky");
    else navbar.classList.remove("sticky");
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

  // Wave animation for preloader
  const percentDisplay = document.getElementById("percent");
  const wave = document.getElementById("wave");
  let percent = 0;
  const waveHeight = 30, waveWidth = 600, waveFrequency = 0.03;
  const interval = setInterval(() => {
    if (percent >= 100) clearInterval(interval);
    else {
      percent++;
      percentDisplay.textContent = percent;
      let waveY = 150 - (percent * 1.5);
      let pathData = `M0,${waveY} `;
      for (let x = 0; x <= waveWidth; x++) {
        pathData += `L${x},${waveY + Math.sin(x * waveFrequency + percent / 10) * waveHeight} `;
      }
      pathData += `L${waveWidth},150 L0,150 Z`;
      wave.setAttribute("d", pathData);
    }
  }, 30);

  // Fallback for broken images
  $("img").on("error", function () { $(this).attr("src", "fallback-image.jpg"); });

  // Services section
  const services = [
    { icon: "💻", title: "Web Development", description: "Building responsive and modern websites." },
    { icon: "🎨", title: "UI/UX Design", description: "Designing user-friendly interfaces." },
    { icon: "⚡", title: "Performance Optimization", description: "Making websites faster and efficient." }
  ];
  const servicesContainer = document.getElementById("services");
  services.forEach(service => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="icon">${service.icon}</div>
      <div class="title">${service.title}</div>
      <div class="desc">${service.description}</div>
    `;
    servicesContainer.appendChild(card);
  });
  const comingSoonCard = document.createElement("div");
  comingSoonCard.className = "card coming-soon";
  comingSoonCard.innerHTML = `
    <div class="icon">🚀</div>
    <div class="title">Coming Soon</div>
    <div class="desc">Exciting new services on the way!</div>
  `;
  servicesContainer.appendChild(comingSoonCard);

  // Particle canvas
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    class Particle {
      constructor(x, y) { this.x = x; this.y = y; this.size = Math.random() * 4 + 1; this.speedX = Math.random() * 3 - 1.5; this.speedY = Math.random() * 3 - 1.5; this.alpha = 1; }
      update() { this.x += this.speedX; this.y += this.speedY; this.alpha -= 0.02; }
      draw() { ctx.globalAlpha = this.alpha; ctx.fillStyle = 'cyan'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; }
    }
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(animateParticles);
    }
    window.addEventListener('mousemove', e => { for (let i = 0; i < 5; i++) particles.push(new Particle(e.x, e.y)); });
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
    animateParticles();
  }

  // Chatbot toggle
  document.getElementById("toggle-chatbot").addEventListener("click", () => {
    document.getElementById("chatbot-container").classList.toggle("active");
  });

  // --- Contact Form Submission (Formspree) ---

  const form = document.getElementById('contact-form');
  const sendBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default submission

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    // Change button text to Sending...
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    try {
      const response = await fetch('https://formspree.io/f/xanporpk', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert(`✅ ${data.name}, your message has been sent!`);
        form.reset();
      } else {
        alert("❌ Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send message. Please try again.");
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send";
    }
  });

});
