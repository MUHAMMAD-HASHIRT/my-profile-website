/* ============================================
   Muhammad Hashir Tariq — Portfolio
   Premium Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Cursor Glow Follow ----
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link based on scroll position
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---- Mobile Nav Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ---- Typewriter Effect ----
    const typewriterEl = document.getElementById('typewriter');
    const titles = [
        'Network Engineer',
        'Web Developer',
        'IT Manager',
        '6G Researcher',
        'AI Enthusiast',
        'Python Developer'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeWriter() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typewriterEl.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 400; // Pause before next word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    typeWriter();

    // ---- Scroll Reveal Animations ----
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // ---- Skill Bar Animation ----
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ---- Stat Counter Animation ----
    const statNumbers = document.querySelectorAll('.stat-number');

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseFloat(target.getAttribute('data-count'));
                const isDecimal = countTo % 1 !== 0;
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = eased * countTo;

                    if (isDecimal) {
                        target.textContent = current.toFixed(2);
                    } else {
                        target.textContent = Math.floor(current);
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
                statObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statObserver.observe(num));

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ---- Contact Form Handler ----
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Button loading state
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #00cc88, #00d4ff)';

            // Reset after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);
    });

    // ---- Glass Card Tilt Effect ----
    const glassCards = document.querySelectorAll('.glass-card');

    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ---- Parallax on Orbs ----
    const orbs = document.querySelectorAll('.orb');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        orbs.forEach((orb, index) => {
            const speed = 0.03 * (index + 1);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, { passive: true });

    // ---- Preload Animations ----
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        // Trigger hero animations immediately
        document.querySelectorAll('.hero [data-animate]').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    });
});
