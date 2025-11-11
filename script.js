import { api } from './js/api.js';

let isSearching = false;
let carsLoaded = false;

// Show error message
function showError(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

// Show success message
function showSuccess(elementId, message) {
    const successDiv = document.getElementById(elementId);
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
    }
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    // Clear previous messages
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('loginSuccess').style.display = 'none';

    if (!email || !password) {
        showError('loginError', 'Please fill in all fields.');
        return;
    }

    try {
        const response = await api.auth.login({
            email: email,
            password: password
        });

        if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            showSuccess('loginSuccess', 'Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 1500);
        } else {
            showError('loginError', 'Login failed. Please try again.');
        }
    } catch (err) {
        console.error('Login error:', err);
        showError('loginError', err.message || 'Login failed. Please check your credentials.');
    }
}

// Handle Registration
async function handleRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Clear previous messages
    document.getElementById('registerError').style.display = 'none';
    document.getElementById('registerSuccess').style.display = 'none';

    if (!name || !email || !password || !confirmPassword) {
        showError('registerError', 'Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        showError('registerError', 'Passwords do not match.');
        return;
    }

    if (password.length < 6) {
        showError('registerError', 'Password must be at least 6 characters long.');
        return;
    }

    try {
        const response = await api.auth.register({
            name: name,
            email: email,
            password: password
        });

        if (response.user) {
            showSuccess('registerSuccess', 'Registration successful! Redirecting to login...');
            setTimeout(() => {
                window.location.href = '/login.html';
            }, 2000);
        } else {
            showError('registerError', 'Registration failed. Please try again.');
        }
    } catch (err) {
        console.error('Registration error:', err);
        showError('registerError', err.message || 'Registration failed. Please try again.');
    }
}

// Scroll to services
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Load cars from API
async function loadCars() {
    if (carsLoaded) return;

    const carList = document.querySelector('.car-list');
    const loading = document.getElementById('loading');

    if (!carList) return;

    try {
        carsLoaded = true;
        if (loading) loading.style.display = 'block';

        const cars = await api.cars.getAll();
        if (loading) loading.style.display = 'none';

        if (cars.length === 0) {
            carList.innerHTML = '<p>No cars available.</p>';
            return;
        }

        carList.innerHTML = cars.map(car => `
            <div class="car-card">
                <img src="${car.imageUrl || car.imagePath}" 
                     alt="${car.title}" 
                     onerror="this.src='./assets/vehicle-images/toyota-vitz/front.jpg';">
                <h3>${car.title}</h3>
                <p>KES ${car.pricePerDay}/day</p>
                <p class="car-description">${car.description}</p>
                <button class="book-btn" data-car-id="${car.id}" 
                        ${!car.available ? 'disabled' : ''}>
                  ${car.available ? 'Book Now' : 'Not Available'}
                </button>
            </div>
        `).join('');

        // Add click handlers to book buttons
        document.querySelectorAll('.book-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!localStorage.getItem('token')) {
                    window.location.href = 'login.html';
                    return;
                }
                window.location.href = `request-quote-page.html?carId=${btn.dataset.carId}`;
            });
        });

    } catch (err) {
        console.error('Failed to load cars:', err);
        if (loading) loading.style.display = 'none';
        carList.innerHTML = '<p>Failed to load cars. Please try again later.</p>';
        carsLoaded = false;
    }
}

// Search cars
async function searchCar() {
    if (isSearching) return;

    const query = document.getElementById("search")?.value.trim().toLowerCase();
    const carList = document.querySelector('.car-list');
    const loading = document.getElementById('loading');

    if (!carList || !query) {
        carsLoaded = false;
        loadCars();
        return;
    }

    try {
        isSearching = true;
        if (loading) loading.style.display = 'block';

        const cars = await api.cars.search(query);
        if (loading) loading.style.display = 'none';

        if (cars.length === 0) {
            carList.innerHTML = `<p>No cars found matching "${query}".</p>`;
            isSearching = false;
            return;
        }

        carList.innerHTML = cars.map(car => `
            <div class="car-card">
                <img src="${car.imageUrl || car.imagePath}" 
                     alt="${car.title}" 
                     onerror="this.src='./assets/vehicle-images/toyota-vitz/front.jpg';">
                <h3>${car.title}</h3>
                <p>KES ${car.pricePerDay}/day</p>
                <p class="car-description">${car.description}</p>
                <button class="book-btn" data-car-id="${car.id}" 
                        ${!car.available ? 'disabled' : ''}>
                  ${car.available ? 'Book Now' : 'Not Available'}
                </button>
            </div>
        `).join('');

        isSearching = false;

    } catch (err) {
        console.error('Search failed:', err);
        if (loading) loading.style.display = 'none';
        carList.innerHTML = '<p>Search failed. Please try again.</p>';
        isSearching = false;
    }
}

// Initialize everything once
document.addEventListener('DOMContentLoaded', () => {
    // Setup login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Setup registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }

    // Load cars only once
    const carList = document.querySelector('.car-list');
    if (carList && !carsLoaded) {
        loadCars();
    }

    // Setup search button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            searchCar();
        });
    }

    // Allow Enter key for search
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchCar();
            }
        });
    }
}, { once: true });