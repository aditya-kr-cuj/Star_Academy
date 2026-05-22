'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================
     1. SCROLL PROGRESS BAR
     ========================================================== */
  const scrollProgressBar = document.querySelector('.scroll-progress');

  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();


  /* ==========================================================
     2. NAVBAR SCROLL BEHAVIOR
     ========================================================== */
  const navbar = document.querySelector('[data-navbar]') || document.querySelector('nav');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 80) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();


  /* ==========================================================
     3. MOBILE MENU TOGGLE
     ========================================================== */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }


  /* ==========================================================
     4. SCROLL REVEAL ANIMATIONS
     ========================================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('active');
    });
  }


  /* ==========================================================
     5. ANIMATED COUNTERS
     ========================================================== */
  const counterElements = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (target - startValue) * eased);

      el.textContent = currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    counterElements.forEach(function (el) {
      el.textContent = '0';
      counterObserver.observe(el);
    });
  }


  /* ==========================================================
     6. HERO IMAGE SLIDER
     ========================================================== */
  const heroSlider = document.querySelector('.hero-slider');

  if (heroSlider) {
    const sliderFrame = heroSlider.closest('.hero-slider-frame') || heroSlider.parentElement;
    const track = heroSlider.querySelector('.hero-slider-track');
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const prevBtn = heroSlider.querySelector('.hero-slider-btn.prev');
    const nextBtn = heroSlider.querySelector('.hero-slider-btn.next');
    // Dots container is OUTSIDE the .hero-slider div, in the parent relative wrapper
    const dotsContainer = sliderFrame
      ? sliderFrame.parentElement && sliderFrame.parentElement.querySelector('.hero-slider-dots')
      : null;
    let currentSlide = 0;
    let autoSlideInterval = null;
    let touchStartX = 0;
    let touchEndX = 0;
    let isPaused = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (slides.length > 0 && track) {
      // Create dots
      if (dotsContainer) {
        slides.forEach(function (_, index) {
          const dot = document.createElement('button');
          dot.classList.add('hero-slider-dot');
          dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
          if (index === 0) dot.classList.add('active');
          dot.addEventListener('click', function () {
            goToSlide(index);
          });
          dotsContainer.appendChild(dot);
        });
      }

      function goToSlide(index) {
        currentSlide = index;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        if (currentSlide >= slides.length) currentSlide = 0;
        track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        updateDots();
        // Update ARIA attributes for screen readers
        slides.forEach(function(slide, i) {
          slide.setAttribute('aria-hidden', i !== currentSlide ? 'true' : 'false');
        });
      }

      function updateDots() {
        if (!dotsContainer) return;
        var dots = dotsContainer.querySelectorAll('.hero-slider-dot');
        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentSlide);
          dot.setAttribute('aria-pressed', i === currentSlide ? 'true' : 'false');
        });
      }

      function nextSlide() {
        goToSlide(currentSlide + 1);
      }

      function prevSlide() {
        goToSlide(currentSlide - 1);
      }

      // Controls
      if (nextBtn) nextBtn.addEventListener('click', nextSlide);
      if (prevBtn) prevBtn.addEventListener('click', prevSlide);

      // Auto-rotate every 5 seconds (skip if user prefers reduced motion)
      function startAutoSlide() {
        if (prefersReducedMotion) return;
        stopAutoSlide();
        autoSlideInterval = setInterval(function () {
          if (!isPaused) nextSlide();
        }, 5000);
      }

      function stopAutoSlide() {
        if (autoSlideInterval) {
          clearInterval(autoSlideInterval);
          autoSlideInterval = null;
        }
      }

      // Pause on hover
      heroSlider.addEventListener('mouseenter', function () {
        isPaused = true;
      });

      heroSlider.addEventListener('mouseleave', function () {
        isPaused = false;
      });

      // Touch/swipe support
      heroSlider.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        isPaused = true;
      }, { passive: true });

      heroSlider.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        isPaused = false;
      }, { passive: true });

      // Keyboard support
      heroSlider.setAttribute('tabindex', '0');
      heroSlider.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { prevSlide(); }
        if (e.key === 'ArrowRight') { nextSlide(); }
      });

      // Initialize aria-hidden on all but first slide
      slides.forEach(function(slide, i) {
        slide.setAttribute('aria-hidden', i !== 0 ? 'true' : 'false');
      });

      startAutoSlide();
    }
  }


  /* ==========================================================
     7. FAQ ACCORDION
     ========================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var content = item.querySelector('.faq-content');

    if (question && content) {
      question.addEventListener('click', function () {
        var isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            var otherContent = otherItem.querySelector('.faq-content');
            if (otherContent) otherContent.style.maxHeight = '0';
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = '0';
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });


  /* ==========================================================
     8. PARTICLE BACKGROUND EFFECT
     ========================================================== */
  const particleCanvas = document.getElementById('particle-canvas');

  if (particleCanvas) {
    var ctx = particleCanvas.getContext('2d');
    var particles = [];
    var particleCount = 50;
    var isCanvasVisible = true;
    var animFrameId = null;

    function resizeCanvas() {
      var parent = particleCanvas.parentElement;
      if (parent) {
        particleCanvas.width = parent.offsetWidth;
        particleCanvas.height = parent.offsetHeight;
      } else {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
      }
    }

    function createParticle() {
      return {
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2
      };
    }

    function initParticles() {
      particles = [];
      for (var i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    }

    function drawParticles() {
      if (!isCanvasVisible) return;

      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

      // Update and draw particles
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > particleCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > particleCanvas.height) p.vy *= -1;

        // Keep in bounds
        p.x = Math.max(0, Math.min(particleCanvas.width, p.x));
        p.y = Math.max(0, Math.min(particleCanvas.height, p.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + p.opacity + ')';
        ctx.fill();

        // Draw connections
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dx = p.x - p2.x;
          var dy = p.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.1 * (1 - dist / 100)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameId = requestAnimationFrame(drawParticles);
    }

    // Visibility observer to pause when not visible
    if ('IntersectionObserver' in window) {
      var canvasObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          isCanvasVisible = entry.isIntersecting;
          if (isCanvasVisible && !animFrameId) {
            drawParticles();
          } else if (!isCanvasVisible && animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
          }
        });
      }, { threshold: 0.1 });

      canvasObserver.observe(particleCanvas);
    }

    // Respect reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!prefersReducedMotion.matches) {
      resizeCanvas();
      initParticles();
      drawParticles();
    }

    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        resizeCanvas();
        initParticles();
      }, 250);
    });
  }


  /* ==========================================================
     9. BACK TO TOP BUTTON
     ========================================================== */
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ==========================================================
     10. SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================================== */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;

      var targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        // Dynamically compute offset from navbar + possible banner
        var navbarEl = document.querySelector('[data-navbar]');
        var bannerEl = document.querySelector('.notification-banner:not([style*="display: none"])');
        var bannerH = (bannerEl && !document.body.classList.contains('banner-dismissed'))
          ? (bannerEl.offsetHeight || 0) : 0;
        var navH = navbarEl ? navbarEl.offsetHeight : 80;
        var offset = targetEl.getBoundingClientRect().top + window.scrollY - navH - bannerH - 16;
        window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
      }
    });
  });


  /* ==========================================================
     11. LAZY LOADING ENHANCEMENT
     ========================================================== */
  const lazyImages = document.querySelectorAll('img[data-src]');

  if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
    var lazyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');

          img.addEventListener('load', function () {
            img.classList.add('loaded');
          });

          lazyObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(function (img) {
      lazyObserver.observe(img);
    });
  } else {
    // Fallback: load all immediately
    lazyImages.forEach(function (img) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }


  /* ==========================================================
     12. TESTIMONIAL SLIDER
     ========================================================== */
  const testimonialSlider = document.querySelector('.testimonial-slider');

  if (testimonialSlider) {
    var tsTrack = testimonialSlider.querySelector('.testimonial-slider-track');
    var tsSlides = testimonialSlider.querySelectorAll('.testimonial-slider-slide');
    var tsDotsContainer = testimonialSlider.querySelector('.testimonial-slider-dots');
    var tsCurrentSlide = 0;
    var tsAutoInterval = null;
    var tsTouchStartX = 0;
    var tsTouchEndX = 0;

    if (tsSlides.length > 0 && tsTrack) {
      // Create dots
      if (tsDotsContainer) {
        tsSlides.forEach(function (_, index) {
          var dot = document.createElement('button');
          dot.classList.add('testimonial-slider-dot');
          dot.setAttribute('aria-label', 'Go to testimonial ' + (index + 1));
          if (index === 0) dot.classList.add('active');
          dot.addEventListener('click', function () {
            goToTestimonial(index);
          });
          tsDotsContainer.appendChild(dot);
        });
      }

      function goToTestimonial(index) {
        tsCurrentSlide = index;
        if (tsCurrentSlide < 0) tsCurrentSlide = tsSlides.length - 1;
        if (tsCurrentSlide >= tsSlides.length) tsCurrentSlide = 0;
        tsTrack.style.transform = 'translateX(-' + (tsCurrentSlide * 100) + '%)';
        updateTestimonialDots();
      }

      function updateTestimonialDots() {
        if (!tsDotsContainer) return;
        var dots = tsDotsContainer.querySelectorAll('.testimonial-slider-dot');
        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === tsCurrentSlide);
        });
      }

      function nextTestimonial() {
        goToTestimonial(tsCurrentSlide + 1);
      }

      // Auto-rotate
      function startTestimonialAuto() {
        stopTestimonialAuto();
        tsAutoInterval = setInterval(nextTestimonial, 6000);
      }

      function stopTestimonialAuto() {
        if (tsAutoInterval) {
          clearInterval(tsAutoInterval);
          tsAutoInterval = null;
        }
      }

      // Touch / swipe
      testimonialSlider.addEventListener('touchstart', function (e) {
        tsTouchStartX = e.changedTouches[0].screenX;
        stopTestimonialAuto();
      }, { passive: true });

      testimonialSlider.addEventListener('touchend', function (e) {
        tsTouchEndX = e.changedTouches[0].screenX;
        var diff = tsTouchStartX - tsTouchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            goToTestimonial(tsCurrentSlide + 1);
          } else {
            goToTestimonial(tsCurrentSlide - 1);
          }
        }
        startTestimonialAuto();
      }, { passive: true });

      // Pause on hover
      testimonialSlider.addEventListener('mouseenter', stopTestimonialAuto);
      testimonialSlider.addEventListener('mouseleave', startTestimonialAuto);

      startTestimonialAuto();
    }
  }


  /* ==========================================================
     13. ACTIVE NAV LINK HIGHLIGHTING
     ========================================================== */
  const navLinks = document.querySelectorAll('.nav-link');

  if (navLinks.length > 0) {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;

      var linkPage = href.split('/').pop().split('#')[0].split('?')[0];

      // Normalize empty to index.html
      if (linkPage === '' || linkPage === '/') linkPage = 'index.html';
      if (currentPath === '' || currentPath === '/') currentPath = 'index.html';

      if (linkPage === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }


  /* ==========================================================
     14. YEAR UPDATE
     ========================================================== */
  const yearSpans = document.querySelectorAll('.current-year');
  var currentYear = new Date().getFullYear();

  yearSpans.forEach(function (span) {
    span.textContent = currentYear;
  });


  /* ==========================================================
     NOTIFICATION BANNER DISMISS
     ========================================================== */
  const bannerClose = document.querySelector('.notification-banner-close');
  var banner = document.querySelector('.notification-banner');

  if (bannerClose && banner) {
    bannerClose.addEventListener('click', function () {
      // Slide the banner up
      banner.style.transform = 'translateY(-110%)';
      banner.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      banner.setAttribute('aria-hidden', 'true');

      // After animation, hide from layout and update body class
      setTimeout(function () {
        banner.classList.add('hidden');
        document.body.classList.add('banner-dismissed');
        // Also update the CSS variable so the navbar snaps up cleanly
        document.documentElement.style.setProperty('--announcement-height', '0px');
      }, 420);
    });
  }

});
