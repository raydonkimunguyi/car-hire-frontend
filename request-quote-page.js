import { api } from './js/api.js';

// --- Hamburger Menu ---
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      hamburger.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
    });
  }
});

// --- Popup Message ---
function showPopupMessage(message, isError = false) {
  const popup = document.getElementById('popupMessage');
  popup.textContent = message;
  popup.classList.toggle('popup-error', isError);
  popup.style.display = 'block';
  setTimeout(() => (popup.style.display = 'none'), 4000);
}

// --- Initialize Car List for Select ---
async function initQuotePage() {
  try {
    const cars = await api.cars.getAll();
    const select = document.querySelector('select[name="carId"]');

    select.innerHTML = `
      <option value="">Select Car Category</option>
      ${cars.map(car => `
        <option value="${car.id}">
          ${car.title} - KES ${car.pricePerDay}/day
        </option>
      `).join('')}
    `;

    // Autofill if redirected with ?carId
    const urlParams = new URLSearchParams(window.location.search);
    const carIdFromQuery = urlParams.get('carId');
    if (carIdFromQuery) {
      select.value = carIdFromQuery;
    }
  } catch (err) {
    console.error('Failed to load cars:', err);
    showPopupMessage('Failed to load car options', true);
  }
}

// --- Handle Booking Request ---
document.getElementById('quoteForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    showPopupMessage('Please log in before making a booking.', true);
    setTimeout(() => (window.location.href = 'login.html'), 2000);
    return;
  }

  const form = this;
  const carId = form.carId.value;
  const startDate = form.startDate.value;
  const endDate = form.endDate.value;

  if (new Date(startDate) > new Date(endDate)) {
    showPopupMessage('End date must be after start date', true);
    return;
  }

  try {
    // Fetch car info to calculate total price
    const car = await api.cars.getById(carId);
    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = days * car.pricePerDay;

    const bookingData = {
      carId,
      startDate,
      endDate,
      totalPrice
    };

    await api.bookings.create(bookingData);
    showPopupMessage('Booking request submitted successfully!');
    form.reset();

  } catch (err) {
    console.error('Booking failed:', err);
    showPopupMessage(err.message || 'Failed to submit booking', true);
  }
});

document.addEventListener('DOMContentLoaded', initQuotePage);
