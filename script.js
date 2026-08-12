/* =========================================================
   SCRIPT.JS — General animations & interactions
   Para Centre Deroua
   - Navbar (sticky shadow, hamburger, active link)
   - Scroll reveal (Intersection Observer)
   - Animated counters
   - Home: featured products grid
   - Shop: category filter, search, sort
   - Back-to-top button
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initReveal();
  initCounters();
  initHomeProducts();
  initShop();
  initToTop();
  initFooterYear();
  initNewsletter();
  initContactForm();
});

/* =========================================================
   NAVBAR
   ========================================================= */
function initNavbar() {
  const header = document.getElementById("siteHeader");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  // keep sticky elements aligned under the (variable-height) header
  const syncHeaderHeight = () => {
    if (header) document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  };
  window.addEventListener("resize", syncHeaderHeight);
  syncHeaderHeight();

  // shadow on scroll
  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // highlight active page link
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  // mobile menu
  const overlay = document.querySelector(".nav-overlay");
  const toggleMenu = (force) => {
    const open = force !== undefined ? force : !navLinks.classList.contains("open");
    navLinks.classList.toggle("open", open);
    hamburger.classList.toggle("open", open);
    if (overlay) overlay.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  if (hamburger) hamburger.addEventListener("click", () => toggleMenu());
  if (overlay) overlay.addEventListener("click", () => toggleMenu(false));
  if (navLinks) navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => toggleMenu(false))
  );
}

/* =========================================================
   SCROLL REVEAL (Intersection Observer)
   Usage: add class="reveal" (+ optional reveal--left/right/zoom)
   and style="--i:1" for stagger.
   ========================================================= */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("visible"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  els.forEach(el => io.observe(el));
}

/* =========================================================
   ANIMATED COUNTERS
   Usage: <span data-count="45000" data-suffix="+">0</span>
   ========================================================= */
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  if (!("IntersectionObserver" in window)) {
    counters.forEach(el => {
      const target = parseFloat(el.getAttribute("data-count"));
      const suffix = el.getAttribute("data-suffix") || "";
      el.textContent = target.toLocaleString("fr-MA") + suffix;
    });
    return;
  }

  const format = (n) => n >= 1000 ? n.toLocaleString("fr-MA") : n;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.getAttribute("data-count"));
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1800;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic for a satisfying finish
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(Math.round(target * eased)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(el => io.observe(el));
}

/* =========================================================
   HOME — Featured "best price" products
   ========================================================= */
function initHomeProducts() {
  const grid = document.getElementById("featuredGrid");
  if (!grid || typeof renderProducts !== "function") return;

  const featured = (typeof PRODUCTS !== "undefined" ? PRODUCTS : [])
    .filter(p => p.badge === "best" || p.badge === "promo")
    .slice(0, 6);

  renderProducts(featured, grid);
}

/* =========================================================
   SHOP — filter / search / sort
   ========================================================= */
function initShop() {
  const grid = document.getElementById("productGrid");
  if (!grid || typeof PRODUCTS === "undefined") return;

  let activeCat = "all";
  let query = "";
  let sort = "featured";

  const pills = document.querySelectorAll(".pill[data-cat]");
  const searchInput = document.getElementById("shopSearch");
  const sortSelect = document.getElementById("shopSort");
  const countEl = document.getElementById("shopCount");
  const emptyEl = document.getElementById("shopEmpty");

  // pre-filter from URL (?cat=skincare)
  const urlCat = new URLSearchParams(window.location.search).get("cat");
  if (urlCat && CATEGORIES[urlCat]) {
    activeCat = urlCat;
    pills.forEach(p => p.classList.toggle("active", p.getAttribute("data-cat") === urlCat));
  }

  function apply() {
    let list = PRODUCTS.slice();

    // category filter
    if (activeCat !== "all") list = list.filter(p => p.cat === activeCat);

    // text search (name + desc + category label)
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.desc || "").toLowerCase().includes(q) ||
        catLabel(p.cat).toLowerCase().includes(q)
      );
    }

    // sorting
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "discount": list.sort((a, b) => (b.oldPrice ? b.oldPrice - b.price : 0) - (a.oldPrice ? a.oldPrice - a.price : 0)); break;
      case "rating": list.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
    }

    if (countEl) countEl.innerHTML = `<b>${list.length}</b> produit${list.length > 1 ? "s" : ""}`;
    if (emptyEl) emptyEl.classList.toggle("show", list.length === 0);

    renderProducts(list, grid);
  }

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCat = pill.getAttribute("data-cat");
      apply();
    });
  });

  if (searchInput) searchInput.addEventListener("input", e => {
    query = e.target.value.trim();
    apply();
  });

  if (sortSelect) sortSelect.addEventListener("change", e => {
    sort = e.target.value;
    apply();
  });

  apply();
}

/* =========================================================
   BACK TO TOP
   ========================================================= */
function initToTop() {
  const btn = document.getElementById("toTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* =========================================================
   MISC
   ========================================================= */
function initFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const input = form.querySelector("input");
    const btn = form.querySelector("button");
    if (!input.value.trim()) { input.focus(); return; }
    input.value = "";
    btn.textContent = "Merci !  \u2713";
    setTimeout(() => (btn.textContent = "S'abonner"), 2500);
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const success = document.getElementById("formSuccess");
    if (success) success.classList.add("show");
    form.reset();
    setTimeout(() => success && success.classList.remove("show"), 6000);
  });
}
