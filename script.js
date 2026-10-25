/* SHARIR website — 2026 interactions (vanilla JS, ~1.5 KB, no frameworks) */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- scroll progress bar ---- */
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);
  window.addEventListener("scroll", function () {
    var h = document.documentElement;
    var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + "%";
  }, { passive: true });

  /* ---- scroll reveal (auto-applied to common blocks) ---- */
  var targets = document.querySelectorAll(".card, .step, .feature-split, .cta-band, .quote, .section-head, .compare-wrap, .stat, .hero-phones");
  if (!reduced && "IntersectionObserver" in window) {
    targets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms"; // gentle stagger
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- animated counters (stat b[data-count]) ---- */
  function animateCount(el) {
    var end = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1200, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduced && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---- spotlight glow on cards (pointer devices only) ---- */
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", function (e) {
      var card = e.target.closest ? e.target.closest(".card") : null;
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* ---- 3D tilt on phone mockups (pointer devices only) ---- */
  if (window.matchMedia("(pointer: fine)").matches && !reduced) {
    document.querySelectorAll(".tilt-wrap").forEach(function (wrap) {
      var phone = wrap.querySelector(".phone");
      if (!phone) return;
      wrap.addEventListener("mousemove", function (e) {
        var r = wrap.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        phone.style.transform = "rotateY(" + (x * 10) + "deg) rotateX(" + (-y * 8) + "deg)";
      }, { passive: true });
      wrap.addEventListener("mouseleave", function () { phone.style.transform = ""; });
    });
  }
})();
