import { api } from './js/api.js';

// --- Navbar ---
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

function scrollToServices() {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
}

// --- Testimonials ---
async function loadTestimonials() {
  try {
    const reviews = await api.call('/testimonials');
    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = reviews.map(review => `
      <div class="review">
        <img src="${review.userImage || './assets/team-photos/profile-pic.png'}" alt="${review.userName}">
        <h5>${review.userName}</h5>
        <div class="stars">${'⭐'.repeat(review.rating)}</div>
        <p>${review.comment}</p>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load testimonials:', err);
  }
}

// --- Slideshow ---
let index = 0;
function moveSlide(direction) {
  const slides = document.querySelector(".carousel");
  const totalSlides = document.querySelectorAll(".review").length;
  index += direction;
  if (index >= totalSlides) index = 0;
  if (index < 0) index = totalSlides - 1;
  slides.style.transform = `translateX(${-index * 100}%)`;
}
setInterval(() => moveSlide(1), 5000);

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  loadTestimonials();
});
