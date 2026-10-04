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

    // ---- Scramble Text Effect ----
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
    const scrambleChars = '!<>-_\\\\/[]{}—=+*^?#________';
    
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span style="opacity: 0.6; color: var(--accent-primary);">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        randomChar() {
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
    }
    
    const scrambleFx = new TextScramble(typewriterEl);
    
    const nextText = () => {
        scrambleFx.setText(titles[titleIndex]).then(() => {
            setTimeout(nextText, 2500);
        });
        titleIndex = (titleIndex + 1) % titles.length;
    };
    
    nextText();

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

    // ---- Scroll Progress Line ----
    const scrollProgress = document.createElement('div');
    scrollProgress.id = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = progress + '%';
    }, { passive: true });

    // ---- Magnetic Buttons ----
    const magneticBtns = document.querySelectorAll('.btn, .nav-logo');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // ---- Cursor Click Ripple ----
    document.addEventListener('mousedown', () => {
        cursorGlow.style.transition = 'transform 0.1s ease, opacity 0.1s ease';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorGlow.style.opacity = '0.8';
        setTimeout(() => {
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorGlow.style.opacity = '0.5';
            setTimeout(() => {
                cursorGlow.style.transition = 'opacity 0.3s';
            }, 100);
        }, 150);
    });

    // ---- Matrix Code Rain Animation ----
    const matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
        const ctx = matrixCanvas.getContext('2d');
        let strands = [];
        let animationFrameId = null;
        let lastTime = 0;
        let cursorBlinkTime = 0;
        
        const fontSize = 14;
        const speed = 0.4;
        const density = 1;
        const textColor = "#10B981"; // Match theme DevOps Terminal Green
        
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,./<>?";
        
        function getRandomChar() {
            return characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        function createStrand(x, canvasHeight) {
            const layer = Math.floor(Math.random() * 3);
            const scale = layer === 0 ? 0.8 : layer === 1 ? 1 : 1.2;
            const length = Math.floor(Math.random() * 15) + 15;
            
            const chars = Array(length).fill(null).map(() => ({
                char: getRandomChar(),
                opacity: 1
            }));
            
            return {
                x,
                y: -length * (fontSize * scale),
                speed: (Math.random() * 0.3 + 0.7) * speed * fontSize * (layer === 2 ? 1.2 : layer === 1 ? 1 : 0.8),
                length,
                characters: chars,
                showCursor: true,
                layer,
                scale
            };
        }
        
        function resizeCanvas() {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        }
        
        function updateStrands(deltaTime) {
            const width = matrixCanvas.width;
            const height = matrixCanvas.height;
            const spacing = fontSize * 1.5;
            const maxStrands = Math.floor(width / spacing) * density * 1.5;
            
            if (strands.length < maxStrands) {
                const availableSlots = Array.from({ length: Math.floor(width / spacing) })
                    .map((_, i) => i * spacing)
                    .filter(x => !strands.some(strand => strand.x === x));
                
                if (availableSlots.length > 0 && Math.random() < 0.1 * density) {
                    const x = availableSlots[Math.floor(Math.random() * availableSlots.length)];
                    strands.push(createStrand(x, height));
                }
            }
            
            cursorBlinkTime += deltaTime;
            if (cursorBlinkTime >= 500) {
                strands.forEach(strand => strand.showCursor = !strand.showCursor);
                cursorBlinkTime = 0;
            }
            
            ctx.clearRect(0, 0, width, height);
            
            strands.sort((a, b) => a.layer - b.layer);
            
            strands = strands.filter(strand => {
                strand.y += strand.speed * deltaTime * 0.05;
                
                const baseOpacity = strand.layer === 0 ? 0.3 : strand.layer === 1 ? 0.6 : 0.9;
                const blur = strand.layer === 0 ? 1 : strand.layer === 1 ? 2 : 3;
                const scaledFontSize = fontSize * strand.scale;
                
                ctx.font = `${scaledFontSize}px monospace`;
                ctx.shadowBlur = blur;
                ctx.shadowColor = textColor;
                
                strand.characters.forEach((char, i) => {
                    const y = strand.y + i * scaledFontSize;
                    
                    if (y > -scaledFontSize && y < height + scaledFontSize) {
                        ctx.fillStyle = textColor;
                        ctx.globalAlpha = baseOpacity;
                        ctx.fillText(char.char, strand.x, y);
                        
                        if (i === strand.characters.length - 1 && strand.showCursor) {
                            ctx.fillStyle = "#FFFFFF";
                            ctx.globalAlpha = baseOpacity;
                            ctx.fillRect(strand.x, y + 2, scaledFontSize * 0.8, 2);
                        }
                    }
                });
                
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
                
                if (Math.random() < 0.02) {
                    const randomIndex = Math.floor(Math.random() * strand.characters.length);
                    strand.characters[randomIndex].char = getRandomChar();
                }
                
                return strand.y - strand.length * (fontSize * strand.scale) < height;
            });
        }
        
        function animate(time) {
            const deltaTime = time - lastTime;
            lastTime = time;
            
            updateStrands(deltaTime);
            animationFrameId = requestAnimationFrame(animate);
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        lastTime = performance.now();
        animate(lastTime);
    }
});
