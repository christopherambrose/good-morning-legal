const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll("[data-reveal]");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.documentElement.classList.add("reveal-ready");
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 70, 210)}ms`;
    observer.observe(item);
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
