/* ==========================================
   Muhammad Hashir Tariq - App Logic
   Canvas Background, UI Views & CV Customizer
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. Core State & Data Model
  // ==========================================
  
  const defaultResumeData = {
    name: "MUHAMMAD HASHIR TARIQ",
    location: "Karachi, Pakistan",
    phone: "0315-0112517",
    email: "hashirtariq51245@gmail.com",
    linkedin: "www.linkedin.com/in/muhammad-hashir-4a16b039b",
    summary: "Final-year Telecommunications Engineering student at NED University of Engineering & Technology with hands-on experience in wireless networks, RF systems, hardware programming, and AI-driven applications. Skilled in Python, Verilog, MATLAB, and 3D ray-tracing simulation tools. Currently conducting research on Reconfigurable Intelligent Surfaces (RIS) for 6G infrastructure. Seeking a Science & Engineering Associate role to leverage strong technical, analytical, and leadership capabilities in a project-driven environment.",
    
    // Skill summary strings
    "skill-programming": "Python (Pandas, NumPy, Matplotlib, Scikit-learn), C/C++, Verilog HDL, HTML/CSS",
    "skill-tools": "MATLAB, Wireless InSite (3D Ray Tracing), Git/GitHub, Packet Tracer",
    "skill-telecom": "RF Propagation Modeling, Link Budget Analysis, Modulation Techniques (FDM/OFDM), LAN/WAN Setup, Fiber Splicing",
    "skill-software": "Microsoft Office (Excel, Word, PowerPoint)"
  };

  // State
  let currentTheme = localStorage.getItem("theme") || "dark";
  let activeView = "portfolio"; // "portfolio" or "cv"
  let editModeActive = false;

  // Project details content mapping
  const projectDetails = {
    "p-ris": {
      title: "RIS Implementation in 6G Infrastructure",
      badge: "Final Year Project / Research",
      description: "Designing and simulating an optimized Reconfigurable Intelligent Surface (RIS) system to maximize wireless coverage boundaries in 6G network layouts.",
      bullets: [
        "Modeled multi-path propagation and beamforming arrays inside complex urban outdoor shadowing environments using Wireless InSite (3D ray-tracing).",
        "Formulated optimization algorithms in MATLAB to compute required metasurface phase-shifts for constructive signal combining at receiver zones.",
        "Demonstrated significant path loss improvement (up to 15-20 dB gain) in non-line-of-sight (NLOS) gaps without active amplifier units.",
        "Evaluated deployment trade-offs, calculating optimal panel coordinates, dimensions, and element densities for cost-effective micro-cell infrastructure planning."
      ],
      tech: ["Wireless InSite", "MATLAB", "6G Metasurfaces", "RF Planning", "Beamforming"]
    },
    "p-alu": {
      title: "FPGA Implementation – 5-bit Arithmetic Logic Unit (ALU)",
      badge: "Digital Hardware Design",
      description: "Developed and synthesized a 5-bit ALU using Verilog HDL, deploying the final architectural design onto a physical FPGA board to validate logical design constraints.",
      bullets: [
        "Programmed RTL logic gates for fundamental arithmetic operations (Add, Subtract, Increment, Decrement) and bitwise operations (AND, OR, XOR, NOT).",
        "Wrote comprehensive Verilog testbenches and simulated behavioral waveforms in ModelSim to confirm timing and logical correctness.",
        "Synthesized hardware architecture layout using Intel Quartus Prime, mapping physical pin configurations (switches as inputs, LEDs/7-segments as outputs).",
        "Deployed configuration file onto Altera Cyclone IV FPGA board and resolved signal propagation glitches."
      ],
      tech: ["Verilog HDL", "Quartus Prime", "ModelSim", "FPGA Cyclone IV", "Digital Logic"]
    },
    "p-fso": {
      title: "Laser & Optical Data Transmission System",
      badge: "Analog Circuits & FSO",
      description: "Prototyped a free-space optical communication system using laser hardware to wirelessly transmit and decode audio and data streams.",
      bullets: [
        "Designed transmitter driver circuits using transistor-based modulation to superimpose analog input voltages onto a laser diode emitter.",
        "Engineered receiver block applying a silicon solar panel sensor, coupled with an active operational amplifier bandpass filter circuit to isolate audio signals.",
        "Achieved noise isolation and recovered audio inputs across the optical channel, testing performance across varying line-of-sight distances.",
        "Analyzed environmental beam attenuation factors (ambient light glare, smoke) and optimized circuit sensitivity values."
      ],
      tech: ["Free Space Optics", "Transistor Circuits", "Op-Amp Filters", "Signal Modulation", "Hardware Prototyping"]
    },
    "p-img": {
      title: "Wireless Picture & Image Transmission System",
      badge: "Digital Signal Processing",
      description: "Engineered a wireless visual data transmission system applying signal encoding, channel modeling, and error-handling techniques to optimize bandwidth efficiency.",
      bullets: [
        "Developed Python scripts to convert image assets into binary matrices, implementing lossless Huffman coding for compressed file sizes.",
        "Simulated noisy wireless channel propagation models including Additive White Gaussian Noise (AWGN) and Rayleigh fading envelopes.",
        "Integrated forward error correction algorithms (Hamming and Convolutional block codes) to detect and correct transmission bit errors.",
        "Optimized trade-off between coding overhead and recovered Image Peak Signal-to-Noise Ratio (PSNR)."
      ],
      tech: ["Python", "Huffman Compression", "Rayleigh Channels", "Forward Error Correction", "Signal Modeling"]
    }
  };

  // Set Theme Initially
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeButtonUI();

  // ==========================================
  // 2. Interactive Canvas Background
  // ==========================================
  
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = currentTheme === "dark" ? "rgba(0, 242, 254, 0.4)" : "rgba(8, 145, 178, 0.3)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(canvas.width / 15), 100);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  
  initParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Connect particles
    const maxDistance = 120;
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.15;
          ctx.strokeStyle = currentTheme === "dark" 
            ? `rgba(0, 242, 254, ${alpha})` 
            : `rgba(8, 145, 178, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();

  // Reset particles on size change to fit screen density
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initParticles();
    }, 200);
  });

  // ==========================================
  // 3. Theme Toggle & Navigation
  // ==========================================
  
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  
  themeToggleBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
    updateThemeButtonUI();
  });

  function updateThemeButtonUI() {
    const isDark = currentTheme === "dark";
    themeToggleBtn.setAttribute(
      "title",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  // Active navigation items on scroll
  const sections = document.querySelectorAll(".scroll-offset");
  const navItems = document.querySelectorAll(".nav-item");

  window.addEventListener("scroll", () => {
    if (activeView !== "portfolio") return;
    
    let current = "about";
    const offset = 180; // trigger early
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - offset;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("data-section") === current) {
        item.classList.add("active");
      }
    });
  });

  // Switch to Portfolio Mode and scroll to target when clicking nav items
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      
      if (activeView !== "portfolio") {
        switchToPortfolioView();
      }
      
      if (targetElement) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });


  // ==========================================
  // 4. View Switcher (Portfolio vs CV Mode)
  // ==========================================
  
  const viewPortfolioBtn = document.getElementById("view-portfolio-btn");
  const viewCvBtn = document.getElementById("view-cv-btn");
  
  const portfolioContainer = document.getElementById("portfolio-container");
  const cvContainer = document.getElementById("cv-container");
  const heroToCvBtn = document.getElementById("hero-to-cv-btn");

  viewPortfolioBtn.addEventListener("click", switchToPortfolioView);
  viewCvBtn.addEventListener("click", switchToCvView);
  heroToCvBtn.addEventListener("click", switchToCvView);

  function switchToPortfolioView() {
    activeView = "portfolio";
    viewCvBtn.classList.remove("active");
    viewPortfolioBtn.classList.add("active");
    
    cvContainer.classList.add("view-mode-hidden");
    cvContainer.classList.remove("view-mode-active");
    portfolioContainer.classList.add("view-mode-active");
    portfolioContainer.classList.remove("view-mode-hidden");
    
    // Enable background canvas updates
    canvas.style.display = "block";
    document.getElementById("main-nav").style.opacity = "1";
    document.getElementById("main-nav").style.pointerEvents = "auto";
  }

  function switchToCvView() {
    activeView = "cv";
    viewPortfolioBtn.classList.remove("active");
    viewCvBtn.classList.add("active");
    
    portfolioContainer.classList.add("view-mode-hidden");
    portfolioContainer.classList.remove("view-mode-active");
    cvContainer.classList.add("view-mode-active");
    cvContainer.classList.remove("view-mode-hidden");
    
    // Disable background canvas updates to preserve printing performance
    canvas.style.display = "none";
    document.getElementById("main-nav").style.opacity = "0.3";
    document.getElementById("main-nav").style.pointerEvents = "none";
    
    // Scroll to top of CV page
    window.scrollTo(0, 0);
  }


  // ==========================================
  // 5. Portfolio Interactions (Tabs & Modals)
  // ==========================================
  
  // Experience Tabs logic
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetPanelId = btn.getAttribute("aria-controls");
      
      tabButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      
      tabPanels.forEach(panel => {
        panel.classList.remove("active");
      });

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      document.getElementById(targetPanelId).classList.add("active");
    });
  });

  // Project Modal Logic
  const projectModal = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("close-modal-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const modalBody = document.getElementById("project-modal-body");

  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      const projId = card.getAttribute("data-project-id");
      const details = projectDetails[projId];
      if (!details) return;

      // Inject project data
      let techPillsHtml = details.tech.map(t => `<span>${t}</span>`).join("");
      let bulletsHtml = details.bullets.map(b => `<li>${b}</li>`).join("");

      modalBody.innerHTML = `
        <span class="modal-proj-badge">${details.badge}</span>
        <h2>${details.title}</h2>
        <p class="gradient-text" style="font-weight:600; margin-bottom:1rem;">NED University of Engineering & Technology</p>
        <p>${details.description}</p>
        
        <h4>Key Accomplishments & Scope</h4>
        <ul>${bulletsHtml}</ul>
        
        <h4>Technologies Applied</h4>
        <div class="project-tags">${techPillsHtml}</div>
      `;

      projectModal.classList.add("active");
      projectModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Prevent scroll
    });
  });

  function closeProjectModal() {
    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scroll
  }

  modalCloseBtn.addEventListener("click", closeProjectModal);
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) closeProjectModal();
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("active")) {
      closeProjectModal();
    }
  });


  // ==========================================
  // 6. Interactive CV Customizer Panel
  // ==========================================
  
  const cvPaper = document.getElementById("cv-paper");
  
  // Style Templates Selection
  const tplCorporateBtn = document.getElementById("tpl-corporate");
  const tplMinimalistBtn = document.getElementById("tpl-minimalist");
  const tplAcademicBtn = document.getElementById("tpl-academic");
  const tplButtons = [tplCorporateBtn, tplMinimalistBtn, tplAcademicBtn];

  tplCorporateBtn.addEventListener("click", () => applyTemplateStyle("corporate-style", tplCorporateBtn));
  tplMinimalistBtn.addEventListener("click", () => applyTemplateStyle("minimalist-style", tplMinimalistBtn));
  tplAcademicBtn.addEventListener("click", () => applyTemplateStyle("academic-style", tplAcademicBtn));

  function applyTemplateStyle(styleClass, activeBtn) {
    // Reset classes
    cvPaper.className = "cv-document-paper " + styleClass;
    tplButtons.forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
  }

  // Section Visibilities toggling
  const toggles = {
    "toggle-sec-summary": "cv-sec-summary",
    "toggle-sec-education": "cv-sec-education",
    "toggle-sec-experience": "cv-sec-experience",
    "toggle-sec-projects": "cv-sec-projects",
    "toggle-sec-skills": "cv-sec-skills",
    "toggle-sec-certs": "cv-sec-certs"
  };

  Object.keys(toggles).forEach(toggleId => {
    const el = document.getElementById(toggleId);
    const targetSectionId = toggles[toggleId];
    
    el.addEventListener("change", () => {
      const section = document.getElementById(targetSectionId);
      if (el.checked) {
        section.classList.remove("cv-section-hidden");
      } else {
        section.classList.add("cv-section-hidden");
      }
    });
  });

  // Edit Mode Toggle
  const cvEditToggle = document.getElementById("cv-edit-toggle");
  const editableFields = document.querySelectorAll(".cv-editable");

  cvEditToggle.addEventListener("change", () => {
    editModeActive = cvEditToggle.checked;
    if (editModeActive) {
      document.body.classList.add("cv-edit-active");
      editableFields.forEach(field => {
        field.setAttribute("contenteditable", "true");
      });
    } else {
      document.body.classList.remove("cv-edit-active");
      editableFields.forEach(field => {
        field.removeAttribute("contenteditable");
      });
    }
  });

  // Save changes locally when fields are blurred
  editableFields.forEach(field => {
    field.addEventListener("blur", () => {
      const fieldId = field.getAttribute("data-field");
      if (fieldId) {
        // Save to temporary session state
        defaultResumeData[fieldId] = field.innerHTML;
      }
    });
  });

  // Reset to default data
  const resetCvBtn = document.getElementById("reset-cv-btn");
  resetCvBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all modifications back to default resume details?")) {
      // Name
      document.getElementById("cv-field-name").innerHTML = defaultResumeData.name;
      document.getElementById("cv-field-location").innerHTML = defaultResumeData.location;
      document.getElementById("cv-field-phone").innerHTML = defaultResumeData.phone;
      document.getElementById("cv-field-email").innerHTML = defaultResumeData.email;
      document.getElementById("cv-field-linkedin").innerHTML = defaultResumeData.linkedin;
      document.getElementById("cv-field-summary").innerHTML = defaultResumeData.summary;
      
      // Skills
      document.getElementById("cv-field-programming").innerHTML = defaultResumeData["skill-programming"];
      document.getElementById("cv-field-tools").innerHTML = defaultResumeData["skill-tools"];
      document.getElementById("cv-field-telecom").innerHTML = defaultResumeData["skill-telecom"];
      document.getElementById("cv-field-software").innerHTML = defaultResumeData["skill-software"];
      
      // Restore section toggles
      Object.keys(toggles).forEach(toggleId => {
        const el = document.getElementById(toggleId);
        const section = document.getElementById(toggles[toggleId]);
        el.checked = true;
        section.classList.remove("cv-section-hidden");
      });
      
      // Turn off edit mode
      cvEditToggle.checked = false;
      cvEditToggle.dispatchEvent(new Event("change"));
    }
  });

  // Print CV Action
  const printCvBtn = document.getElementById("print-cv-btn");
  printCvBtn.addEventListener("click", () => {
    // Temporarily turn off edit highlights for crisp printing layout
    const wasEditMode = editModeActive;
    if (wasEditMode) {
      cvEditToggle.checked = false;
      cvEditToggle.dispatchEvent(new Event("change"));
    }
    
    // Trigger window print
    window.print();
    
    // Restore edit mode if active
    if (wasEditMode) {
      cvEditToggle.checked = true;
      cvEditToggle.dispatchEvent(new Event("change"));
    }
  });


  // ==========================================
  // 7. Contact Form Handling
  // ==========================================
  
  const contactForm = document.getElementById("contact-form");
  const successModal = document.getElementById("success-modal");
  const successModalCloseBtn = document.getElementById("success-modal-close-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Display success popup
      successModal.classList.add("active");
      successModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      
      // Clear form inputs
      contactForm.reset();
    });
  }

  if (successModalCloseBtn) {
    successModalCloseBtn.addEventListener("click", () => {
      successModal.classList.remove("active");
      successModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });
  }
});
