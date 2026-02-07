// Weather App JavaScript

// Smooth scroll for navigation links
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

// Form validation
const weatherForm = document.getElementById('weatherForm');
if (weatherForm) {
    weatherForm.addEventListener('submit', function(e) {
        const cityInput = this.querySelector('input[name="city"]');
        const city = cityInput.value.trim();
        
        if (!city) {
            e.preventDefault();
            showNotification('Please enter a city name', 'error');
            cityInput.focus();
            return false;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.search-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Searching...</span>';
        submitBtn.disabled = true;
        
        // Store original state to restore if needed
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 10000); // Reset after 10 seconds max
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    const heroSection = document.querySelector('.hero-section .container');
    if (heroSection) {
        heroSection.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .recent-card, .detail-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add floating animation to weather icon
const weatherIcon = document.querySelector('.weather-icon-large img');
if (weatherIcon) {
    weatherIcon.style.animation = 'float 3s ease-in-out infinite';
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Auto-complete suggestions for cities (basic)
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    const popularCities = [
        'London', 'New York', 'Tokyo', 'Paris', 'Dubai', 'Singapore',
        'Sydney', 'Hong Kong', 'Barcelona', 'Amsterdam', 'Rome', 'Berlin',
        'Los Angeles', 'Chicago', 'Toronto', 'Mumbai', 'Bangkok', 'Istanbul'
    ];
    
    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        if (value.length >= 2) {
            const matches = popularCities.filter(city => 
                city.toLowerCase().startsWith(value)
            );
            // You can add autocomplete dropdown here if needed
        }
    });
}

// Add weather condition specific background colors
function updateWeatherBackground(description) {
    const weatherSection = document.querySelector('.main-weather');
    if (!weatherSection) return;
    
    const desc = description.toLowerCase();
    let gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    if (desc.includes('clear')) {
        gradient = 'linear-gradient(135deg, #FFA17F 0%, #00223E 100%)';
    } else if (desc.includes('cloud')) {
        gradient = 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)';
    } else if (desc.includes('rain') || desc.includes('drizzle')) {
        gradient = 'linear-gradient(135deg, #4CA1AF 0%, #2C3E50 100%)';
    } else if (desc.includes('snow')) {
        gradient = 'linear-gradient(135deg, #E6DADA 0%, #274046 100%)';
    } else if (desc.includes('thunder')) {
        gradient = 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)';
    }
    
    // Apply subtle gradient to detail cards based on weather
    const detailCards = document.querySelectorAll('.detail-icon');
    detailCards.forEach(card => {
        card.style.background = gradient;
    });
}

// Call this function if weather data is present
const weatherDescription = document.querySelector('.weather-description');
if (weatherDescription) {
    updateWeatherBackground(weatherDescription.textContent);
}

// Mobile menu toggle (if implementing responsive menu)
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && !menuToggle?.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
    
    // Enter key on search input
    if (e.key === 'Enter' && document.activeElement === searchInput) {
        weatherForm?.submit();
    }
});

// Local storage for recent searches (client-side)
function saveRecentSearch(city) {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    
    // Remove if already exists
    recentSearches = recentSearches.filter(c => c.toLowerCase() !== city.toLowerCase());
    
    // Add to beginning
    recentSearches.unshift(city);
    
    // Keep only last 10
    recentSearches = recentSearches.slice(0, 10);
    
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

// Console log for developers
console.log('%c⛅ WeatherNow App', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cBuilt with Django + Modern Web Technologies', 'font-size: 12px; color: #764ba2;');
