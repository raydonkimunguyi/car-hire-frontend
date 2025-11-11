# car-hiring-website
Our group five car hiring project

# File/tree structure:

┌──(lenovo㉿NAITFURRY)-[~/car-hiring-project/car-hiring-website-project01]
└─$ tree
.
├── about-page.css      
├── about-page.html     
├── about-page-script.js
├── add_car.css
├── add_car.html
├── add_car.php
├── admin.css
├── admin_login.php
├── admin-panel.html
├── admin-panel.php
├── assets
│   ├── customer-images
│   │   └── customer-image.jpg
│   ├── hero-section-images
│   │   ├── header-drone-image_cleanup.png
│   │   ├── header-drone-image.erased.png
│   │   └── header-drone-image.png
│   ├── icons
│   │   ├── car-rentel.png
│   │   ├── chauffer-driven-car-hire.png
│   │   ├── icons8-affordable-100.png
│   │   ├── icons8-convenient-100.png
│   │   ├── icons8-customer-service-100.png
│   │   ├── icons8-grow-100.png
│   │   ├── icons8-reliable-100.png
│   │   ├── icons8-secured-100.png
│   │   ├── long-term-car-hire.png
│   │   └── vip-car-hire.png
│   ├── team-photos
│   │   └── profile-pic.png
│   └── vehicle-images
│       ├── mercedes-benz
│       │   ├── mercedes-benz-c-class-back.png
│       │   ├── mercedes-benz-c-class-rear-left.png
│       │   └── mercedes-benz-c-class-rear-right.png
│       ├── nissan-xtrail
│       │   ├── nissan-xtrail-front.png
│       │   └── nissan-xtrail-side.png
│       └── toyota-vitz
│           ├── front.jpg
│           ├── interior.jpg
│           ├── rear-left.jpg
│           ├── rear-right.jpg
│           └── side.jpg
├── car-details.html
├── car-details.php
├── cars.html
├── contact.html
├── includes
│   ├── footer.php
│   └── nav.php
├── index.html
├── LICENSE
├── login.html
├── README.md
├── request-quote-page.css
├── request-quote-page.html
├── request-quote-page.js
├── script.js
├── services.php
├── services-styles.css
├── styles.css
├── testpage.html
└── unusedcode.html

11 directories, 54 files

## Document components:

Walkthrough of the app in the folder car-hiring-website-project01:

Project root (files)
- .gitattributes — repo attributes (line endings/merge settings).
- about-page-script.js — JS specific to the About page (animations, event handlers).
- about-page.css — CSS for About page layout/styles.
- about-page.html — About page markup (likely includes header/footer via PHP include or static markup).
- add_car.css — Styles for Add Car UI.
- add_car.html — Frontend form for adding a car (static HTML; likely for demo).
- add_car.php — Server-side handler for adding car entries (forms POST target, file uploads, DB interactions). Key editable area for server-side logic and validation.
- admin_login.php — Admin authentication endpoint and form processing.
- admin-panel.html — Admin dashboard static view (may be used for design).
- admin-panel.php — Admin dashboard PHP page (authentication checks, dynamic listing of cars/users).
- admin.css — Styling for admin UI.
- car-details.html — Car detail page (static template).
- car-details.php — Dynamic car detail page (loads car data, likely by id param).
- cars.html — List of available cars (static demo).
- contact.html — Contact page markup and contact form.
- index.html — Homepage (hero, featured cars). Primary place to change landing content and layout.
- LICENSE — Project license text.
- login.html — Login form (client side).
- README.md — Project README (setup notes, if any).
- request-quote-page.css — Styles for request-quote page.
- request-quote-page.html — Request a quote form layout.
- request-quote-page.js — JS for request-quote form (validation, submit).
- script.js — Global frontend JS (menu toggles, common handlers).
- services-styles.css — Styles for the services page.
- services.php — Services page (dynamic content; could pull service items from DB).
- styles.css — Main global CSS. Primary place to change site-wide styles (fonts, colors, grid).
- testpage.html — Sandbox/test page.
- unusedcode.html — Unused/demo markup (safe to remove or reuse).
- index.html — (already listed; ensure you open this for homepage edits)

.vscode
- .vscode/settings.json — Editor-specific settings (formatting, workspace rules).

assets (static assets)
- assets — images/icons used by pages.
  - customer-images/ — customer avatars/testimonials.
  - hero-section-images/ — homepage hero backgrounds.
  - icons/ — UI icons (SVG/PNG).
  - team-photos/ — team images.
  - vehicle-images/ — vehicle images
    - vehicle-images/mercedes-benz/
    - vehicle-images/nissan-xtrail/
    - vehicle-images/toyota-vitz/

includes (shared markup)
- nav.php — Navigation/header include (links, logo). Primary place to update header links, nav structure, and site-wide menus.
- footer.php — Footer include (copyright, social links). Edit for global footer changes.

## App summary:
- A small car-hiring / rental website with static pages and PHP endpoints for admin and form handling. Frontend is HTML/CSS/JS with PHP used for dynamic pages and server-side form processing.
- Key flows: browse cars (cars.html / car-details.php), request a quote (request-quote-page.*), add car (admin/add flow via add_car.php), admin login and admin panel.

## Suggested Changes:
Primary focus areas:
- Change site layout, colors, typography:
  - styles.css — global style changes.
  - Page-specific CSS: about-page.css, admin.css, request-quote-page.css
- Change page content/layout:
  - HTML/PHP templates: index.html, about-page.html, cars.html, car-details.php
  - Shared header/footer: includes/nav.php, includes/footer.php
- Change frontend behavior:
  - Global scripts: script.js
  - Page scripts: about-page-script.js, request-quote-page.js
- Change server-side logic / forms / DB interactions:
  - Form handlers and dynamic pages: add_car.php, admin_login.php, admin-panel.php, car-details.php, services.php
  - Inspect those PHP files for DB connection code, sanitize/validate input, file upload handling and authentication checks.
- Change images/assets:
  - assets/ — replace images or optimize sizes. Update image paths in HTML/CSS.

Checklist before changes
- Back up or branch your changes (git branch).
- Run a local PHP server to test PHP pages: php -S localhost:8000 -t car-hiring-website-project01 (or deploy to Apache/Nginx + PHP).
- Check for DB config or connection files inside PHP files; if DB is used, ensure credentials are correct and migrations/schema exist.
- Ensure form endpoints use proper CSRF/validation if you’ll modify forms (security).
- Update includes (includes/nav.php, includes/footer.php) for site-wide edits rather than editing every page.
- Search for duplicate styles across page-specific CSS files — consider centralizing in styles.css.

Quick pointers (where to look first)
- Homepage content & hero: index.html and assets/hero-section-images/
- Global JS behavior (menu, scroll): script.js
- Add / edit car flow and server-side saving: add_car.php
- Authentication and admin view: admin_login.php, admin-panel.php
- Shared layout: `includes/nav.php` and `includes/footer.php`

# Extras:
- show an annotated diff to change the header nav in `includes/nav.php`,
- centralize CSS into `styles.css`,
- or open and review a specific PHP file (for example `add_car.php`) and point out security/data issues.



Replace script.js with a single, robust API client + common UI handlers (prevents Content-Type issues with FormData, loads cars, login handler).:
// ...existing code...

// unified DOM helpers + hamburger
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            hamburger.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
        });
    }

    // load cars on pages with .car-list
    if (document.querySelector('.car-list')) loadCars();

    // wire login form if present
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    // wire search input (if present)
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                searchCar();
            }
        });
    }
});

// API client
const API_URL = 'http://localhost:3000/api';

async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const method = options.method || 'GET';
  const headers = { ...(options.headers || {}) };

  // If body is not FormData, assume JSON and set header
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: options.body
  });

  // handle empty responses (204)
  if (res.status === 204) return null;

  // try parse json, throw on error status
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data && data.message) || res.statusText || 'API error';
    throw new Error(message);
  }
  return data;
}

// loadCars -> populates .car-list
async function loadCars() {
  try {
    const cars = await fetchAPI('/cars');
    updateCarList(cars || []);
  } catch (err) {
    console.error('Failed to load cars:', err);
  }
}

function updateCarList(cars) {
  const carList = document.querySelector('.car-list');
  if (!carList) return;
  carList.innerHTML = cars.map(car => `
    <div class="car-card">
      <img src="${car.imagePath ? car.imagePath : './assets/vehicle-images/toyota-vitz/front.jpg'}" alt="${escapeHtml(car.title || '')}">
      <h3>${escapeHtml(car.title || '')}</h3>
      <p>KES ${escapeHtml(String(car.pricePerDay || ''))}/day</p>
      <a href="car-details.html?id=${encodeURIComponent(car.id)}"><button>Learn More</button></a>
    </div>
  `).join('');
}

// search uses API q param
async function searchCar() {
  const qElem = document.getElementById("search");
  const query = qElem ? qElem.value.trim() : '';
  try {
    const cars = await fetchAPI(`/cars?q=${encodeURIComponent(query)}`);
    updateCarList(cars || []);
    const carsSection = document.getElementById('cars');
    if (carsSection) carsSection.scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    console.error('Search failed:', err);
  }
}

// simple login handler
async function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email?.value;
  const password = form.password?.value;
  try {
    const res = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user || {}));
    window.location.href = '/index.html';
  } catch (err) {
    console.error('Login failed:', err);
    alert(err.message || 'Login failed');
  }
}

// helper: escape HTML when inserting raw text
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ...existing code...



Update car-details.html — fetch single car by id and populate the page. Add this script at end of file (before </body>):::
<!-- ...existing code... -->
<script>
(async function() {
  // read id from query string
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || params.get('car');
  if (!id) return;

  try {
    const res = await fetch(`http://localhost:3000/api/cars/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Failed to fetch car');
    const car = await res.json();
    document.getElementById('car-title').textContent = car.title || '';
    document.getElementById('car-price').textContent = car.pricePerDay ? `KES ${car.pricePerDay}/day` : '';
    document.getElementById('car-description').textContent = car.description || '';

    // fill images (use available image paths)
    const imgs = [
      document.getElementById('car-img-1'),
      document.getElementById('car-img-2'),
      document.getElementById('car-img-3'),
      document.getElementById('car-img-4')
    ];
    if (car.images && car.images.length) {
      imgs.forEach((el, i) => { if (el) el.src = car.images[i] || car.images[0]; });
    } else if (car.imagePath) {
      imgs.forEach(el => { if (el) el.src = car.imagePath; });
    }
  } catch (err) {
    console.error(err);
  }
})();
</script>
<!-- ...existing code... -->




