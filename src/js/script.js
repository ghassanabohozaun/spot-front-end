/**
 * Scroll Reveal Logic using Intersection Observer
 */
const revealElements = () => {
  const observerOptions = {
    threshold: 0.15, // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the 'active' class to start the animation
        entry.target.classList.add("active");

        // Once animated, no need to observe anymore
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Grab all elements with 'reveal' class
  const elements = document.querySelectorAll(".reveal, .reveal-right");
  elements.forEach((el) => observer.observe(el));
};

// Initialize after DOM is ready
document.addEventListener("DOMContentLoaded", revealElements);

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

  // Set batchSize to 3 to show only one row per click
  const batchSize = 3;

  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener("click", function () {
    // Targets elements marked as hidden with 'd-none' class
    const hiddenCards = document.querySelectorAll(".tour-card-item.d-none");

    for (let i = 0; i < batchSize; i++) {
      if (hiddenCards[i]) {
        // Remove 'd-none' to display the card
        hiddenCards[i].classList.remove("d-none");

        // Professional Fade-in Animation
        hiddenCards[i].style.opacity = "0";
        hiddenCards[i].style.transform = "translateY(15px)";

        setTimeout(() => {
          hiddenCards[i].style.transition =
            "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)";
          hiddenCards[i].style.opacity = "1";
          hiddenCards[i].style.transform = "translateY(0)";
        }, i * 120); // Staggered animation effect
      }
    }

    // Auto-hide the load more container if no hidden cards are left
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

/**
 * Smart Load More Logic (Handles Trips and Sightseeing pages)
 */
function initLoadMore() {
  const loadMoreBtn = document.getElementById("btn-load-more");
  if (!loadMoreBtn) return;

  let gridSelector = "";
  let batchSize = 3;

  // Search for the Tours grid with the new name
  if (document.getElementById("sightseeing-grid")) {
    gridSelector = "#sightseeing-grid";
    batchSize = 2; // Show two cards per click
  }
  // Search for the Trips grid
  else if (document.getElementById("tours-grid")) {
    gridSelector = "#tours-grid";
    batchSize = 3; // Show 3 cards per click
  } else {
    return; // No grid found
  }

  const newBtn = loadMoreBtn.cloneNode(true);
  loadMoreBtn.parentNode.replaceChild(newBtn, loadMoreBtn);

  newBtn.addEventListener("click", function () {
    const hiddenCards = document.querySelectorAll(
      `${gridSelector} .tour-card-item.d-none`,
    );

    for (let i = 0; i < batchSize; i++) {
      if (hiddenCards[i]) {
        hiddenCards[i].classList.remove("d-none");

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

    if (
      document.querySelectorAll(`${gridSelector} .tour-card-item.d-none`)
        .length === 0
    ) {
      const container = document.getElementById("load-more-container");
      if (container) container.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", initLoadMore);

/**
 * =======================================================================
 * TICKETS PAGE - INDEPENDENT LOAD MORE LOGIC (3 CARDS PER CLICK)
 * =======================================================================
 */
function initTicketsLoadMoreSafe() {
  const btnTickets = document.getElementById("btn-load-more-tickets");
  const ticketsGrid = document.getElementById("tickets-grid");
  const btnContainer = document.getElementById("load-more-tickets");

  // If buttons don't exist (e.g. on another page), stop execution immediately
  if (!btnTickets || !ticketsGrid) return;

  // Using direct onclick to prevent event duplication and ensure 100% functionality
  btnTickets.onclick = function (e) {
    e.preventDefault();

    // Only search for hidden cards inside the Tickets grid
    const hiddenTickets = ticketsGrid.querySelectorAll(
      ".ticket-card-item.d-none",
    );
    const itemsToShow = 3; // Number of cards per click (full row)

    for (let i = 0; i < itemsToShow; i++) {
      if (hiddenTickets[i]) {
        // Remove hidden class
        hiddenTickets[i].classList.remove("d-none");

        // Prepare card for animation (transparent and slightly moved down)
        hiddenTickets[i].style.opacity = "0";
        hiddenTickets[i].style.transform = "translateY(20px)";

        // Execute animation with slight delay between cards for a sequential effect
        setTimeout(() => {
          hiddenTickets[i].style.transition =
            "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)";
          hiddenTickets[i].style.opacity = "1";
          hiddenTickets[i].style.transform = "translateY(0)";
        }, i * 150);
      }
    }

    // Hide button container completely if there are no more hidden cards
    if (ticketsGrid.querySelectorAll(".ticket-card-item.d-none").length === 0) {
      if (btnContainer) {
        btnContainer.style.display = "none";
      }
    }
  };
}

// Ensure script runs whether the page is fully loaded or still loading
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTicketsLoadMoreSafe);
} else {
  initTicketsLoadMoreSafe();
}

/**
 * Contact Form - Flight Addon Toggle Logic
 */
document.addEventListener("DOMContentLoaded", function () {
  const flightToggle = document.getElementById("addFlightToggle");
  const flightDetails = document.getElementById("flightDetailsFields");

  if (flightToggle && flightDetails) {
    flightToggle.addEventListener("change", function () {
      if (this.checked) {
        // Show section
        flightDetails.classList.remove("d-none");
        flightDetails.style.opacity = "0";
        flightDetails.style.transform = "translateY(-15px)";

        // Dropdown and reveal animation
        setTimeout(() => {
          flightDetails.style.transition = "all 0.5s ease";
          flightDetails.style.opacity = "1";
          flightDetails.style.transform = "translateY(0)";
        }, 50);
      } else {
        // Hide section
        flightDetails.style.opacity = "0";
        flightDetails.style.transform = "translateY(-15px)";

        setTimeout(() => {
          flightDetails.classList.add("d-none");
        }, 300); // Wait for animation to finish before actual hiding
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Enable Flatpickr for date fields
  flatpickr(".custom-flatpickr", {
    locale: "ar", // Enable localization (ar/en handled actively if preferred)
    disableMobile: true, // Force mobile devices to use this elegant layout instead of default
    minDate: "today", // Prevent selecting past dates
    dateFormat: "Y-m-d", // Database-compatible date format
    animate: true, // Soft reveal movement
  });
});

/**
 * The Masterpiece Scroll Logic
 */
const initMasterScroll = () => {
  const btn = document.getElementById("masterScrollTop");
  const circle = document.querySelector(".progress-ring__circle");
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  const setProgress = (percent) => {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  };

  window.addEventListener("scroll", () => {
    const scrollPercent =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;

    // Update progress ring
    setProgress(scrollPercent);

    // Show/Hide with bounce
    if (window.scrollY > 400) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
  });

  // Smooth scroll to top
  btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
};

document.addEventListener("DOMContentLoaded", initMasterScroll);

/**
 * Professional Holographic Tilt Engine
 */
const initHolographicTilt = () => {
  const cards = document.querySelectorAll(".tilt-card");

  cards.forEach((card) => {
    // Create glare element dynamically if not present
    if (!card.querySelector(".card-glare")) {
      const glare = document.createElement("div");
      glare.className = "card-glare";
      card.appendChild(glare);
    }

    const glare = card.querySelector(".card-glare");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized position (from -0.5 to 0.5)
      const xNorm = x / rect.width - 0.5;
      const yNorm = y / rect.height - 0.5;

      // Rotation angles (Subtle but effective)
      const rotateX = yNorm * -12; // Max 12 deg
      const rotateY = xNorm * 12; // Max 12 deg

      // Apply Styles
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

      // Update Glare Position (The "Flashlight" effect)
      glare.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
      glare.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);
    });

    card.addEventListener("mouseleave", () => {
      // Smooth reset
      card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
      glare.style.opacity = "0";
    });
  });
};

document.addEventListener("DOMContentLoaded", initHolographicTilt);

/**
 * Magnetic Support Button Logic
 */
const initSupportMagnetic = () => {
  const btn = document.querySelector(".btn-magnetic-support");
  if (!btn) return;

  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;

    // Move the icon box slightly more for parallax
    const icon = btn.querySelector(".icon-wrapper");
    icon.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
    btn.querySelector(".icon-wrapper").style.transform = "translate(0, 0)";
  });
};

document.addEventListener("DOMContentLoaded", initSupportMagnetic);

/**
 * NOQAT NAVBAR LOGIC (Scroll, Language, Magnetic CTA)
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Glassmorphism on Scroll
  const navbar = document.getElementById("mainNavbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    });
  }

  // 2. Language Toggle Switcher
  const langBtn = document.getElementById("langToggleBtn");
  if (langBtn) {
    langBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const langAr = this.querySelector(".lang-ar");
      const langEn = this.querySelector(".lang-en");

      if (langEn.classList.contains("d-none")) {
        // Switch to English
        langAr.classList.add("d-none");
        langAr.classList.remove("d-flex");
        langEn.classList.remove("d-none");
        langEn.classList.add("d-flex");
      } else {
        // Switch to Arabic
        langEn.classList.add("d-none");
        langEn.classList.remove("d-flex");
        langAr.classList.remove("d-none");
        langAr.classList.add("d-flex");
      }
    });
  }

  // 3. Magnetic Effect for the CTA Button
  const magneticBtns = document.querySelectorAll(".btn-magnetic");
  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Pull the button slightly towards the mouse
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      // Snap back
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const langPill = document.getElementById("luxuryLangToggle");

  if (langPill) {
    langPill.addEventListener("click", function () {
      // 1. Toggle animation class on container
      this.classList.toggle("is-english");

      const arItem = this.querySelector(".ar-item");
      const enItem = this.querySelector(".en-item");

      // 2. Update active class based on the presence of is-english
      if (this.classList.contains("is-english")) {
        arItem.classList.remove("active");
        enItem.classList.add("active");
      } else {
        enItem.classList.remove("active");
        arItem.classList.add("active");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".kinetic-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate physical tilt angles
      const rotateY = ((x - rect.width / 2) / rect.width) * 15;
      const rotateX = ((y - rect.height / 2) / rect.height) * -15;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
      // Return to zero-point smoothly
      card.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".luxury-kinetic-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Very light tilt
      card.style.transform = `translateY(-10px) rotateX(${-y * 0.05}deg) rotateY(${x * 0.05}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `translateY(0) rotateX(0) rotateY(0)`;
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const subBtn = document.getElementById("triggerSubscribe");
  const flyWrapper = subBtn ? subBtn.querySelector(".fly-icon-parent") : null;
  const btnSpan = subBtn ? subBtn.querySelector("span") : null;

  if (subBtn && flyWrapper) {
    subBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // 1. The icon "flies" to the left and disappears
      flyWrapper.style.transition =
        "all 0.8s cubic-bezier(0.47, 0, 0.745, 0.715)";
      flyWrapper.style.transform =
        "scaleX(-1) translate(200px, -100px) scale(0)";
      flyWrapper.style.opacity = "0";

      // 2. The text changes smoothly
      btnSpan.style.transition = "0.3s";
      btnSpan.style.opacity = "0";

      setTimeout(() => {
        btnSpan.innerText = "Subscribed!";
        btnSpan.style.opacity = "1";
        subBtn.style.background = "#28a745"; // Green for success
      }, 300);

      // 3. Reset after 3 seconds
      setTimeout(() => {
        flyWrapper.style.transition = "none";
        flyWrapper.style.transform =
          "scaleX(-1) translate(-50px, 50px) scale(0)";

        setTimeout(() => {
          flyWrapper.style.transition =
            "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          flyWrapper.style.transform = "scaleX(-1) translate(0, 0) scale(1)";
          flyWrapper.style.opacity = "1";
          btnSpan.innerText = "Subscribe";
          subBtn.style.background = "";
        }, 50);
      }, 3500);
    });
  }
});

/**
 * REFINED COMPACT TIMELINE ENGINE
 */
const initCompactTimeline = () => {
  const pathFill = document.querySelector(".slim-path-fill");
  const nodes = document.querySelectorAll(".node-box");
  const wrapper = document.querySelector(".compact-timeline-wrapper");

  if (!pathFill || !wrapper) return;

  const onScroll = () => {
    const triggerPoint = window.innerHeight * 0.8;
    const rect = wrapper.getBoundingClientRect();

    let progress = triggerPoint - rect.top;
    let height = (progress / rect.height) * 100;

    height = Math.min(Math.max(height, 0), 100);
    pathFill.style.height = `${height}%`;

    nodes.forEach((node) => {
      const nodePos = node.getBoundingClientRect().top;
      if (nodePos < triggerPoint) {
        node.classList.add("active");
      } else {
        node.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
};

document.addEventListener("DOMContentLoaded", initCompactTimeline);

/**
 * NOQAT SMART SCROLL RESTORATION
 *
 */

// 1. The secret: Force the browser to stop auto-scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {
  // 2. Return scroll to the top immediately before the preloader disappears
  window.scrollTo(0, 0);

  const preloader = document.getElementById("noqat-preloader");
  const body = document.body;

  window.addEventListener("load", () => {
    // Extra confirmation after elements properly loaded
    window.scrollTo(0, 0);

    if (preloader) {
      // Activate cinematic animation
      setTimeout(() => {
        preloader.classList.add("ready");

        setTimeout(() => {
          preloader.style.transition = "all 1s cubic-bezier(1, 0, 0, 1)";
          preloader.style.opacity = "0";
          preloader.style.transform = "translateY(-100%)";

          setTimeout(() => {
            preloader.style.display = "none";
          }, 1000);
        }, 1500);
      }, 2500);
    }
  });
});

/* */
document.querySelectorAll(".stellar-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const ring = item.querySelector(".stellar-ring");
    ring.style.animation = "rotateOrbit 3s linear infinite";
  });

  item.addEventListener("mouseleave", () => {
    const ring = item.querySelector(".stellar-ring");
    ring.style.animation = "none";
  });
});

/* */
document.addEventListener("scroll", () => {
  const progressBar = document.getElementById("scroll-progress-bar");
  const totalHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = (window.pageYOffset / totalHeight) * 100;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;

    // Pulse effect when reaching the bottom (100%)
    if (progress > 98) {
      progressBar.style.boxShadow = "0 0 25px rgba(212, 163, 77, 1)";
    } else {
      progressBar.style.boxShadow = "0 0 15px rgba(212, 163, 77, 0.6)";
    }
  }
});

/* =========================================================
   Currency Converter Logic (SAR BASE - API LIVE EDITION)
   ========================================================= */

let liveExchangeRates = {};

// Backup prices based on approximately 1 SAR equating to:
const fallbackRates = {
  SAR: 1.0,
  AED: 0.98,
  USD: 0.27,
  EUR: 0.25,
  JOD: 0.19,
  ILS: 0.96,
  EGP: 13.1,
};

// 1. Fetch live rates
async function fetchLiveRates() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/SAR");
    const data = await response.json();

    if (data && data.rates) {
      liveExchangeRates = data.rates;
      console.log("Exchange rates updated successfully! (Base: SAR)");
    } else {
      throw new Error("Invalid API Data");
    }
  } catch (error) {
    console.warn("Failed to connect to API, backup rates will be used.", error);
    liveExchangeRates = fallbackRates;
  }
}

// Fetch rates immediately upon opening site
document.addEventListener("DOMContentLoaded", fetchLiveRates);

// 2. Control Panel Context
function toggleCurrencyModal() {
  const modal = document.getElementById("currencyModal");
  if (modal) {
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
  }
}

function openDeluxeCalculator(amount) {
  const inputField = document.getElementById("baseAmount");
  if (inputField) inputField.value = amount;

  if (Object.keys(liveExchangeRates).length === 0) {
    liveExchangeRates = fallbackRates;
  }

  toggleCurrencyModal();
  convertCurrency();
}

// 3. Direct Conversion Process
function convertCurrency() {
  const baseInput = document.getElementById("baseAmount").value;
  const base = parseFloat(baseInput) || 0;

  const select = document.getElementById("targetCurrency");
  const targetCurrencyCode = select.value;

  // Get rate from API or Backup
  const rate =
    liveExchangeRates[targetCurrencyCode] ||
    fallbackRates[targetCurrencyCode] ||
    1;

  const total = base * rate;

  const resultDisplay = document.getElementById("convertedResult");
  if (resultDisplay) {
    resultDisplay.innerText = total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  document.getElementById("currencyCode").innerText = targetCurrencyCode;
}

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  const modal = document.getElementById("currencyModal");
  if (event.target === modal) {
    toggleCurrencyModal();
  }
});
