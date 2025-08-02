
        document.addEventListener('DOMContentLoaded', function() {
            // Language toggle functionality
            const languageToggle = document.getElementById('languageToggle');
            let currentLanguage = 'en'; // Default language
            
            if (languageToggle) {
                languageToggle.addEventListener('click', function() {
                    // Toggle between English and Amharic
                    currentLanguage = currentLanguage === 'en' ? 'am' : 'en';
                    translatePage();
                });
            }
            
            function translatePage() {
                // Translate all elements with the 'translatable' class
                const translatableElements = document.querySelectorAll('.translatable');
                translatableElements.forEach(element => {
                    const translation = element.getAttribute(`data-${currentLanguage}`);
                    if (translation) {
                        element.textContent = translation;
                    }
                });
                
                // Translate all placeholders
                const translatablePlaceholders = document.querySelectorAll('.translatable-placeholder');
                translatablePlaceholders.forEach(element => {
                    const placeholder = element.getAttribute(`data-placeholder-${currentLanguage}`);
                    if (placeholder) {
                        element.setAttribute('placeholder', placeholder);
                    }
                });
                
                // Update language toggle text
                const langText = document.querySelector('.language-text');
                if (langText) {
                    langText.textContent = currentLanguage === 'en' ? 'AM' : 'EN';
                }
            }
            
            // Header scroll effect
            window.addEventListener('scroll', function() {
                const header = document.getElementById('header');
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Mobile menu toggle
            const mobileToggle = document.getElementById('mobileToggle');
            const navMenu = document.getElementById('navMenu');
            
            if (mobileToggle) {
                mobileToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                });
            }

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }
                });
            });

            // Gallery Lightbox
            const galleryItems = document.querySelectorAll('.gallery-item');
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const closeLightbox = document.querySelector('.close-lightbox');

            if (galleryItems.length > 0) {
                galleryItems.forEach(item => {
                    item.addEventListener('click', function() {
                        const imgSrc = this.querySelector('img').src;
                        const caption = this.querySelector('.gallery-caption').textContent;
                        
                        lightboxImg.src = imgSrc;
                        lightboxCaption.textContent = caption;
                        lightbox.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    });
                });
            }

            if (closeLightbox) {
                closeLightbox.addEventListener('click', function() {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }

            if (lightbox) {
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        lightbox.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                });
            }

            // Testimonial Slider
            const testimonials = document.querySelectorAll('.testimonial');
            const prevBtn = document.getElementById('prevTestimonial');
            const nextBtn = document.getElementById('nextTestimonial');
            let currentIndex = 0;

            function showTestimonial(index) {
                testimonials.forEach(testimonial => testimonial.classList.remove('active'));
                testimonials[index].classList.add('active');
            }

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', function() {
                    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                    showTestimonial(currentIndex);
                });

                nextBtn.addEventListener('click', function() {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    showTestimonial(currentIndex);
                });
            }

            // Auto-rotate testimonials
            if (testimonials.length > 0) {
                setInterval(() => {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    showTestimonial(currentIndex);
                }, 5000);

                // Initialize with first testimonial
                showTestimonial(currentIndex);
            }

            // Form validation and submission
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert(currentLanguage === 'en' 
                        ? 'Thank you for your message! We will contact you soon.' 
                        : 'መልእክትህን ስላከህ እናመሰግናለን! በቅርቡ እንገናኝሃለን።');
                    contactForm.reset();
                });
            }

            const newsletterForm = document.getElementById('newsletterForm');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const email = document.getElementById('newsletterEmail').value;
                    alert(currentLanguage === 'en' 
                        ? `Thank you for subscribing with ${email}!` 
                        : `በ ${email} ለመመዝገብ እናመሰግናለን!`);
                    newsletterForm.reset();
                });
            }

            // Service card animations
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });

            // Price card hover effect
            const priceCards = document.querySelectorAll('.price-card');
            priceCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                });
            });
            
            // 3D Carousel
            const prev = document.querySelector('.carousel-btn.prev');
            const next = document.querySelector('.carousel-btn.next');
            const box = document.querySelector('.carousel-box');
            let degrees = 0;
          
            if (prev && next && box) {
                prev.addEventListener('click', function() {
                    degrees -= 45;
                    box.style.transform = `perspective(1000px) rotateY(${degrees}deg)`;
                });
                
                next.addEventListener('click', function() {
                    degrees += 45;
                    box.style.transform = `perspective(1000px) rotateY(${degrees}deg)`;
                });
                
                // Auto-rotate the carousel every 5 seconds
                setInterval(() => {
                    degrees += 45;
                    box.style.transform = `perspective(1000px) rotateY(${degrees}deg)`;
                }, 1000);
            }
        });