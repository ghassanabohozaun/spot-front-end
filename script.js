window.addEventListener("load", function () {
  const preloader = document.getElementById("noqat-preloader");

  setTimeout(() => {
    if (preloader) {
      preloader.classList.add("preloader-hidden");
      document.body.style.overflow = "auto";
    }
  }, 1800); // 1.8s duration to show off the luxury movement
});

document.body.style.overflow = "hidden";

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

  // البحث عن شبكة الجولات السياحية بالاسم الجديد
  if (document.getElementById("sightseeing-grid")) {
    gridSelector = "#sightseeing-grid";
    batchSize = 2; // عرض كرتين في الضغطة
  }
  // البحث عن شبكة الرحلات
  else if (document.getElementById("tours-grid")) {
    gridSelector = "#tours-grid";
    batchSize = 3; // عرض 3 كروت في الضغطة
  } else {
    return; // لم يتم العثور على أي شبكة
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

  // إذا لم تكن الأزرار موجودة (مثلاً نحن في صفحة أخرى)، أوقف التنفيذ فوراً
  if (!btnTickets || !ticketsGrid) return;

  // استخدام onclick المباشر لتجنب تكرار الأحداث وضمان عمله 100%
  btnTickets.onclick = function (e) {
    e.preventDefault();

    // نبحث فقط عن الكروت المخفية داخل شبكة التذاكر
    const hiddenTickets = ticketsGrid.querySelectorAll(
      ".ticket-card-item.d-none",
    );
    const itemsToShow = 3; // عدد الكروت في كل ضغطة (صف كامل)

    for (let i = 0; i < itemsToShow; i++) {
      if (hiddenTickets[i]) {
        // إزالة كلاس الإخفاء
        hiddenTickets[i].classList.remove("d-none");

        // تجهيز الكرت للحركة (يكون شفاف ونازل لتحت شوية)
        hiddenTickets[i].style.opacity = "0";
        hiddenTickets[i].style.transform = "translateY(20px)";

        // تنفيذ الحركة بتأخير زمني بسيط بين كل كرت ليعطي شكل "متتالي"
        setTimeout(() => {
          hiddenTickets[i].style.transition =
            "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)";
          hiddenTickets[i].style.opacity = "1";
          hiddenTickets[i].style.transform = "translateY(0)";
        }, i * 150);
      }
    }

    // إخفاء حاوية الزر تماماً إذا لم يعد هناك كروت مخفية
    if (ticketsGrid.querySelectorAll(".ticket-card-item.d-none").length === 0) {
      if (btnContainer) {
        btnContainer.style.display = "none";
      }
    }
  };
}

// ضمان تشغيل السكريبت سواء تم تحميل الصفحة بالكامل أم ما زالت تحمل
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
        // إظهار القسم
        flightDetails.classList.remove("d-none");
        flightDetails.style.opacity = "0";
        flightDetails.style.transform = "translateY(-15px)";

        // أنيميشن النزول والظهور
        setTimeout(() => {
          flightDetails.style.transition = "all 0.5s ease";
          flightDetails.style.opacity = "1";
          flightDetails.style.transform = "translateY(0)";
        }, 50);
      } else {
        // إخفاء القسم
        flightDetails.style.opacity = "0";
        flightDetails.style.transform = "translateY(-15px)";

        setTimeout(() => {
          flightDetails.classList.add("d-none");
        }, 300); // انتظار انتهاء الأنيميشن قبل الإخفاء الفعلي
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // تفعيل Flatpickr لحقول التاريخ
  flatpickr(".custom-flatpickr", {
    locale: "ar", // تفعيل اللغة العربية
    disableMobile: true, // إجبار الجوالات على استخدام هذا التصميم الأنيق بدلاً من تصميم الجوال الافتراضي
    minDate: "today", // منع اختيار تواريخ سابقة لليوم
    dateFormat: "Y-m-d", // صيغة التاريخ المتوافقة مع قواعد البيانات
    animate: true, // حركة ظهور ناعمة
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
 * CINEMATIC PHYSICS ENGINE
 */
const initCinemaSquare = () => {
  const items = document.querySelectorAll(".cinema-box");

  items.forEach((item) => {
    const color = item.getAttribute("data-color");
    const aurora = item.querySelector(".aurora-bg");
    const link = item.querySelector(".icon-link");
    const trace = item.querySelector(".border-trace");

    item.style.setProperty("--brand-glow", color);
    item.style.setProperty("--brand-glow-alpha", color + "44");

    let tX = 0,
      tY = 0;
    let cX = 0,
      cY = 0;

    const lerp = (s, e, f) => s + (e - s) * f;

    const update = () => {
      cX = lerp(cX, tX, 0.08);
      cY = lerp(cY, tY, 0.08);

      // تحريك موضع الشفق
      aurora.style.setProperty("--m-x", `${50 + cX * 2}%`);
      aurora.style.setProperty("--m-y", `${50 + cY * 2}%`);

      // تحريك العناصر بفيزياء مختلفة للعمق
      link.style.transform = `translate(${cX}px, ${cY}px) translateZ(40px)`;
      trace.style.transform = `translate(${cX * 0.4}px, ${cY * 0.4}px) rotate(${cX * 0.5}deg)`;

      requestAnimationFrame(update);
    };

    item.addEventListener("mousemove", (e) => {
      const r = item.getBoundingClientRect();
      tX = (e.clientX - r.left - r.width / 2) * 0.5;
      tY = (e.clientY - r.top - r.height / 2) * 0.5;
    });

    item.addEventListener("mouseleave", () => {
      tX = 0;
      tY = 0;
    });

    update();
  });
};

document.addEventListener("DOMContentLoaded", initCinemaSquare);

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
      // 1. تبديل كلاس الحركة على الحاوية
      this.classList.toggle("is-english");

      const arItem = this.querySelector(".ar-item");
      const enItem = this.querySelector(".en-item");

      // 2. تحديث كلاس active بناءً على وجود is-english
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

      // حساب زوايا الميل الفيزيائي
      const rotateY = ((x - rect.width / 2) / rect.width) * 15;
      const rotateX = ((y - rect.height / 2) / rect.height) * -15;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
      // العودة لنقطة الصفر بنعومة
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

      // ميلان خفيف جداً
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

      // 1. الأيقونة "تطير" لليسار وتختفي
      flyWrapper.style.transition =
        "all 0.8s cubic-bezier(0.47, 0, 0.745, 0.715)";
      flyWrapper.style.transform =
        "scaleX(-1) translate(200px, -100px) scale(0)";
      flyWrapper.style.opacity = "0";

      // 2. النص يتغير بنعومة
      btnSpan.style.transition = "0.3s";
      btnSpan.style.opacity = "0";

      setTimeout(() => {
        btnSpan.innerText = "تم الاشتراك!";
        btnSpan.style.opacity = "1";
        subBtn.style.background = "#28a745"; // أخضر للنجاح
      }, 300);

      // 3. إعادة الضبط بعد 3 ثواني
      setTimeout(() => {
        flyWrapper.style.transition = "none";
        flyWrapper.style.transform =
          "scaleX(-1) translate(-50px, 50px) scale(0)";

        setTimeout(() => {
          flyWrapper.style.transition =
            "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          flyWrapper.style.transform = "scaleX(-1) translate(0, 0) scale(1)";
          flyWrapper.style.opacity = "1";
          btnSpan.innerText = "اشتراك";
          subBtn.style.background = "";
        }, 50);
      }, 3500);
    });
  }
});
