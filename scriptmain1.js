/* =========================================================
   Sudarshan portfolio — vanilla JS interactions
   ========================================================= */

// --------- Welcome Popup ---------
(function welcomePopup(){
  const overlay   = document.getElementById('welcomeOverlay');
  const closeX    = document.getElementById('popupClose');
  const closeOk   = document.getElementById('popupCloseOk');
  if(!overlay) return;

  // Hide popup initially
  overlay.style.display = 'none';

  function closePopup(){
    overlay.classList.add('hidden');
    setTimeout(()=>{ overlay.style.display='none'; }, 400);
  }

  // Show popup after 2 seconds
  setTimeout(()=>{
    overlay.style.display = '';
  }, 2000);

  if(closeX)  closeX.addEventListener('click', closePopup);
  if(closeOk) closeOk.addEventListener('click', closePopup);
})();

// --------- Typewriter ---------
(function typewriter(){
  const target = document.getElementById('typed');
  if(!target) return;
  const roles = ["Developer","Designer","Student","Creator"];
  let idx=0, text="", deleting=false;
  function tick(){
    const cur = roles[idx];
    if(!deleting){
      text = cur.slice(0, text.length + 1);
      target.textContent = text;
      if(text === cur){ setTimeout(()=>{deleting=true; tick();}, 1500); return; }
      setTimeout(tick, 100);
    } else {
      text = cur.slice(0, text.length - 1);
      target.textContent = text;
      if(text === ""){ deleting=false; idx=(idx+1)%roles.length; }
      setTimeout(tick, 50);
    }
  }
  tick();
})();

// --------- Active nav on scroll ---------
(function activeNav(){
  const sections = ["#home","#about","#services","#work","#contact"]
    .map(s => ({ id: s, el: document.querySelector(s) }))
    .filter(x => x.el);
  const dlinks = document.querySelectorAll('.nav-link');
  const mlinks = document.querySelectorAll('.mnav-link');

  function setActive(){
    let best = sections[0].id, bestDist = Infinity;
    for(const s of sections){
      const d = Math.abs(s.el.getBoundingClientRect().top - 120);
      if(d < bestDist){ bestDist = d; best = s.id; }
    }
    dlinks.forEach(l => l.classList.toggle('active', l.dataset.target === best));
    mlinks.forEach(l => l.classList.toggle('active', l.dataset.target === best));
  }
  setActive();
  window.addEventListener('scroll', setActive, { passive: true });
})();

// --------- Hero 3D tilt ---------
(function hero3D(){
  const scene = document.getElementById('heroScene');
  const card = document.getElementById('portraitCard');
  if(!scene) return;
  let raf=0, tx=0,ty=0,cx=0,cy=0, ctx=0,cty=0, ccx=0,ccy=0;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

  function onMove(e){
    const r = scene.getBoundingClientRect();
    const inside = e.clientX>=r.left && e.clientX<=r.right && e.clientY>=r.top && e.clientY<=r.bottom;
    if(!inside){ tx=ty=ctx=cty=0; return; }
    const px = clamp((e.clientX-r.left)/r.width,0,1);
    const py = clamp((e.clientY-r.top)/r.height,0,1);
    tx = (py-.5)*-6; ty = (px-.5)*8;
    ctx = (py-.5)*-16; cty = (px-.5)*20;
    scene.style.setProperty('--mx', (px*100)+'%');
    scene.style.setProperty('--my', (py*100)+'%');
  }
  function tick(){
    cx += (tx-cx)*0.08; cy += (ty-cy)*0.08;
    ccx += (ctx-ccx)*0.12; ccy += (cty-ccy)*0.12;
    scene.style.setProperty('--rx', cx+'deg');
    scene.style.setProperty('--ry', cy+'deg');
    if(card){ card.style.setProperty('--rx', ccx+'deg'); card.style.setProperty('--ry', ccy+'deg'); }
    raf = requestAnimationFrame(tick);
  }
  window.addEventListener('pointermove', onMove);
  scene.addEventListener('pointerleave', ()=>{ tx=ty=ctx=cty=0; });
  raf = requestAnimationFrame(tick);
})();

// --------- Service card cursor spotlight ---------
document.querySelectorAll('.svc-card').forEach(card=>{
  card.addEventListener('pointermove', (e)=>{
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX-r.left)+'px');
    card.style.setProperty('--my', (e.clientY-r.top)+'px');
  });
});

// --------- Toast helper ---------
function showToast(message, type = 'success') {
  // Remove any existing toast
  const existing = document.getElementById('lc-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'lc-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  const isSuccess = type === 'success';
  toast.innerHTML = `
    <span class="lc-toast-icon">${isSuccess ? '✓' : '✗'}</span>
    <span class="lc-toast-msg">${message}</span>
    <button class="lc-toast-close" aria-label="Dismiss">×</button>
  `;

  // Inline styles so no CSS file edit needed
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%) translateY(80px)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 20px',
    borderRadius: '14px',
    background: isSuccess
      ? 'linear-gradient(135deg, #0d2b1f, #0f3d28)'
      : 'linear-gradient(135deg, #2b0d0d, #3d1010)',
    border: `1px solid ${isSuccess ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.35)'}`,
    boxShadow: `0 8px 32px ${isSuccess ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.18)'}, 0 2px 8px rgba(0,0,0,0.4)`,
    color: isSuccess ? '#86efac' : '#fca5a5',
    fontSize: '0.9rem',
    fontWeight: '500',
    fontFamily: 'inherit',
    zIndex: '99999',
    minWidth: '260px',
    maxWidth: 'calc(100vw - 2rem)',
    backdropFilter: 'blur(16px)',
    transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
    opacity: '0',
  });

  // Icon style
  const icon = toast.querySelector('.lc-toast-icon');
  Object.assign(icon.style, {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '24px', height: '24px', borderRadius: '50%', flexShrink: '0',
    background: isSuccess ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
    fontSize: '0.8rem', fontWeight: '700',
  });

  // Close button style
  const closeBtn = toast.querySelector('.lc-toast-close');
  Object.assign(closeBtn.style, {
    marginLeft: 'auto', background: 'none', border: 'none',
    color: 'inherit', cursor: 'pointer', fontSize: '1.1rem',
    opacity: '0.6', padding: '0 2px', lineHeight: '1',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity = '1';
    });
  });

  function dismissToast() {
    toast.style.transform = 'translateX(-50%) translateY(80px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 350);
  }

  closeBtn.addEventListener('click', dismissToast);
  setTimeout(dismissToast, isSuccess ? 5000 : 6000);
}

// --------- Contact form open/close + submit ---------
(function contact(){
  const open    = document.getElementById('openForm');
  const close   = document.getElementById('closeForm');
  const wrap    = document.getElementById('formWrap');
  const form    = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');
  if(!open || !wrap) return;

  open.addEventListener('click', ()=>{
    wrap.hidden = false;
    setTimeout(()=> wrap.scrollIntoView({behavior:'smooth', block:'center'}), 50);
  });

  close.addEventListener('click', ()=>{
    wrap.hidden = true;
    resetBtn();
    setTimeout(()=> document.getElementById('contact').scrollIntoView({behavior:'smooth', block:'start'}), 50);
  });

  function resetBtn() {
    sendBtn.disabled = false;
    sendBtn.classList.remove('sent', 'lc-sending', 'lc-error');
    sendBtn.querySelector('span').textContent = 'Send Message →';
  }

  function setBtnState(state) {
    sendBtn.classList.remove('sent', 'lc-sending', 'lc-error');
    if (state === 'sending') {
      sendBtn.disabled = true;
      sendBtn.classList.add('lc-sending');
      sendBtn.querySelector('span').innerHTML =
        '<span class="lc-spinner"></span> Sending…';
      // Spinner style injection (once)
      if (!document.getElementById('lc-spinner-style')) {
        const s = document.createElement('style');
        s.id = 'lc-spinner-style';
        s.textContent = `
          .lc-spinner {
            display: inline-block; width: 14px; height: 14px;
            border: 2px solid rgba(0,0,0,0.25);
            border-top-color: rgba(0,0,0,0.75);
            border-radius: 50%;
            animation: lc-spin 0.7s linear infinite;
            vertical-align: middle; margin-right: 6px;
          }
          @keyframes lc-spin { to { transform: rotate(360deg); } }
          #sendBtn.lc-sending { opacity: 0.85; cursor: not-allowed; }
          #sendBtn.lc-error   { background: linear-gradient(135deg, #7f1d1d, #991b1b) !important; }
          #sendBtn.sent       { background: linear-gradient(135deg, #14532d, #166534) !important; }
        `;
        document.head.appendChild(s);
      }
    } else if (state === 'success') {
      sendBtn.disabled = true;
      sendBtn.classList.add('sent');
      sendBtn.querySelector('span').textContent = '✓ Message sent!';
    } else if (state === 'error') {
      sendBtn.disabled = false;
      sendBtn.classList.add('lc-error');
      sendBtn.querySelector('span').textContent = '✗ Failed — try again';
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    setBtnState('sending');

    try {
      const data = new FormData(form);
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();

      if (json.success) {
        setBtnState('success');
        form.reset();
        showToast('Message sent! I\'ll get back to you soon 🚀', 'success');
        setTimeout(resetBtn, 5000);
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch(err) {
      setBtnState('error');
      showToast('Failed to send. Please email me directly at workinglc65@gmail.com', 'error');
      setTimeout(resetBtn, 5000);
    }
  });
})();

// --------- Starfield canvas ---------
(function starfield(){
  const canvas = document.getElementById('starfield');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  if(!ctx) return;

  let dpr = Math.min(window.devicePixelRatio||1, 2);
  let w=0, h=0, stars=[], raf=0, running=true;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = ["rgba(255,255,255,","rgba(125,230,255,","rgba(190,150,255,"];
  const mouse = {x:0,y:0};

  function makeStar(anywhere){
    const z = Math.random();
    return {
      x: Math.random()*w,
      y: anywhere ? Math.random()*h : -10,
      z, r: 0.3 + z*1.6,
      vx: (Math.random()-.5)*0.05,
      vy: 0.05 + z*0.25,
      tw: Math.random()*Math.PI*2,
      hue: Math.random()<0.78 ? 0 : (Math.random()<0.5 ? 1 : 2),
    };
  }
  function resize(){
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    dpr = Math.min(window.devicePixelRatio||1, 2);
    canvas.width = Math.floor(w*dpr);
    canvas.height = Math.floor(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const target = Math.min(180, Math.floor((w*h)/9000));
    stars = Array.from({length: target}, ()=>makeStar(true));
  }
  function onMove(e){
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX-r.left)/r.width - .5;
    mouse.y = (e.clientY-r.top)/r.height - .5;
  }
  let last = performance.now();
  function tick(now){
    now = now || performance.now();
    const dt = Math.min(50, now-last); last = now;
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<stars.length;i++){
      const s = stars[i];
      const px = s.x + mouse.x*18*s.z;
      const py = s.y + mouse.y*18*s.z;
      s.tw += 0.02 + s.z*0.03;
      const alpha = (0.35 + 0.65*(0.5+0.5*Math.sin(s.tw))) * (0.4 + s.z*0.6);
      ctx.beginPath();
      ctx.fillStyle = colors[s.hue] + alpha.toFixed(3) + ")";
      ctx.arc(px,py,s.r,0,Math.PI*2); ctx.fill();
      if(s.z>0.7){
        const grad = ctx.createRadialGradient(px,py,0,px,py,s.r*6);
        grad.addColorStop(0, colors[s.hue]+(alpha*0.35).toFixed(3)+")");
        grad.addColorStop(1, colors[s.hue]+"0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(px,py,s.r*6,0,Math.PI*2); ctx.fill();
      }
      if(!reduced){ s.x += s.vx*(dt/16); s.y += s.vy*(dt/16); }
      if(s.y>h+5){ s.y=-5; s.x=Math.random()*w; }
      if(s.x<-5) s.x = w+5;
      if(s.x>w+5) s.x = -5;
    }
    if(running) raf = requestAnimationFrame(tick);
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onMove);
  document.addEventListener('visibilitychange', ()=>{
    running = !document.hidden;
    if(running) raf = requestAnimationFrame(tick); else cancelAnimationFrame(raf);
  });
  raf = requestAnimationFrame(tick);
})();
document.addEventListener("DOMContentLoaded", function () {

  // Disable text selection
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.msUserSelect = "none";

  // Disable right click
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // Disable key shortcuts
  document.addEventListener('keydown', function (e) {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
      (e.ctrlKey && e.key === "U") ||
      (e.ctrlKey && e.key === "S") ||
      (e.ctrlKey && e.key === "P")
    ) {
      e.preventDefault();
    }
  });

  // Disable copy, cut, paste
  ["copy", "cut", "paste"].forEach(function (event) {
    document.addEventListener(event, function (e) {
      e.preventDefault();
    });
  });

  // Disable dragging
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  // DevTools detection removed — was falsely triggering on mobile devices
  // due to browser chrome (address bar, nav bars) affecting outerHeight/innerHeight.

});
