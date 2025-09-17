// Global Error Handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // Could send to analytics service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send to analytics service
});

// Performance Monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            const loadTime = entry.loadEventEnd - entry.loadEventStart;
            console.log('Page load time:', loadTime, 'ms');
            
            // Send to analytics (placeholder)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    'custom_parameter_1': loadTime
                });
            }
        }
        
        if (entry.entryType === 'measure') {
            console.log('Custom measure:', entry.name, entry.duration, 'ms');
        }
    }
});

if ('PerformanceObserver' in window) {
    performanceObserver.observe({ entryTypes: ['navigation', 'measure'] });
}

// Core Web Vitals Monitoring
function measureWebVitals() {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime, 'ms');
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime, 'ms');
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            console.log('CLS:', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
}

// Initialize performance monitoring
measureWebVitals();

// User Interaction Tracking
function trackUserInteraction(action, element) {
    console.log('User interaction:', action, element);
    
    // Send to analytics (placeholder)
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'user_interaction',
            'event_label': element
        });
    }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isExpanded);
        trackUserInteraction('mobile_menu_toggle', 'nav-toggle');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    });
}

// Smooth scrolling for navigation links
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

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');

if (newsletterForm && newsletterMessage) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const email = emailInput.value.trim();
        
        // Clear previous messages
        clearMessage(newsletterMessage);
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showMessage(newsletterMessage, 'Please enter your email address.', 'error');
            emailInput.focus();
            return;
        }
        
        if (!emailRegex.test(email)) {
            showMessage(newsletterMessage, 'Please enter a valid email address.', 'error');
            emailInput.focus();
            return;
        }
        
        // Add loading state to button
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission with loading state
        showMessage(newsletterMessage, 'Subscribing...', 'info');
        
        setTimeout(() => {
            showMessage(newsletterMessage, 'Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1000);
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showMessage(contactMessage, 'Please fill in all fields.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage(contactMessage, 'Please enter a valid email address.', 'error');
        return;
    }
    
        // Add loading state to button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        showMessage(contactMessage, 'Sending message...', 'info');
        
        setTimeout(() => {
            showMessage(contactMessage, 'Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1500);
});

// Payment Form Handling
const paymentForm = document.getElementById('payment-form');
const paymentMessage = document.getElementById('payment-message');

if (paymentForm && paymentMessage) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const propertyAddress = document.getElementById('property-address').value.trim();
        const residentName = document.getElementById('resident-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const amount = document.getElementById('amount').value;
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiry = document.getElementById('expiry').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
        const billingAddress = document.getElementById('billing-address').value.trim();
        
        // Clear previous messages
        clearMessage(paymentMessage);
        
        // Basic validation
        if (!propertyAddress || !residentName || !email || !amount || !cardNumber || !expiry || !cvv || !billingAddress) {
            showMessage(paymentMessage, 'Please fill in all required fields.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage(paymentMessage, 'Please enter a valid email address.', 'error');
            return;
        }
        
        if (parseFloat(amount) <= 0) {
            showMessage(paymentMessage, 'Please enter a valid payment amount.', 'error');
            return;
        }
        
        // Basic card number validation (just length check)
        const cleanCardNumber = cardNumber.replace(/\s/g, '');
        if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
            showMessage(paymentMessage, 'Please enter a valid card number.', 'error');
            return;
        }
        
        // Add loading state to button
        const submitBtn = paymentForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate payment processing
        showMessage(paymentMessage, 'Processing payment...', 'info');
        
        setTimeout(() => {
            showMessage(paymentMessage, 'Payment successful! Thank you for your payment.', 'success');
            paymentForm.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 2000);
    });
}

// Helper function to show messages
function showMessage(element, text, type) {
    if (!element) return;
    
    element.textContent = text;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
    
    // Announce to screen readers
    element.setAttribute('aria-live', 'polite');
    
    // Hide message after 5 seconds (except for info messages)
    if (type !== 'info') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// Utility function to clear messages
function clearMessage(element) {
    if (!element) return;
    
    element.textContent = '';
    element.className = 'form-message';
    element.style.display = 'none';
    element.removeAttribute('aria-live');
}

// Security: CSRF Token Generation
function generateCSRFToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Security: Input Sanitization
function sanitizeInput(input) {
    return input.replace(/[<>\"'&]/g, function(match) {
        const escape = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '&': '&amp;'
        };
        return escape[match];
    });
}

// Security: Rate Limiting
const rateLimitMap = new Map();
function checkRateLimit(formId, maxAttempts = 5, windowMs = 60000) {
    const now = Date.now();
    const key = `${formId}_${window.location.hostname}`;
    
    if (!rateLimitMap.has(key)) {
        rateLimitMap.set(key, { attempts: 0, resetTime: now + windowMs });
    }
    
    const rateLimit = rateLimitMap.get(key);
    
    if (now > rateLimit.resetTime) {
        rateLimit.attempts = 0;
        rateLimit.resetTime = now + windowMs;
    }
    
    if (rateLimit.attempts >= maxAttempts) {
        return false;
    }
    
    rateLimit.attempts++;
    return true;
}

// Directory Data
const residents = [
    {
        name: "John & Sarah Smith",
        street: "123 Oak Street",
        business: "Smith Family Dentistry",
        photo: "👨‍⚕️"
    },
    {
        name: "Mike Johnson",
        street: "456 Pine Avenue",
        business: null,
        photo: "👨"
    },
    {
        name: "Lisa & David Brown",
        street: "789 Maple Drive",
        business: "Brown's Landscaping",
        photo: "👩‍🌾"
    },
    {
        name: "Robert Wilson",
        street: "321 Cedar Lane",
        business: null,
        photo: "👨‍💼"
    },
    {
        name: "Jennifer Davis",
        street: "654 Elm Street",
        business: "Davis Legal Services",
        photo: "👩‍💼"
    },
    {
        name: "Tom & Mary Anderson",
        street: "987 Birch Road",
        business: null,
        photo: "👫"
    },
    {
        name: "Carlos Rodriguez",
        street: "147 Willow Way",
        business: "Rodriguez Auto Repair",
        photo: "👨‍🔧"
    },
    {
        name: "Emily Chen",
        street: "258 Spruce Street",
        business: null,
        photo: "👩"
    },
    {
        name: "James & Linda Thompson",
        street: "369 Dogwood Drive",
        business: "Thompson Real Estate",
        photo: "👨‍💼"
    },
    {
        name: "Patricia Williams",
        street: "741 Magnolia Lane",
        business: "Williams Accounting",
        photo: "👩‍💻"
    },
    {
        name: "Michael & Susan Garcia",
        street: "852 Hickory Hill",
        business: null,
        photo: "👫"
    },
    {
        name: "David Lee",
        street: "963 Poplar Place",
        business: "Lee's Photography Studio",
        photo: "👨‍🎨"
    }
];

const businesses = [
    {
        name: "Fox Creek Landscaping",
        owner: "Green Thumb Services",
        phone: "(555) 111-2222",
        email: "info@foxcreeklandscaping.com",
        services: "Lawn care, tree trimming, garden design"
    },
    {
        name: "Neighborhood Handyman",
        owner: "Fix-It Right",
        phone: "(555) 333-4444",
        email: "contact@fixitright.com",
        services: "Home repairs, maintenance, installations"
    },
    {
        name: "Community Cleaners",
        owner: "Sparkle & Shine",
        phone: "(555) 555-6666",
        email: "hello@sparkleshine.com",
        services: "House cleaning, carpet cleaning, window washing"
    },
    {
        name: "Fox Creek Catering",
        owner: "Taste of Home",
        phone: "(555) 777-8888",
        email: "events@tasteofhome.com",
        services: "Event catering, party planning, meal prep"
    }
];

// Events Data
const events = [
    {
        title: "HOA Board Meeting",
        date: "March 15, 2024",
        time: "7:00 PM",
        location: "Community Center",
        description: "Monthly board meeting to discuss community matters, budget updates, and resident concerns."
    },
    {
        title: "Spring Community Cleanup",
        date: "March 23, 2024",
        time: "9:00 AM - 12:00 PM",
        location: "Main Park Area",
        description: "Join your neighbors for our annual spring cleanup. We'll provide supplies and refreshments."
    },
    {
        title: "Neighborhood Block Party",
        date: "April 6, 2024",
        time: "4:00 PM - 8:00 PM",
        location: "Fox Creek Park",
        description: "Annual block party with food, games, and activities for the whole family. Bring a dish to share!"
    },
    {
        title: "Architectural Review Meeting",
        date: "April 12, 2024",
        time: "6:30 PM",
        location: "Community Center",
        description: "Review of pending architectural requests and exterior modification applications."
    }
];

// Directory Functions
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Populate the selected tab
    if (tabName === 'residents') {
        populateResidents();
    } else if (tabName === 'businesses') {
        populateBusinesses();
    }
}

function populateResidents() {
    const list = document.getElementById('residents-list');
    list.innerHTML = '';
    
    residents.forEach(resident => {
        const card = document.createElement('div');
        card.className = 'resident-card';
        card.innerHTML = `
            <div class="resident-photo">${resident.photo}</div>
            <div class="resident-info">
                <div class="resident-name">${resident.name}</div>
                <div class="resident-street">${resident.street}</div>
                ${resident.business ? `<div class="resident-business">${resident.business}</div>` : ''}
            </div>
        `;
        list.appendChild(card);
    });
}

function populateBusinesses() {
    const grid = document.getElementById('businesses-grid');
    grid.innerHTML = '';
    
    businesses.forEach(business => {
        const item = document.createElement('div');
        item.className = 'directory-item';
        item.innerHTML = `
            <h4>${business.name}</h4>
            <p class="owner">Owner: ${business.owner}</p>
            <p class="contact">Phone: ${business.phone}</p>
            <p class="contact">Email: ${business.email}</p>
            <p class="services">Services: ${business.services}</p>
        `;
        grid.appendChild(item);
    });
}

function searchDirectory() {
    const searchTerm = document.getElementById('directory-search').value.toLowerCase();
    const cards = document.querySelectorAll('.resident-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Populate Events
function populateEvents() {
    const grid = document.getElementById('events-grid');
    grid.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h4>${event.title}</h4>
            <p class="event-date">${event.date} at ${event.time}</p>
            <p class="event-location">📍 ${event.location}</p>
            <p class="event-description">${event.description}</p>
        `;
        grid.appendChild(eventCard);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Populate residents by default
    populateResidents();
    
    // Populate events
    populateEvents();
    
    // Add search functionality to directory search input
    const searchInput = document.getElementById('directory-search');
    if (searchInput) {
        searchInput.addEventListener('input', searchDirectory);
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

