// ============================
// DOM READY
// ============================
document.addEventListener('DOMContentLoaded', function() {
    console.log('MG Web Studio loaded');
    
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initPortfolioFilter();
    initContactForm();
    initFAQs();
    initAnimations();
    initParticles();
    initEmailJS();
    
    // Force show all content initially
    forceShowContent();
});

// ============================
// FORCE SHOW ALL CONTENT (FIX FOR INITIAL DISPLAY)
// ============================
function forceShowContent() {
    // Remove any initial opacity/translation that might hide content
    document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta, .hero-trust').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.visibility = 'visible';
    });
    
    // Show all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });
    
    // Force show portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.display = 'block';
    });
    
    console.log('Content force shown');
}

// ============================
// EMAILJS INITIALIZATION - SIMPLIFIED
// ============================
function initEmailJS() {
    console.log('Initializing EmailJS...');
    
    // KONFIGURASI EMAILJS ANDA
    const EMAILJS_CONFIG = {
        PUBLIC_KEY: 'Z85UlKkoIxjRyPMDl',           // Public Key Anda
        SERVICE_ID: 'service_mg',            // Service ID Anda (gunakan yang benar)
        TEMPLATE_ID: 'template_5pcip94',          // Template ID untuk template premium
        AUTO_REPLY_TEMPLATE_ID: 'template_autoreply_mg', // Template ID untuk auto reply
        RECIPIENT_EMAIL: 'mgdevstudio.official@gmail.com' // Email penerima
    };
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('✅ EmailJS initialized successfully');
        window.EMAILJS_CONFIG = EMAILJS_CONFIG;
    } else {
        console.error('❌ EmailJS library not loaded');
    }
}

// ============================
// NAVIGATION - SINGLE VERSION (HAPUS DUPLIKAT)
// ============================
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        console.log('✅ Navigation initialized');
        
        // Function untuk toggle menu
        function toggleMenu() {
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        // Function untuk open menu
        function openMenu() {
            navMenu.classList.add('active');
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden';
        }
        
        // Function untuk close menu
        function closeMenu() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
        
        // Event listener untuk toggle menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu ketika klik link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Jika anchor link, lakukan smooth scroll
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    // Close menu
                    closeMenu();
                    
                    // Scroll ke target
                    const target = document.querySelector(href);
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
                // Jika link ke halaman lain, biarkan browser handle
                else {
                    closeMenu();
                }
            });
        });
        
        // Close menu ketika klik di luar
        document.addEventListener('click', function(event) {
            // Jika klik di luar menu dan toggle button, tutup menu
            if (!event.target.closest('.nav-menu') && 
                !event.target.closest('.menu-toggle') &&
                navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu dengan Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    } else {
        console.warn('Navigation elements not found');
    }
    
    // Smooth scroll untuk semua anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip jika href hanya "#"
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================
// HERO ANIMATIONS - SIMPLIFIED VERSION
// ============================
function initHeroAnimations() {
    console.log('Hero animations initialized');
    
    // Simple staggered animation for hero elements
    const heroElements = [
        { selector: '.hero-title', delay: 300 },
        { selector: '.hero-subtitle', delay: 600 },
        { selector: '.hero-cta', delay: 900 },
        { selector: '.hero-trust', delay: 1200 }
    ];
    
    heroElements.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }, item.delay);
        }
    });
    
    // Add parallax effect on scroll (simplified)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
}

// ============================
// PARTICLE BACKGROUND - SIMPLIFIED
// ============================
function initParticles() {
    const particlesContainer = document.getElementById('heroParticles');
    if (!particlesContainer) {
        console.log('Particles container not found');
        return;
    }
    
    console.log('Particles initialized');
    
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    
    // Create fewer particles for better performance
    const particleCount = window.innerWidth < 768 ? 15 : 25;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            background-color: rgba(201, 162, 77, 0.15);
            position: absolute;
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(201, 162, 77, 0.2);
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            opacity: 0.6;
            z-index: 1;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
    }
    
    // Add CSS animation for floating if not already present
    if (!document.getElementById('particle-animation-style')) {
        const style = document.createElement('style');
        style.id = 'particle-animation-style';
        style.textContent = `
            @keyframes float {
                0%, 100% { 
                    transform: translate(0, 0) scale(1); 
                    opacity: 0.4; 
                }
                25% { 
                    transform: translate(-5px, -10px) scale(1.1); 
                    opacity: 0.7; 
                }
                50% { 
                    transform: translate(5px, -5px) scale(0.9); 
                    opacity: 0.5; 
                }
                75% { 
                    transform: translate(-3px, 5px) scale(1.05); 
                    opacity: 0.6; 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================
// PORTFOLIO FILTER - SIMPLIFIED
// ============================
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0 || portfolioItems.length === 0) {
        console.log('Portfolio filter not found');
        return;
    }
    
    console.log('Portfolio filter initialized');
    
    // Make sure all portfolio items are visible initially
    portfolioItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.display = 'block';
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items with simple fade
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    // Show item with fade in
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.display = 'block';
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Hide item with fade out
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

// ============================
// CONTACT FORM - EMAIL ONLY (SIMPLIFIED)
// ============================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }
    
    console.log('Contact form initialized (Email only)');
    
    const formMessage = document.getElementById('formMessage');
    
    // Cache form elements untuk performance
    const formElements = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        company: document.getElementById('company'),
        service: document.getElementById('service'),
        message: document.getElementById('message'),
        submitBtn: contactForm.querySelector('button[type="submit"]')
    };
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Service names mapping
    const serviceNames = {
        'website': 'Website Development',
        'uiux': 'UI/UX Design',
        'landing': 'Landing Page',
        'company': 'Company Profile Website',
        'maintenance': 'Website Maintenance',
        'custom': 'Custom Website',
        'consultation': 'Konsultasi Gratis'
    };
    
    // Submit form handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: formElements.name.value.trim(),
            email: formElements.email.value.trim(),
            phone: formElements.phone?.value.trim() || 'Tidak diisi',
            company: formElements.company?.value.trim() || 'Tidak diisi',
            service: formElements.service.value,
            message: formElements.message.value.trim(),
            timestamp: new Date().toLocaleString('id-ID'),
            page_url: window.location.href
        };
        
        // Validasi form
        if (!formData.name || !formData.email || !formData.message) {
            showFormMessage('Harap isi semua field yang wajib diisi.', 'warning');
            return;
        }
        
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Format email tidak valid.', 'warning');
            return;
        }
        
        // Disable submit button
        formElements.submitBtn.disabled = true;
        formElements.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        
        try {
            // Kirim email
            const success = await sendEmail(formData);
            
            if (success) {
                showFormMessage(
                    '✅ Pesan Anda berhasil dikirim! Kami akan menghubungi Anda dalam 1-2 jam kerja.',
                    'success',
                    formData.email
                );
                
                // Reset form
                contactForm.reset();
            } else {
                showFormMessage('❌ Gagal mengirim pesan. Silakan coba lagi atau hubungi kami langsung.', 'error');
            }
        } catch (error) {
            console.error('Submit error:', error);
            showFormMessage('❌ Terjadi kesalahan. Silakan coba lagi.', 'error');
        } finally {
            // Re-enable submit button
            formElements.submitBtn.disabled = false;
            formElements.submitBtn.innerHTML = 'Kirim Pesan <i class="fas fa-paper-plane"></i>';
        }
    });
    
    // Function to send email using EmailJS
    async function sendEmail(formData) {
        try {
            if (typeof emailjs === 'undefined' || !window.EMAILJS_CONFIG) {
                console.error('EmailJS not properly initialized');
                return false;
            }
            
            // Prepare template parameters untuk admin
            const adminTemplateParams = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                service: serviceNames[formData.service] || formData.service,
                message: formData.message,
                timestamp: formData.timestamp,
                page_url: formData.page_url,
                year: new Date().getFullYear()
            };
            
            console.log('📧 Sending emails...');
            
            // 1. Kirim email ke admin (utama)
            const adminPromise = emailjs.send(
                window.EMAILJS_CONFIG.SERVICE_ID,
                window.EMAILJS_CONFIG.TEMPLATE_ID,
                adminTemplateParams
            );
            
            // 2. Kirim auto reply ke user (secondary)
            const autoReplyPromise = sendAutoReplyToUser(formData);
            
            // 3. Timeout setelah 20 detik
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Email sending timeout')), 20000);
            });
            
            // Tunggu semua promise selesai atau timeout
            const [adminResponse, autoReplyResult] = await Promise.race([
                Promise.all([adminPromise, autoReplyPromise]),
                timeoutPromise
            ]);
            
            console.log('📩 Both emails sent successfully');
            console.log('- Admin notification:', adminResponse.status);
            console.log('- Auto reply to user:', autoReplyResult ? 'Success' : 'Failed');
            
            return true;
            
        } catch (error) {
            console.error('❌ Email sending failed:', error.message || error);
            return false;
        }
    }
    
    // Function to show form message
    function showFormMessage(text, type, userEmail = '') {
        if (!formMessage) return;
        
        // Clear any existing timeout
        if (window.formMessageTimeout) {
            clearTimeout(window.formMessageTimeout);
        }
        
        let messageHTML = '';
        
        if (type === 'success') {
            messageHTML = `
                <div class="message-content ${type}">
                    <div class="message-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="message-text">
                        <h4>Berhasil!</h4>
                        <p>${text}</p>
                        <small>
                            <i class="fas fa-envelope"></i> Email konfirmasi telah dikirim ke <strong>${userEmail}</strong>
                            <br>
                            <i class="fas fa-info-circle"></i> Periksa folder spam jika tidak menemukan email kami
                        </small>
                    </div>
                </div>
            `;
        } else {
            const icon = type === 'error' ? 'exclamation-circle' : 'info-circle';
            const title = type === 'error' ? 'Terjadi Kesalahan' : 'Perhatian';
            
            messageHTML = `
                <div class="message-content ${type}">
                    <div class="message-icon">
                        <i class="fas fa-${icon}"></i>
                    </div>
                    <div class="message-text">
                        <h4>${title}</h4>
                        <p>${text}</p>
                    </div>
                </div>
            `;
        }
        
        formMessage.innerHTML = messageHTML;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        formMessage.style.opacity = '1';
        
        // Scroll to message dengan smooth
        setTimeout(() => {
            formMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
        
        // Auto hide after time
        const hideTime = type === 'success' ? 5000 : 8000;
        window.formMessageTimeout = setTimeout(() => {
            formMessage.style.opacity = '0';
            formMessage.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.style.opacity = '1';
            }, 300);
        }, hideTime);
    }
}

// ============================
// FAQ ACCORDION
// ============================
function initFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        console.log('FAQs not found');
        return;
    }
    
    console.log('FAQs initialized');
    
    faqQuestions.forEach(question => {
        // Make sure all answers start collapsed
        const answer = question.nextElementSibling;
        if (answer && answer.classList.contains('faq-answer')) {
            answer.style.maxHeight = '0';
            answer.style.padding = '0 var(--spacing-lg)';
        }
        
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close all other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.classList.remove('active');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    if (otherAnswer && otherAnswer.classList.contains('faq-answer')) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.padding = '0 var(--spacing-lg)';
                    }
                }
            });
            
            // Toggle current FAQ
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                // Open
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.padding = 'var(--spacing-lg)';
                }
                if (icon) {
                    icon.className = 'fas fa-minus';
                }
            } else {
                // Close
                if (answer) {
                    answer.style.maxHeight = '0';
                    answer.style.padding = '0 var(--spacing-lg)';
                }
                if (icon) {
                    icon.className = 'fas fa-plus';
                }
            }
        });
    });
}

// ============================
// SCROLL ANIMATIONS - SIMPLIFIED
// ============================
function initAnimations() {
    console.log('Animations initialized');
    
    // Simple fade in animation for elements
    const fadeElements = document.querySelectorAll('.fade-in, section:not(.hero-section)');
    
    // Create a simple intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    fadeElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        // Observe for scroll
        observer.observe(element);
    });
}

// ============================
// NOTIFICATION FUNCTION
// ============================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Hilangkan notifikasi setelah 5 detik
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================
// FUNCTION UNTUK AUTO REPLY KE USER
// ============================
async function sendAutoReplyToUser(userData) {
    try {
        console.log('📧 Sending auto reply to user:', userData.email);
        
        // Map service value to readable name
        const serviceNames = {
            'website': 'Website Development',
            'uiux': 'UI/UX Design',
            'landing': 'Landing Page',
            'company': 'Company Profile Website',
            'maintenance': 'Website Maintenance',
            'custom': 'Custom Website',
            'consultation': 'Konsultasi Gratis'
        };
        
        // Prepare template parameters untuk auto reply
        const autoReplyParams = {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            service_name: serviceNames[userData.service] || userData.service,
            message: userData.message.substring(0, 200) + (userData.message.length > 200 ? '...' : ''),
            year: new Date().getFullYear(),
            timestamp: new Date().toLocaleString('id-ID')
        };
        
        // Kirim auto reply ke user
        const response = await emailjs.send(
            window.EMAILJS_CONFIG.SERVICE_ID,
            window.EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID,
            autoReplyParams
        );
        
        console.log('✅ Auto reply sent to user:', response.status);
        return true;
        
    } catch (error) {
        console.error('❌ Failed to send auto reply:', error.message || error);
        return false;
    }
}

// ============================
// RESIZE HANDLER
// ============================
function handleResize() {
    // Reinitialize particles on resize
    initParticles();
    
    // Adjust FAQ heights if open
    document.querySelectorAll('.faq-question.active').forEach(question => {
        const answer = question.nextElementSibling;
        if (answer && answer.classList.contains('faq-answer')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
}

// Add resize listener
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
});

// ============================
// ERROR HANDLING
// ============================
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.message);
    // Force show content on error
    forceShowContent();
});

// ============================
// FALLBACK FOR CSS ANIMATIONS
// ============================
// Add CSS fallback for browsers that don't support certain features
function addCSSFallbacks() {
    // Check for flexbox gap support
    if (!window.CSS || !CSS.supports('gap', '1px')) {
        const style = document.createElement('style');
        style.textContent = `
            .value-grid, .services-grid, .footer-grid, .testimonials-grid {
                margin: -8px;
            }
            .value-grid > *, .services-grid > *, .footer-grid > *, .testimonials-grid > * {
                margin: 8px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize CSS fallbacks
addCSSFallbacks();

// ============================
// CSS STYLES FOR FORM MESSAGE
// ============================
function addCustomStyles() {
    const customStyles = `
        /* Form Message Styles */
        .form-message {
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            display: none;
            animation: slideDown 0.3s ease;
            border-left: 4px solid;
        }
        
        .form-message.success {
            background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%);
            border-color: #38a169;
            color: #2f855a;
        }
        
        .form-message.error {
            background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
            border-color: #e53e3e;
            color: #c53030;
        }
        
        .form-message.warning {
            background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%);
            border-color: #dd6b20;
            color: #c05621;
        }
        
        .message-content {
            display: flex;
            align-items: flex-start;
            gap: 15px;
        }
        
        .message-icon {
            font-size: 24px;
            flex-shrink: 0;
        }
        
        .message-text h4 {
            margin: 0 0 5px 0;
            font-weight: 700;
        }
        
        .message-text p {
            margin: 0;
            line-height: 1.5;
        }
        
        .message-text small {
            display: block;
            margin-top: 8px;
            opacity: 0.8;
            font-size: 0.9em;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Navigation Overlay */
        .nav-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            display: none;
        }
        
        .nav-overlay.active {
            display: block;
        }
        
        /* Notification Styles */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 12px;
            color: white;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            min-width: 300px;
            max-width: 400px;
        }
        
        .notification.success {
            background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
        }
        
        .notification.error {
            background: linear-gradient(135deg, #f44336 0%, #c62828 100%);
        }
        
        .notification.info {
            background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
            .notification {
                left: 20px;
                right: 20px;
                max-width: none;
            }
            
            .nav-menu {
                position: fixed;
                top: 70px;
                right: -100%;
                width: 80%;
                max-width: 400px;
                height: calc(100vh - 70px);
                background: rgba(11, 11, 13, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 2rem;
                transition: right 0.3s ease;
                z-index: 1000;
                overflow-y: auto;
            }
            
            .nav-menu.active {
                right: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = customStyles;
    document.head.appendChild(style);
}

// Add custom styles when DOM is loaded
document.addEventListener('DOMContentLoaded', addCustomStyles);

// ============================
// TEST EMAILJS FUNCTION
// ============================
function testEmailJS() {
    console.log('Testing EmailJS connection...');
    
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS library not loaded');
        return;
    }
    
    const testData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '081234567890',
        company: 'Test Company',
        service: 'Website Development',
        message: 'This is a test message to verify EmailJS integration.',
        timestamp: new Date().toLocaleString('id-ID'),
        page_url: window.location.href,
        year: new Date().getFullYear()
    };
    
    emailjs.send(
        window.EMAILJS_CONFIG?.SERVICE_ID || 'service_3oe0pcb',
        window.EMAILJS_CONFIG?.TEMPLATE_ID || 'template_5pcip94',
        testData
    ).then(
        function(response) {
            console.log('✅ Test email sent successfully!', response.status, response.text);
            showNotification('✅ Test email berhasil dikirim!', 'success');
        },
        function(error) {
            console.error('❌ Test email failed:', error);
            showNotification('❌ Test email gagal: ' + (error.text || error.message), 'error');
        }
    );
}

// ============================
// INITIAL LOAD COMPLETE
// ============================
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    
    // Final check to ensure everything is visible
    setTimeout(() => {
        forceShowContent();
        
        // Add loaded class to body for any final transitions
        document.body.classList.add('loaded');
    }, 100);
});
