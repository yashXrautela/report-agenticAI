// GSAP Hero Animation
gsap.registerPlugin(ScrollTrigger);

// Build a timeline tied to the hero scroll, and pin the hero
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=120%",         // length of the scroll while pinned
    scrub: true,            // smooth scrubbing
    pin: true,              // keeps the hero in place while we scroll
    anticipatePin: 1
  }
});

// In parallel: move+fade the heading, and fade the overlay
tl.to(".hero-content", { y: -180, opacity: 0 }, 0)
  .to(".hero .overlay", { opacity: 0 }, 0);

// Optional subtle background zoom for depth (uncomment if you like)
// tl.to(".hero", { backgroundSize: "110%" }, 0);

// Floating Navigation Control
document.addEventListener('DOMContentLoaded', function() {
  const floatingNav = document.getElementById('floating-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const abstractSection = document.querySelector('.abstract');
  
  // Show/hide floating nav based on scroll position
  function toggleFloatingNav() {
    const abstractBottom = abstractSection.offsetTop + abstractSection.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > abstractBottom) {
      floatingNav.classList.add('visible');
    } else {
      floatingNav.classList.remove('visible');
    }
  }
  
  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollOffset = 100; // Offset to trigger earlier
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - scrollOffset;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLinks[index]) {
          navLinks[index].classList.add('active');
        }
      }
    });
  }
  
  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Listen for scroll events
  window.addEventListener('scroll', function() {
    toggleFloatingNav();
    updateActiveNavLink();
  });
  
  // Initial check
  toggleFloatingNav();
  updateActiveNavLink();
});

// Image enlargement functionality
document.addEventListener('DOMContentLoaded', function() {
  const screenshots = document.querySelectorAll('.ui-screenshot img');
  
  screenshots.forEach(img => {
    img.addEventListener('click', function() {
      // Create modal overlay
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: pointer;
      `;
      
      // Create enlarged image
      const enlargedImg = document.createElement('img');
      enlargedImg.src = this.src;
      enlargedImg.alt = this.alt;
      enlargedImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      `;
      
      modal.appendChild(enlargedImg);
      document.body.appendChild(modal);
      
      // Close on click
      modal.addEventListener('click', function() {
        document.body.removeChild(modal);
      });
    });
  });
});
