// Enhanced Magic UI Script with Shadcn styling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enhanced animations and interactions
    initCursorTrail();
    initScrollAnimations();
    initMarqueeInteractions();
    initButtonEnhancements();
    initCardAnimations();
    initProgressAnimations();
    initGalleryEffects();
    initKeyboardShortcuts();
    initThemeEffects();
    initPerformanceMonitoring();
});

// Enhanced cursor trail with blend modes
function initCursorTrail() {
    const trail = document.getElementById('cursor-trail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;

        trailX += dx * 0.1;
        trailY += dy * 0.1;

        trail.style.left = trailX - 8 + 'px';
        trail.style.top = trailY - 8 + 'px';

        requestAnimationFrame(animateTrail);
    }

    animateTrail();

    // Enhanced trail effects on hover
    document.querySelectorAll('button, .group, .hover\\:scale-105').forEach(element => {
        element.addEventListener('mouseenter', () => {
            trail.style.transform = 'scale(2)';
            trail.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        });

        element.addEventListener('mouseleave', () => {
            trail.style.transform = 'scale(1)';
            trail.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        });
    });
}

// Advanced scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: [0.1, 0.3, 0.6],
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const ratio = entry.intersectionRatio;

            if (entry.isIntersecting) {
                // Trigger different animations based on intersection ratio
                if (ratio > 0.6) {
                    element.classList.add('fully-visible');
                } else if (ratio > 0.3) {
                    element.classList.add('partially-visible');
                } else {
                    element.classList.add('entering-view');
                }

                // Apply staggered animations for children
                const children = element.querySelectorAll('[class*="animate-"]');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animationDelay = `${index * 100}ms`;
                        child.style.animationPlayState = 'running';
                    }, index * 50);
                });
            }
        });
    }, observerOptions);

    // Observe all animated sections
    document.querySelectorAll('section, .group, [class*="animate-"]').forEach(el => {
        observer.observe(el);
    });

    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[class*="animate-float"]');

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });

        // Dynamic navbar background
        const navbar = document.querySelector('nav');
        if (scrolled > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.5)';
            navbar.style.backdropFilter = 'blur(12px)';
        }
    });
}

// Interactive marquee controls
function initMarqueeInteractions() {
    const marquees = document.querySelectorAll('[class*="animate-marquee"]');

    marquees.forEach(marquee => {
        const parent = marquee.closest('div');

        // Pause on hover
        parent.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });

        parent.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });

        // Speed control on click
        let speedMultiplier = 1;
        parent.addEventListener('click', () => {
            speedMultiplier = speedMultiplier === 1 ? 2 : speedMultiplier === 2 ? 0.5 : 1;
            const currentDuration = parseFloat(getComputedStyle(marquee).animationDuration);
            marquee.style.animationDuration = `${currentDuration / speedMultiplier}s`;
        });

        // Touch interactions for mobile
        let touchStartX = 0;
        parent.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        parent.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX;
            const diff = touchX - touchStartX;

            if (Math.abs(diff) > 50) {
                marquee.style.animationDirection = diff > 0 ? 'reverse' : 'normal';
                touchStartX = touchX;
            }
        });
    });
}

// Enhanced button interactions
function initButtonEnhancements() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '1000';

            button.appendChild(ripple);

            // Animate ripple
            ripple.animate([
                { width: '0', height: '0', opacity: 1 },
                { width: '300px', height: '300px', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => ripple.remove();
        });

        // Magnetic effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });

        // Keyboard accessibility
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}

// Advanced card animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.group');

    cards.forEach((card, index) => {
        // Staggered entrance animation
        card.style.animationDelay = `${index * 100}ms`;

        // 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });

        // Content reveal animation
        const content = card.querySelectorAll('h3, p, div');
        card.addEventListener('mouseenter', () => {
            content.forEach((element, i) => {
                setTimeout(() => {
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                }, i * 50);
            });
        });
    });
}

// Dynamic progress animations
function initProgressAnimations() {
    const progressElements = document.querySelectorAll('[class*="stroke-dasharray"]');

    progressElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate progress fill
                    element.style.strokeDasharray = '251.2';
                    element.style.strokeDashoffset = '75.36';

                    element.animate([
                        { strokeDashoffset: '251.2' },
                        { strokeDashoffset: '75.36' }
                    ], {
                        duration: 2000,
                        easing: 'ease-out'
                    });
                }
            });
        });

        observer.observe(element);
    });

    // Linear progress bars
    const linearProgress = document.querySelectorAll('.bg-white.h-full');
    linearProgress.forEach((bar, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease-out';
                        bar.style.width = bar.getAttribute('data-width') || ['85%', '60%', '40%'][index] || '70%';
                    }, index * 200);
                }
            });
        });

        observer.observe(bar);
    });
}

// Enhanced gallery interactions
function initGalleryEffects() {
    const galleryItems = document.querySelectorAll('.break-inside-avoid');

    galleryItems.forEach((item, index) => {
        // Lazy loading simulation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s ease-out';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        });

        observer.observe(item);

        // Modal functionality
        item.addEventListener('click', () => {
            createModal(item);
        });

        // Keyboard navigation
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                createModal(item);
            }
        });
    });
}

// Modal creation function
function createModal(item) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm';
    modal.style.animation = 'fadeIn 0.3s ease-out';

    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white/10 border border-white/20 rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-auto backdrop-blur-xl';
    modalContent.style.animation = 'scaleIn 0.3s ease-out';

    modalContent.innerHTML = item.innerHTML;

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.className = 'absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors';
    closeBtn.onclick = () => closeModal(modal);

    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close on escape or outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal(modal);
    });
}

function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => modal.remove(), 300);
}

// Keyboard shortcuts and accessibility
function initKeyboardShortcuts() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

    document.addEventListener('keydown', (e) => {
        // Konami code
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateEasterEgg();
            konamiCode = [];
        }

        // Other shortcuts
        switch(e.key) {
            case ' ':
                e.preventDefault();
                triggerGlobalAnimation();
                break;
            case 'h':
                if (e.ctrlKey) {
                    e.preventDefault();
                    document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 'm':
                if (e.ctrlKey) {
                    e.preventDefault();
                    document.querySelector('#marquees').scrollIntoView({ behavior: 'smooth' });
                }
                break;
        }
    });
}

// Easter egg activation
function activateEasterEgg() {
    document.body.classList.add('easter-egg-mode');

    // Create rainbow effect
    const style = document.createElement('style');
    style.textContent = `
        .easter-egg-mode * {
            animation: rainbow 1s linear infinite !important;
        }

        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Show notification
    showNotification('🎉 Easter Egg Activated! 🎉', 'Rainbow mode enabled for 10 seconds!');

    setTimeout(() => {
        document.body.classList.remove('easter-egg-mode');
        document.head.removeChild(style);
    }, 10000);
}

// Global animation trigger
function triggerGlobalAnimation() {
    const elements = document.querySelectorAll('.group, [class*="animate-"]');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                el.style.animation = '';
            }, 600);
        }, index * 50);
    });
}

// Theme effects
function initThemeEffects() {
    // Dynamic grid pattern
    const gridPattern = document.querySelector('[class*="bg-\\[linear-gradient"]');
    if (gridPattern) {
        setInterval(() => {
            const opacity = 0.1 + Math.sin(Date.now() * 0.001) * 0.05;
            gridPattern.style.opacity = opacity;
        }, 100);
    }

    // Floating elements enhancement
    const floatingElements = document.querySelectorAll('.animate-float');
    floatingElements.forEach((element, index) => {
        element.addEventListener('mouseenter', () => {
            element.style.animationDuration = '1s';
            element.style.transform = 'scale(1.5)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.animationDuration = '3s';
            element.style.transform = 'scale(1)';
        });
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor frame rate
    let lastTime = performance.now();
    let frameCount = 0;

    function checkPerformance() {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

            // Reduce animations if performance is poor
            if (fps < 30) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }

            frameCount = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(checkPerformance);
    }

    checkPerformance();
}

// Utility function for notifications
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-xl z-50 animate-slide-in-from-right';
    notification.innerHTML = `
        <h4 class="font-semibold text-white">${title}</h4>
        <p class="text-gray-300 text-sm">${message}</p>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slide-out-to-right 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add additional CSS animations dynamically
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }

    @keyframes slide-in-from-right {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }

    @keyframes slide-out-to-right {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }

    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .entering-view {
        opacity: 0.5;
        transform: translateY(20px);
    }

    .partially-visible {
        opacity: 0.8;
        transform: translateY(10px);
    }

    .fully-visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Accessibility improvements */
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
        .bg-white\\/5 {
            background-color: rgba(255, 255, 255, 0.2) !important;
        }

        .border-white\\/10 {
            border-color: rgba(255, 255, 255, 0.3) !important;
        }
    }

    /* Enhanced focus styles for keyboard navigation */
    button:focus-visible,
    [tabindex]:focus-visible {
        outline: 2px solid white;
        outline-offset: 2px;
        border-radius: 4px;
    }
`;

document.head.appendChild(additionalStyles);

console.log('🎨 Enhanced Magic UI with Shadcn loaded successfully! 🎨');
console.log('💡 Try these shortcuts:');
console.log('   - Spacebar: Global animation burst');
console.log('   - Ctrl+H: Navigate to Hero');
console.log('   - Ctrl+M: Navigate to Marquees');
console.log('   - Konami Code: Special easter egg!');