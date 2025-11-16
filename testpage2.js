// Get car ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');

// Configuration - Update this with your teammate's API URL
const API_BASE_URL = 'http://localhost:3000/api'; // Change to your backend URL

// Slideshow functionality
let slideIndex = 1;

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Initialize slideshow
window.plusSlides = plusSlides;

// Fetch and display car details
async function loadCarDetails() {
    // Check if car ID exists
    if (!carId) {
        document.getElementById('car-title').textContent = 'No car selected';
        document.querySelector('.car-info').innerHTML = 
            '<p style="color: red;">Please select a car from the home page.</p>';
        return;
    }

    try {
        // Show loading state
        document.getElementById('car-title').textContent = 'Loading...';
        
        // Fetch car data from backend
        const response = await fetch(`${API_BASE_URL}/cars/${carId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const carData = await response.json();
        
        // Populate car details
        populateCarDetails(carData);
        
    } catch (error) {
        console.error('Error loading car details:', error);
        document.getElementById('car-title').textContent = 'Error Loading Car';
        document.querySelector('.car-info').innerHTML = 
            '<p style="color: red;">Failed to load car details. Please try again later.</p>';
    }
}

function populateCarDetails(car) {
    // Update title
    document.getElementById('car-title').textContent = car.name || 'Car Details';
    
    // Update price
    document.getElementById('car-price').textContent = car.pricePerDay 
        ? `KSh ${car.pricePerDay}` 
        : 'Price not available';
    
    // Update description
    document.getElementById('car-description').textContent = 
        car.description || 'No description available';
    
    // Update images
    // Assuming the backend returns an array of image URLs
    const images = car.images || [];
    
    if (images.length > 0) {
        document.getElementById('car-img-1').src = images[0] || '';
        document.getElementById('car-img-2').src = images[1] || images[0] || '';
        document.getElementById('car-img-3').src = images[2] || images[0] || '';
        document.getElementById('car-img-4').src = images[3] || images[0] || '';
    } else if (car.image) {
        // If backend returns a single image
        const singleImg = car.image;
        document.getElementById('car-img-1').src = singleImg;
        document.getElementById('car-img-2').src = singleImg;
        document.getElementById('car-img-3').src = singleImg;
        document.getElementById('car-img-4').src = singleImg;
    }
    
    // Update request quote button to pass car ID
    const quoteButton = document.querySelector('.car-info a');
    if (quoteButton) {
        quoteButton.href = `request-quote-page.html?carId=${carId}`;
    }
    
    // Initialize slideshow after images are loaded
    showSlides(slideIndex);
}

// Load car details when page loads
document.addEventListener('DOMContentLoaded', loadCarDetails);