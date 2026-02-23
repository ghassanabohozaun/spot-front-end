/**
* Project: Spots Travel & Tourism
* Description: Main functionality for Slider and Navigation
*/

document.addEventListener("DOMContentLoaded", function () {
// Initialize Bootstrap Carousel with 4s interval
const heroCarousel = new bootstrap.Carousel(
document.getElementById("heroCarousel"),
{
interval: 4000,
ride: "carousel",
pause: "hover",
},
);

// Navbar Scroll Effect (Optional: Shrinks padding on scroll)
const navbar = document.getElementById("mainNavbar");
window.addEventListener("scroll", () => {
if (window.scrollY > 50) {
navbar.classList.add("shadow-sm");
} else {
navbar.classList.remove("shadow-sm");
}
});
});

/* Initialize International Destinations Slider with 5 items and equal height */
var internationalSwiper = new Swiper(".internationalSwiper", {
slidesPerView: 5,
spaceBetween: 15,
slidesPerGroup: 1,
loop: true,
/* Ensures all slides have the same height */
autoHeight: false,
navigation: {
nextEl: ".swiper-button-next",
prevEl: ".swiper-button-prev",
},
breakpoints: {
320: { slidesPerView: 1 },
768: { slidesPerView: 2 },
1024: { slidesPerView: 4 },
1400: { slidesPerView: 5 },
},
});

/**
* TOURS & LISTING PAGE MODULES
* Organized for Laravel compatibility and reusability
*/

document.addEventListener("DOMContentLoaded", function () {
// 1. Initialize Dual Range Slider
initPriceSlider();

// 2. Initialize Load More functionality
initLoadMore();

// 3. Initialize Category Tabs
initCategoryTabs();
});

/* ==========================================================================
1. DUAL RANGE SLIDER LOGIC
Works for any page with .range-slider container
========================================================================== */
function initPriceSlider() {
const sliderContainer = document.querySelector(".range-slider");

// Check if element exists to prevent errors on other pages
if (!sliderContainer) return;

const rangeInputs = sliderContainer.querySelectorAll("input[type='range']"),
minLabel = document.getElementById("min-price-val"),
maxLabel = document.getElementById("max-price-val"),
progress = sliderContainer.querySelector(".range-selected");

function updateSlider() {
let v1 = parseInt(rangeInputs[0].value);
let v2 = parseInt(rangeInputs[1].value);

// Identify Min and Max
let minVal = Math.min(v1, v2);
let maxVal = Math.max(v1, v2);

// Update UI Text
if (minLabel) minLabel.textContent = minVal;
if (maxLabel) maxLabel.textContent = maxVal;

// RTL Progress Calculation
const maxRange = rangeInputs[0].max;
const minPercent = (minVal / maxRange) * 100;
const maxPercent = (maxVal / maxRange) * 100;

// Apply styles to the golden track
if (progress) {
progress.style.right = minPercent + "%";
progress.style.left = 100 - maxPercent + "%";
}
}

rangeInputs.forEach((input) => {
input.addEventListener("input", updateSlider);
});

// Run once on initialization
updateSlider();
}

/* ==========================================================================
2. LOAD MORE CARDS LOGIC
Handles revealing hidden batches of cards
========================================================================== */
function initLoadMore() {
const loadMoreBtn = document.getElementById("btn-load-more");
const batchSize = 3;

if (!loadMoreBtn) return;

loadMoreBtn.addEventListener("click", function () {
// Targets elements marked as hidden in Laravel/Blade
const hiddenCards = document.querySelectorAll(".tour-card-item.d-none");

for (let i = 0; i < batchSize; i++) { if (hiddenCards[i]) { hiddenCards[i].classList.remove("d-none"); // Professional
    Fade-in Animation hiddenCards[i].style.opacity="0" ; hiddenCards[i].style.transform="translateY(15px)" ;
    setTimeout(()=> {
    hiddenCards[i].style.transition =
    "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)";
    hiddenCards[i].style.opacity = "1";
    hiddenCards[i].style.transform = "translateY(0)";
    }, i * 120);
    }
    }

    // Auto-hide button if no more items are left
    if (document.querySelectorAll(".tour-card-item.d-none").length === 0) {
    const container = document.getElementById("load-more-container");
    if (container) container.style.display = "none";
    }
    });
    }

    /* ==========================================================================
    3. CATEGORY TABS INTERACTION
    Handles active state switching for filter tabs
    ========================================================================== */
    function initCategoryTabs() {
    const tabs = document.querySelectorAll(".category-tab");

    if (tabs.length === 0) return;

    tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
    // Remove active class from siblings
    tabs.forEach((t) => t.classList.remove("active"));

    // Add active class to current tab
    this.classList.add("active");

    // Note: Add your filtering logic or Ajax call here for Laravel
    console.log("Selected Category: " + this.textContent.trim());
    });
    });
    }


/**
 * TRIP DETAILS PAGE JAVASCRIPT
 * Features: Draggable Thumbnail Gallery (Swiper) and Main Image Switcher
 */

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Initialize Trip Gallery Swiper
    // Make sure Swiper CSS and JS files are included in your HTML
    if (document.querySelector(".tripThumbSwiper")) {
        const tripSwiper = new Swiper(".tripThumbSwiper", {
            slidesPerView: 'auto', // Automatically calculate how many items fit based on CSS width
            spaceBetween: 10,      // Gap between thumbnails
            freeMode: true,        // Enable free scrolling and dragging
            grabCursor: true,      // Show grab hand icon on hover/drag
            rtl: true              // Enable Right-to-Left layout support
        });
    }
});

/**
 * Update the Main Display Image on Thumbnail Click
 * @param {HTMLElement} element - The clicked thumbnail element (this)
 * @param {string} imageUrl - The URL of the high-res image to display
 */
function updateTripImage(element, imageUrl) {
    const mainDisplay = document.getElementById('mainTripImage');
    
    if (mainDisplay) {
        // Apply a smooth fade out effect before changing the image
        mainDisplay.style.opacity = '0.4';
        
        setTimeout(() => {
            // Change the image source and fade back in
            mainDisplay.src = imageUrl;
            mainDisplay.style.opacity = '1';
        }, 150);
    }
    
    // Remove the 'active' class from all thumbnails
    document.querySelectorAll('.tripThumbSwiper .swiper-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Add the 'active' class to the currently clicked thumbnail (adds gold border)
    element.classList.add('active');
}