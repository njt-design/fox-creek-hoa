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

// Events Data - Default events
const defaultEvents = [
    {
        id: 1,
        title: "HOA Board Meeting",
        description: "Monthly board meeting to discuss community matters, budget updates, and resident concerns.",
        startDate: "2024-03-15",
        endDate: "2024-03-15",
        startTime: "19:00",
        endTime: "21:00",
        streetLocation: "Community Center",
        status: "upcoming",
        created: new Date().toISOString()
    },
    {
        id: 2,
        title: "Spring Community Cleanup",
        description: "Join your neighbors for our annual spring cleanup. We'll provide supplies and refreshments.",
        startDate: "2024-03-23",
        endDate: "2024-03-23",
        startTime: "09:00",
        endTime: "12:00",
        streetLocation: "Main Park Area",
        status: "upcoming",
        created: new Date().toISOString()
    },
    {
        id: 3,
        title: "Neighborhood Block Party",
        description: "Annual block party with food, games, and activities for the whole family. Bring a dish to share!",
        startDate: "2024-04-06",
        endDate: "2024-04-06",
        startTime: "16:00",
        endTime: "20:00",
        streetLocation: "Fox Creek Park",
        status: "upcoming",
        created: new Date().toISOString()
    },
    {
        id: 4,
        title: "Architectural Review Meeting",
        description: "Review of pending architectural requests and exterior modification applications.",
        startDate: "2024-04-12",
        endDate: "2024-04-12",
        startTime: "18:30",
        endTime: "20:30",
        streetLocation: "Community Center",
        status: "upcoming",
        created: new Date().toISOString()
    }
];

// Get events from localStorage or use defaults
function getEvents() {
    const savedEvents = localStorage.getItem('foxCreekEvents');
    if (savedEvents) {
        return JSON.parse(savedEvents);
    }
    // Save default events to localStorage
    localStorage.setItem('foxCreekEvents', JSON.stringify(defaultEvents));
    return defaultEvents;
}

// Save events to localStorage
function saveEvents(events) {
    localStorage.setItem('foxCreekEvents', JSON.stringify(events));
}

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
    if (!list) return;
    
    const residents = getResidents();
    list.innerHTML = '';
    
    if (residents.length === 0) {
        list.innerHTML = `
            <div class="no-residents">
                <i class="fas fa-users"></i>
                <h3>No Residents Yet</h3>
                <p>Add residents to the directory to get started.</p>
            </div>
        `;
        return;
    }
    
    residents.forEach(resident => {
        const card = document.createElement('div');
        card.className = 'resident-card';
        card.innerHTML = `
            <div class="resident-photo">${resident.photo || '<i class="fas fa-user"></i>'}</div>
            <div class="resident-info">
                <div class="resident-name">${resident.name}</div>
                <div class="resident-street">${resident.address || resident.street}</div>
                ${resident.business ? `<div class="resident-business">${resident.business}</div>` : ''}
                ${resident.skills ? `<div class="resident-skills">${resident.skills}</div>` : ''}
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
    if (!grid) return;
    
    const events = getEvents();
    grid.innerHTML = '';
    
    if (events.length === 0) {
        grid.innerHTML = `
            <div class="events-empty">
                <i class="fas fa-calendar-times"></i>
                <h3>No Events Scheduled</h3>
                <p>Check back soon for upcoming community events!</p>
            </div>
        `;
        return;
    }
    
    // Sort events by start date
    const sortedEvents = events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    
    sortedEvents.forEach(event => {
        const eventCard = createEventCard(event);
        grid.appendChild(eventCard);
    });
}

// Create Event Card Component
function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    
    // Determine event status
    const now = new Date();
    const startDate = new Date(event.startDate + 'T' + event.startTime);
    const endDate = new Date(event.endDate + 'T' + event.endTime);
    
    let status = 'upcoming';
    if (now >= startDate && now <= endDate) {
        status = 'ongoing';
    } else if (now > endDate) {
        status = 'past';
    }
    
    // Format date range
    const startDateFormatted = startDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const startTimeFormatted = startDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    const endTimeFormatted = endDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    const timeRange = startTimeFormatted === endTimeFormatted ? 
        startTimeFormatted : 
        `${startTimeFormatted} - ${endTimeFormatted}`;
    
    eventCard.innerHTML = `
        <div class="event-status ${status}">${status}</div>
        <h3 class="event-title">${event.title}</h3>
        <p class="event-description">${event.description}</p>
        
        <div class="event-details">
            <div class="event-detail">
                <i class="fas fa-calendar-alt"></i>
                <span>${startDateFormatted}</span>
            </div>
            <div class="event-detail">
                <i class="fas fa-clock"></i>
                <span>${timeRange}</span>
            </div>
            <div class="event-detail">
                <i class="fas fa-map-marker-alt"></i>
                <span>${event.streetLocation}</span>
            </div>
        </div>
        
        <div class="event-actions">
            <button class="event-btn event-btn-primary" onclick="viewEventDetails(${event.id})">
                <i class="fas fa-info-circle"></i>
                View Details
            </button>
            <button class="event-btn event-btn-secondary" onclick="addToCalendar(${event.id})">
                <i class="fas fa-calendar-plus"></i>
                Add to Calendar
            </button>
        </div>
    `;
    
    return eventCard;
}

// View Event Details
function viewEventDetails(eventId) {
    const events = getEvents();
    const event = events.find(e => e.id === eventId);
    if (event) {
        alert(`Event Details:\n\n${event.title}\n\n${event.description}\n\nDate: ${event.startDate}\nTime: ${event.startTime} - ${event.endTime}\nLocation: ${event.streetLocation}`);
    }
}

// Add to Calendar (placeholder)
function addToCalendar(eventId) {
    const events = getEvents();
    const event = events.find(e => e.id === eventId);
    if (event) {
        // Create calendar event data
        const startDateTime = new Date(event.startDate + 'T' + event.startTime);
        const endDateTime = new Date(event.endDate + 'T' + event.endTime);
        
        const calendarData = {
            title: event.title,
            description: event.description,
            location: event.streetLocation,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString()
        };
        
        // For now, just show a message
        alert(`Adding "${event.title}" to your calendar...\n\nThis feature will integrate with your device's calendar app.`);
    }
}

// Admin Event Management Functions
function initializeEventCreation() {
    const createEventBtn = document.querySelector('button[onclick*="Create Event"]');
    if (createEventBtn) {
        createEventBtn.onclick = showEventCreationForm;
    }
    
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', handleEventCreation);
    }
}

function showEventCreationForm() {
    // Show the event creation form (assuming it's in a modal or section)
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.scrollIntoView({ behavior: 'smooth' });
        // Focus on the first input
        const firstInput = eventForm.querySelector('input[type="text"]');
        if (firstInput) {
            firstInput.focus();
        }
    } else {
        // If no form exists, create a simple modal
        createEventModal();
    }
}

function createEventModal() {
    // Create a modal for event creation
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Create New Event</h3>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <form id="event-creation-form">
                <div class="form-group">
                    <label for="event-title">Event Title *</label>
                    <input type="text" id="event-title" name="title" required>
                </div>
                <div class="form-group">
                    <label for="event-description">Description *</label>
                    <textarea id="event-description" name="description" rows="4" required></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="event-start-date">Start Date *</label>
                        <input type="date" id="event-start-date" name="startDate" required>
                    </div>
                    <div class="form-group">
                        <label for="event-end-date">End Date *</label>
                        <input type="date" id="event-end-date" name="endDate" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="event-start-time">Start Time *</label>
                        <input type="time" id="event-start-time" name="startTime" required>
                    </div>
                    <div class="form-group">
                        <label for="event-end-time">End Time *</label>
                        <input type="time" id="event-end-time" name="endTime" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="event-location">Street Location *</label>
                    <input type="text" id="event-location" name="streetLocation" placeholder="e.g., Walnut Street, Community Center" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Create Event</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            display: block;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        .modal-content {
            background-color: white;
            margin: 5% auto;
            padding: 0;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e0e0e0;
        }
        .modal-header h3 {
            margin: 0;
            color: var(--rich-black);
        }
        .close {
            font-size: 2rem;
            cursor: pointer;
            color: #999;
        }
        .close:hover {
            color: var(--rich-black);
        }
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        .form-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            padding: 1.5rem;
            border-top: 1px solid #e0e0e0;
        }
        #event-creation-form {
            padding: 1.5rem;
        }
    `;
    document.head.appendChild(style);
    
    // Handle form submission
    document.getElementById('event-creation-form').addEventListener('submit', handleEventCreation);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function handleEventCreation(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const eventData = {
        id: Date.now(), // Simple ID generation
        title: formData.get('title'),
        description: formData.get('description'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime'),
        streetLocation: formData.get('streetLocation'),
        status: 'upcoming',
        created: new Date().toISOString()
    };
    
    // Validate required fields
    if (!eventData.title || !eventData.description || !eventData.startDate || !eventData.endDate || !eventData.startTime || !eventData.endTime || !eventData.streetLocation) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate dates
    if (new Date(eventData.startDate) > new Date(eventData.endDate)) {
        alert('End date must be after start date.');
        return;
    }
    
    // Get existing events and add new one
    const events = getEvents();
    events.push(eventData);
    saveEvents(events);
    
    // Close modal if it exists
    closeModal();
    
    // Reset the form
    event.target.reset();
    
    // Refresh events display
    populateEvents();
    
    // Show success message
    alert(`Event "${eventData.title}" created successfully!`);
}

// Add event management to admin dashboard
function initializeAdminEventManagement() {
    initializeEventCreation();
}

// Resident Management Functions
function showResidentForm() {
    const residentForm = document.getElementById('resident-form');
    if (residentForm) {
        residentForm.style.display = 'block';
        residentForm.scrollIntoView({ behavior: 'smooth' });
        // Focus on first input
        const firstInput = residentForm.querySelector('input[type="text"]');
        if (firstInput) {
            firstInput.focus();
        }
    }
}

function hideResidentForm() {
    const residentForm = document.getElementById('resident-form');
    if (residentForm) {
        residentForm.style.display = 'none';
        // Reset form
        document.getElementById('resident-creation-form').reset();
    }
}

function initializeResidentManagement() {
    const residentForm = document.getElementById('resident-creation-form');
    if (residentForm) {
        residentForm.addEventListener('submit', handleResidentCreation);
    }
}

function handleResidentCreation(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const residentData = {
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        bio: formData.get('bio'),
        skills: formData.get('skills'),
        business: formData.get('business'),
        businessDesc: formData.get('businessDesc'),
        created: new Date().toISOString()
    };
    
    // Validate required fields
    if (!residentData.name || !residentData.email || !residentData.address) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(residentData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Get existing residents and add new one
    const residents = getResidents();
    residents.push(residentData);
    saveResidents(residents);
    
    // Hide form
    hideResidentForm();
    
    // Refresh residents display
    populateResidents();
    
    // Show success message
    alert(`Resident "${residentData.name}" added successfully!`);
}

// Get residents from localStorage or use defaults
function getResidents() {
    const savedResidents = localStorage.getItem('foxCreekResidents');
    if (savedResidents) {
        return JSON.parse(savedResidents);
    }
    // Return default residents (from the existing residents array)
    return residents;
}

// Save residents to localStorage
function saveResidents(residents) {
    localStorage.setItem('foxCreekResidents', JSON.stringify(residents));
}

// Documents Search Functionality
function initializeDocumentsSearch() {
    const searchInput = document.getElementById('documents-search');
    const categoryFilter = document.getElementById('category-filter');
    const clearSearchBtn = document.getElementById('clear-search');
    const documentsGrid = document.getElementById('documents-grid');
    
    if (!searchInput || !categoryFilter || !documentsGrid) return;
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;
        
        if (searchTerm) {
            clearSearchBtn.style.display = 'block';
        } else {
            clearSearchBtn.style.display = 'none';
        }
        
        filterDocuments(searchTerm, selectedCategory);
    });
    
    // Category filter
    categoryFilter.addEventListener('change', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = this.value;
        filterDocuments(searchTerm, selectedCategory);
    });
    
    // Clear search
    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        categoryFilter.value = '';
        this.style.display = 'none';
        filterDocuments('', '');
    });
}

function filterDocuments(searchTerm, selectedCategory) {
    const documentsGrid = document.getElementById('documents-grid');
    const categories = documentsGrid.querySelectorAll('.document-category');
    const allLinks = documentsGrid.querySelectorAll('.document-link');
    
    let visibleCount = 0;
    let hasResults = false;
    
    categories.forEach(category => {
        const categoryName = category.getAttribute('data-category');
        const links = category.querySelectorAll('.document-link');
        let categoryHasResults = false;
        
        // Check if category matches filter
        const categoryMatches = !selectedCategory || categoryName === selectedCategory;
        
        links.forEach(link => {
            const linkText = link.textContent.toLowerCase();
            const keywords = link.getAttribute('data-keywords') || '';
            const keywordMatch = !searchTerm || keywords.includes(searchTerm) || linkText.includes(searchTerm);
            
            if (categoryMatches && keywordMatch) {
                link.classList.remove('hidden');
                categoryHasResults = true;
                visibleCount++;
            } else {
                link.classList.add('hidden');
            }
        });
        
        if (categoryMatches && categoryHasResults) {
            category.classList.remove('hidden');
            hasResults = true;
        } else {
            category.classList.add('hidden');
        }
    });
    
    // Show/hide results info
    updateSearchResultsInfo(visibleCount, searchTerm, selectedCategory);
    
    // Show no results message if needed
    if (!hasResults) {
        showNoResultsMessage(searchTerm, selectedCategory);
    } else {
        hideNoResultsMessage();
    }
}

function updateSearchResultsInfo(count, searchTerm, selectedCategory) {
    let existingInfo = document.querySelector('.search-results-info');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    if (searchTerm || selectedCategory) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'search-results-info';
        
        let message = `Found ${count} document${count !== 1 ? 's' : ''}`;
        if (searchTerm) {
            message += ` matching "${searchTerm}"`;
        }
        if (selectedCategory) {
            const categoryName = document.querySelector(`option[value="${selectedCategory}"]`).textContent;
            message += ` in ${categoryName}`;
        }
        
        infoDiv.textContent = message;
        document.getElementById('documents-grid').insertBefore(infoDiv, document.getElementById('documents-grid').firstChild);
    }
}

function showNoResultsMessage(searchTerm, selectedCategory) {
    let existingMessage = document.querySelector('.no-results');
    if (existingMessage) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'no-results';
    messageDiv.innerHTML = `
        <i class="fas fa-search"></i>
        <h3>No Documents Found</h3>
        <p>Try adjusting your search terms or category filter.</p>
    `;
    
    document.getElementById('documents-grid').appendChild(messageDiv);
}

function hideNoResultsMessage() {
    const existingMessage = document.querySelector('.no-results');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Populate residents by default
    populateResidents();
    
    // Populate events
    populateEvents();
    
    // Initialize admin event management
    initializeAdminEventManagement();
    
    // Initialize resident management
    initializeResidentManagement();
    
    // Initialize documents search
    initializeDocumentsSearch();
    
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

