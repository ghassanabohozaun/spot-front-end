/**
 * Project: Spots Travel & Tourism
 * Description: Main functionality for Slider, Navigation, Filters, and Gallery
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize Bootstrap Hero Carousel
  const heroCarouselEl = document.getElementById("heroCarousel");
  if (heroCarouselEl) {
    new bootstrap.Carousel(heroCarouselEl, {
      interval: 4000,
      ride: "carousel",
      pause: "hover",
    });
  }

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById("mainNavbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("shadow-sm");
      } else {
        navbar.classList.remove("shadow-sm");
      }
    });
  }

  // 3. Initialize International Destinations Slider
  if (document.querySelector(".internationalSwiper")) {
    const internationalSwiper = new Swiper(".internationalSwiper", {
      slidesPerView: 5,
      spaceBetween: 15,
      slidesPerGroup: 1,
      loop: true,
      autoHeight: false, // Ensures all slides have the same height
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
  }

  // 4. Initialize Trip Gallery Swiper
  if (document.querySelector(".tripThumbSwiper")) {
    const tripSwiper = new Swiper(".tripThumbSwiper", {
      slidesPerView: "auto",
      spaceBetween: 10,
      freeMode: true,
      grabCursor: true,
      // Note: Swiper 11 auto-detects RTL from <html dir="rtl">
    });
  }

  // 5. Initialize Modular Functions
  initPriceSlider();
  initLoadMore();
  initCategoryTabs();
});

/* ==========================================================================
   1. DUAL RANGE SLIDER LOGIC
   Works for any page with .range-slider container
========================================================================== */
function initPriceSlider() {
  const sliderContainer = document.querySelector(".range-slider");
  if (!sliderContainer) return;

  const rangeInputs = sliderContainer.querySelectorAll("input[type='range']");
  const minLabel = document.getElementById("min-price-val");
  const maxLabel = document.getElementById("max-price-val");
  const progress = sliderContainer.querySelector(".range-selected");

  if (rangeInputs.length < 2) return;

  function updateSlider() {
    let v1 = parseInt(rangeInputs[0].value);
    let v2 = parseInt(rangeInputs[1].value);

    let minVal = Math.min(v1, v2);
    let maxVal = Math.max(v1, v2);

    if (minLabel) minLabel.textContent = minVal;
    if (maxLabel) maxLabel.textContent = maxVal;

    // RTL Progress Calculation
    const maxRange = parseInt(rangeInputs[0].max);
    const minPercent = (minVal / maxRange) * 100;
    const maxPercent = (maxVal / maxRange) * 100;

    if (progress) {
      progress.style.right = minPercent + "%";
      progress.style.left = 100 - maxPercent + "%";
    }
  }

  rangeInputs.forEach((input) => {
    input.addEventListener("input", updateSlider);
  });

  updateSlider(); // Run once on initialization
}

/* ==========================================================================
   2. LOAD MORE CARDS LOGIC
   Handles revealing hidden batches of cards with animation
========================================================================== */
function initLoadMore() {
  const loadMoreBtn = document.getElementById("btn-load-more");
  const batchSize = 3;

  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener("click", function () {
    // Targets elements marked as hidden
    const hiddenCards = document.querySelectorAll(".tour-card-item.d-none");

    for (let i = 0; i < batchSize; i++) {
      if (hiddenCards[i]) {
        hiddenCards[i].classList.remove("d-none");

        // Professional Fade-in Animation (Syntax Fixed)
        hiddenCards[i].style.opacity = "0";
        hiddenCards[i].style.transform = "translateY(15px)";

        setTimeout(() => {
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

      // Note: Add your Ajax call here later
      console.log("Selected Category: " + this.textContent.trim());
    });
  });
}

/* ==========================================================================
   4. TRIP DETAILS GALLERY SWITCHER
   Updates main image on thumbnail click
========================================================================== */
function updateTripImage(element, imageUrl) {
  const mainDisplay = document.getElementById("mainTripImage");

  if (mainDisplay) {
    mainDisplay.style.opacity = "0.4";

    setTimeout(() => {
      mainDisplay.src = imageUrl;
      mainDisplay.style.opacity = "1";
    }, 150);
  }

  // Manage active state classes
  document
    .querySelectorAll(".tripThumbSwiper .swiper-slide")
    .forEach((slide) => {
      slide.classList.remove("active");
    });

  element.classList.add("active");
}
