'use strict';

// ===== LOADER =====
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const loaderText = document.getElementById('loaderText');
document.body.classList.add('loading');

let progress = 0;
const messages = ['Initializing...', 'Loading skills...', 'Building projects...', 'Ready!'];
let msgIdx = 0;
const loaderInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loaderInterval);
        loaderFill.style.width = '100%';
        loaderText.textContent = 'Ready!';
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
            initReveal();
        }, 400);
    }
    loaderFill.style.width = Math.min(progress, 100) + '%';
    if (Math.floor(progress / 33) !== msgIdx && msgIdx < messages.length - 1) {
        msgIdx++;
        loaderText.textContent = messages[msgIdx];
    }
}, 80);

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    handleBackToTop();
    updateActiveNav();
}, { passive: true });

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    sections.forEach(sec => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        const id = sec.getAttribute('id');
        const link = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (link && scrollPos >= top && scrollPos < bottom) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const savedTheme = localStorage.getItem('an-theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeIcon.className = 'fas fa-moon';
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('an-theme', isDark ? 'dark' : 'light');
});

// ===== TYPEWRITER =====
const roles = ['Full Stack Developer', 'ML Enthusiast', 'Django Developer', 'Data Analyst', 'Problem Solver'];
const roleEl = document.getElementById('roleText');
let rIdx = 0, cIdx = 0, deleting = false, delay = 100;

function typeRole() {
    const current = roles[rIdx];
    if (!deleting) {
        roleEl.textContent = current.substring(0, cIdx + 1);
        cIdx++;
        if (cIdx === current.length) { deleting = true; delay = 2000; }
        else delay = 80 + Math.random() * 50;
    } else {
        roleEl.textContent = current.substring(0, cIdx - 1);
        cIdx--;
        if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; delay = 300; }
        else delay = 40;
    }
    setTimeout(typeRole, delay);
}
setTimeout(typeRole, 1200);

// ===== SCROLL REVEAL =====
function initReveal() {
    const els = document.querySelectorAll('.slide-up, .slide-right');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
function handleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
}
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoad = submitBtn.querySelector('.btn-loading');
        if (btnText) btnText.style.display = 'none';
        if (btnLoad) btnLoad.style.display = 'flex';
        submitBtn.disabled = true;
        await new Promise(r => setTimeout(r, 2000));
        if (btnText) btnText.style.display = 'flex';
        if (btnLoad) btnLoad.style.display = 'none';
        submitBtn.disabled = false;
        if (formSuccess) { formSuccess.style.display = 'flex'; setTimeout(() => formSuccess.style.display = 'none', 5000); }
        contactForm.reset();
    });
}

// ===== FOOTER YEAR =====
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// ===== CARD HOVER EFFECT =====
document.querySelectorAll('.proj-card, .skill-group').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotX = (y - 0.5) * -6;
        const rotY = (x - 0.5) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

console.log('%c👋 Anand Veera Manikanta Portfolio', 'font-size:18px;font-weight:bold;color:#16a34a;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'color:#475569;font-size:13px;');