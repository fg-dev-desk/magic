// Document ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initScrollAnimations();
    initCursorTrail();
    initParticleSystem();
    initMorphingButton();
    initFormAnimations();
    initNavbarEffects();
    initHeroAnimations();
    initGalleryInteractions();
    initLoadingBars();
    initAnimatedLetters();
});

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll([
        '.fade-in', '.fade-in-up', '.fade-in-down', '.fade-in-left', '.fade-in-right',
        '.slide-in-left', '.slide-in-right', '.slide-in-bottom',
        '.zoom-in', '.scale-in', '.rotate-in', '.flip-in', '.roll-in',
        '.bounce-in', '.bounce-in-down',
        '.feature-card', '.gallery-item', '.section-title'
    ].join(','));

    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Cursor trail effect
function initCursorTrail() {
    const trail = document.querySelector('.cursor-trail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;

        trail.style.left = trailX - 10 + 'px';
        trail.style.top = trailY - 10 + 'px';

        requestAnimationFrame(animateTrail);
    }

    animateTrail();

    // Hide trail when cursor leaves window
    document.addEventListener('mouseleave', () => {
        trail.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        trail.style.opacity = '1';
    });
}

// Enhanced particle system
function initParticleSystem() {
    const particles = document.querySelectorAll('.particle');

    particles.forEach((particle, index) => {
        // Add random colors
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b733', '#5c7cfa'];
        particle.style.background = colors[index % colors.length];

        // Add interactive hover effects
        particle.addEventListener('mouseenter', () => {
            particle.style.transform = 'scale(1.5)';
            particle.style.transition = 'transform 0.3s ease';
        });

        particle.addEventListener('mouseleave', () => {
            particle.style.transform = 'scale(1)';
        });

        // Add click effects
        particle.addEventListener('click', () => {
            particle.style.animation = 'none';
            setTimeout(() => {
                particle.style.animation = '';
            }, 10);

            // Create explosion effect
            createExplosion(particle);
        });
    });
}

// Create explosion effect
function createExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.left = centerX + 'px';
        spark.style.top = centerY + 'px';
        spark.style.width = '4px';
        spark.style.height = '4px';
        spark.style.background = '#fff';
        spark.style.borderRadius = '50%';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '10000';

        document.body.appendChild(spark);

        const angle = (i / 8) * Math.PI * 2;
        const velocity = 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let x = 0, y = 0;
        let opacity = 1;

        function animateSpark() {
            x += vx * 0.02;
            y += vy * 0.02;
            opacity -= 0.02;

            spark.style.transform = `translate(${x}px, ${y}px)`;
            spark.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animateSpark);
            } else {
                document.body.removeChild(spark);
            }
        }

        animateSpark();
    }
}

// Morphing button functionality
function initMorphingButton() {
    const button = document.querySelector('.morphing-button');
    let isTransformed = false;

    window.morphButton = function(btn) {
        if (!isTransformed) {
            btn.style.transform = 'scale(0.8) rotate(45deg)';
            btn.style.borderRadius = '20px';
            btn.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
            btn.textContent = '¡Transformado!';
            isTransformed = true;
        } else {
            btn.style.transform = 'scale(1) rotate(0deg)';
            btn.style.borderRadius = '50px';
            btn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            btn.textContent = 'Click Me!';
            isTransformed = false;
        }

        // Add ripple effect
        createRipple(btn, event);
    };
}

// Create ripple effect
function createRipple(element, event) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple 0.6s ease-out';

    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }

    .morphing-button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Form animations
function initFormAnimations() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');

            // Add floating label effect
            const label = input.previousElementSibling;
            if (label) {
                label.style.transform = 'translateY(-25px) scale(0.8)';
                label.style.color = '#667eea';
            }
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');

                const label = input.previousElementSibling;
                if (label) {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = '#666';
                }
            }
        });

        // Add typing effect
        input.addEventListener('input', () => {
            input.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
            clearTimeout(input.timeout);

            input.timeout = setTimeout(() => {
                input.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.2)';
            }, 500);
        });
    });
}

// Navbar effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Hero animations
function initHeroAnimations() {
    const heroShapes = document.querySelectorAll('.shape');

    heroShapes.forEach((shape, index) => {
        shape.addEventListener('mouseenter', () => {
            shape.style.transform = 'scale(1.2)';
            shape.style.filter = 'blur(0px)';
        });

        shape.addEventListener('mouseleave', () => {
            shape.style.transform = 'scale(1)';
            shape.style.filter = 'blur(5px)';
        });

        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            shape.style.transform += ` translate(${randomX}px, ${randomY}px)`;

            setTimeout(() => {
                shape.style.transform = shape.style.transform.replace(/translate\([^)]*\)/g, '');
            }, 2000);
        }, 5000 + index * 1000);
    });
}

// Gallery interactions
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) rotate(2deg)';
            item.style.zIndex = '10';

            // Add glow effect
            item.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
            item.style.zIndex = '1';
            item.style.boxShadow = 'none';
        });

        item.addEventListener('click', () => {
            // Create modal effect
            item.style.position = 'fixed';
            item.style.top = '50%';
            item.style.left = '50%';
            item.style.transform = 'translate(-50%, -50%) scale(1.5)';
            item.style.zIndex = '1000';

            // Create overlay
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'rgba(0, 0, 0, 0.8)';
            overlay.style.zIndex = '999';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';

            document.body.appendChild(overlay);

            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);

            overlay.addEventListener('click', () => {
                item.style.position = '';
                item.style.top = '';
                item.style.left = '';
                item.style.transform = '';
                item.style.zIndex = '';

                overlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            });
        });
    });
}

// Loading bars animation
function initLoadingBars() {
    const bars = document.querySelectorAll('.bar');

    bars.forEach((bar, index) => {
        bar.addEventListener('mouseenter', () => {
            bars.forEach((otherBar, otherIndex) => {
                if (otherIndex === index) {
                    otherBar.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
                    otherBar.style.transform = 'scaleY(1.5)';
                } else {
                    otherBar.style.background = 'rgba(78, 205, 196, 0.3)';
                    otherBar.style.transform = 'scaleY(0.8)';
                }
            });
        });

        bar.addEventListener('mouseleave', () => {
            bars.forEach((otherBar) => {
                otherBar.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
                otherBar.style.transform = 'scaleY(1)';
            });
        });
    });
}

// Animated letters interaction
function initAnimatedLetters() {
    const letters = document.querySelectorAll('.animated-letter');

    letters.forEach((letter, index) => {
        letter.addEventListener('mouseenter', () => {
            letter.style.transform = 'scale(1.5) rotate(15deg)';
            letter.style.textShadow = '0 0 20px currentColor';

            // Trigger wave effect on neighboring letters
            if (letters[index - 1]) {
                letters[index - 1].style.transform = 'scale(1.2) rotate(-5deg)';
            }
            if (letters[index + 1]) {
                letters[index + 1].style.transform = 'scale(1.2) rotate(-5deg)';
            }
        });

        letter.addEventListener('mouseleave', () => {
            letter.style.transform = 'scale(1) rotate(0deg)';
            letter.style.textShadow = 'none';

            if (letters[index - 1]) {
                letters[index - 1].style.transform = 'scale(1) rotate(0deg)';
            }
            if (letters[index + 1]) {
                letters[index + 1].style.transform = 'scale(1) rotate(0deg)';
            }
        });

        letter.addEventListener('click', () => {
            // Animate all letters
            letters.forEach((l, i) => {
                setTimeout(() => {
                    l.style.animation = 'bounce 0.6s ease';
                    setTimeout(() => {
                        l.style.animation = 'rainbow 3s ease-in-out infinite';
                    }, 600);
                }, i * 100);
            });
        });
    });
}

// Add performance optimization
function optimizeAnimations() {
    // Reduce animations on lower-end devices
    if (navigator.hardwareConcurrency <= 4) {
        document.body.classList.add('reduced-motion');

        const reducedMotionStyle = document.createElement('style');
        reducedMotionStyle.textContent = `
            .reduced-motion * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
        `;
        document.head.appendChild(reducedMotionStyle);
    }
}

// Initialize performance optimization
optimizeAnimations();

// Add random background color changes
setInterval(() => {
    const circles = document.querySelectorAll('.floating-circle');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b733', '#5c7cfa', '#764ba2'];

    circles.forEach(circle => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        circle.style.background = randomColor;
    });
}, 10000);

// Add parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-shapes .shape');

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add keyboard interactions
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        // Spacebar creates random animation burst
        const elements = document.querySelectorAll('.feature-card, .gallery-item');
        elements.forEach(el => {
            el.style.animation = 'jello 1s ease-in-out';
            setTimeout(() => {
                el.style.animation = '';
            }, 1000);
        });
    }

    if (e.key === 'ArrowUp') {
        // Up arrow makes everything bounce
        document.body.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 600);
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Activate super animation mode
        document.body.classList.add('super-animation-mode');

        const superStyle = document.createElement('style');
        superStyle.textContent = `
            .super-animation-mode * {
                animation-duration: 0.5s !important;
                animation-iteration-count: infinite !important;
            }

            .super-animation-mode .floating-circle {
                animation: float 1s ease-in-out infinite,
                          spin 2s linear infinite,
                          pulse 1.5s ease-in-out infinite;
            }
        `;
        document.head.appendChild(superStyle);

        alert('🎉 ¡Modo súper animación activado! 🎉');

        setTimeout(() => {
            document.body.classList.remove('super-animation-mode');
            document.head.removeChild(superStyle);
        }, 10000);

        konamiCode = [];
    }
});

console.log('✨ Magic Animations loaded! Try the Konami Code for a surprise! ✨');