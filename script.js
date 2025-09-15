// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

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

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showMessage(newsletterMessage, 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showMessage(newsletterMessage, 'Thank you for subscribing to our newsletter!', 'success');
    newsletterForm.reset();
});

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
    
    // Simulate form submission
    showMessage(contactMessage, 'Thank you for your message! We will get back to you soon.', 'success');
    contactForm.reset();
});

// Helper function to show messages
function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// Directory Data
const residents = [
    {
        name: "John & Sarah Smith",
        address: "123 Oak Street",
        phone: "(555) 123-4567",
        email: "smith@email.com"
    },
    {
        name: "Mike Johnson",
        address: "456 Pine Avenue",
        phone: "(555) 234-5678",
        email: "mike.j@email.com"
    },
    {
        name: "Lisa & David Brown",
        address: "789 Maple Drive",
        phone: "(555) 345-6789",
        email: "brown.family@email.com"
    },
    {
        name: "Robert Wilson",
        address: "321 Cedar Lane",
        phone: "(555) 456-7890",
        email: "r.wilson@email.com"
    },
    {
        name: "Jennifer Davis",
        address: "654 Elm Street",
        phone: "(555) 567-8901",
        email: "j.davis@email.com"
    },
    {
        name: "Tom & Mary Anderson",
        address: "987 Birch Road",
        phone: "(555) 678-9012",
        email: "anderson.tm@email.com"
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
    const grid = document.getElementById('residents-grid');
    grid.innerHTML = '';
    
    residents.forEach(resident => {
        const item = document.createElement('div');
        item.className = 'directory-item';
        item.innerHTML = `
            <h4>${resident.name}</h4>
            <p class="address">${resident.address}</p>
            <p class="contact">Phone: ${resident.phone}</p>
            <p class="contact">Email: ${resident.email}</p>
        `;
        grid.appendChild(item);
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
    const activeTab = document.querySelector('.tab-content.active');
    const items = activeTab.querySelectorAll('.directory-item');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
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
    document.getElementById('directory-search').addEventListener('input', searchDirectory);
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
