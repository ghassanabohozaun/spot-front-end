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
