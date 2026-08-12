/* =========================================================
   CART.JS — Dedicated cart logic
   Para Centre Deroua
   - Persists cart in localStorage across pages
   - Renders the drawer, quantities, totals
   - Builds & opens a WhatsApp order link
   ========================================================= */

const Cart = (() => {
  const STORAGE_KEY = "paraCentreCart";
  const PHONE = "212679784656"; // +212 6 79 78 46 56
  let items = load();
  let drawerEl = null;
  let overlayEl = null;
  let itemsEl = null;
  let emptyEl = null;
  let footEl = null;
  let totalEl = null;
  let countEl = null;
  let waLinkEl = null;

  /* ---------- Persistence ---------- */
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter(i => i && i.id && i.qty > 0) : [];
    } catch (e) {
      return [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  /* ---------- Lookup product by id ---------- */
  function findProduct(id) {
    const data = (typeof PRODUCTS !== "undefined") ? PRODUCTS : [];
    return data.find(p => p.id === Number(id));
  }

  /* ---------- Core operations ---------- */
  function add(id, qty) {
    const product = findProduct(id);
    if (!product) return false;
    const existing = items.find(i => i.id === product.id);
    if (existing) existing.qty += qty || 1;
    else items.push({ id: product.id, qty: qty || 1 });
    save();
    updateBadge(true);
    return true;
  }

  function remove(id) {
    items = items.filter(i => i.id !== Number(id));
    save();
    render();
    updateBadge();
  }

  function changeQty(id, delta) {
    const item = items.find(i => i.id === Number(id));
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      remove(id);
      return;
    }
    save();
    render();
    updateBadge();
  }

  function count() {
    return items.reduce((sum, i) => sum + i.qty, 0);
  }

  function total() {
    return items.reduce((sum, i) => {
      const p = findProduct(i.id);
      return p ? sum + p.price * i.qty : sum;
    }, 0);
  }

  /* ---------- WhatsApp order ---------- */
  function buildMessage() {
    if (!items.length) return "";
    const lines = items.map(i => {
      const p = findProduct(i.id);
      return `- ${p ? p.name : "Produit " + i.id} (x${i.qty})`;
    });
    return [
      "Hello, I would like to order:",
      ...lines,
      "",
      `Total: ${total()} DH`
    ].join("\n");
  }

  function orderViaWhatsApp() {
    if (!items.length) return;
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank", "noopener");
  }

  /* ---------- Rendering ---------- */
  function render() {
    if (!itemsEl) return;
    itemsEl.innerHTML = items.map(itemHTML).join("");
    const isEmpty = !items.length;

    if (emptyEl) emptyEl.style.display = isEmpty ? "block" : "none";
    if (footEl) footEl.style.display = isEmpty ? "none" : "block";
    if (totalEl) totalEl.textContent = total() + " DH";
  }

  function itemHTML(item) {
    const p = findProduct(item.id);
    if (!p) return "";
    return `
      <div class="cart-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <div class="ci-info">
          <p class="ci-name">${p.name}</p>
          <span class="ci-price">${p.price} DH</span>
          <div class="ci-foot">
            <div class="qty">
              <button data-dec="${p.id}" aria-label="Diminuer la quantité">−</button>
              <span>${item.qty}</span>
              <button data-inc="${p.id}" aria-label="Augmenter la quantité">+</button>
            </div>
            <button class="ci-remove" data-remove="${p.id}" aria-label="Retirer du panier">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      </div>`;
  }

  function updateBadge(pop) {
    if (!countEl) return;
    const n = count();
    countEl.textContent = n;
    countEl.style.display = n ? "grid" : "none";
    if (pop) {
      countEl.classList.remove("pop");
      void countEl.offsetWidth; // restart animation
      countEl.classList.add("pop");
    }
  }

  /* ---------- Drawer open / close ---------- */
  function open() {
    render();
    if (overlayEl) overlayEl.classList.add("open");
    if (drawerEl) drawerEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    if (overlayEl) overlayEl.classList.remove("open");
    if (drawerEl) drawerEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ---------- Toast feedback ---------- */
  function toast(msg) {
    let el = document.getElementById("cartToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "cartToast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.innerHTML = `
      <span class="t-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
      ${msg}`;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  /* ---------- Event wiring ---------- */
  function rebind() {
    document.querySelectorAll("[data-add-to-cart]").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-add-to-cart");
        if (add(id, 1)) {
          updateBadge(true);
          toast("Produit ajouté au panier");
          // bounce the cart button for a nice micro-interaction
          const cartBtn = document.getElementById("cartBtn");
          if (cartBtn) {
            cartBtn.classList.remove("bounce");
            void cartBtn.offsetWidth;
            cartBtn.classList.add("bounce");
          }
        }
      };
    });
  }

  function init() {
    drawerEl = document.getElementById("cartDrawer");
    overlayEl = document.getElementById("cartOverlay");
    itemsEl = document.getElementById("cartItems");
    emptyEl = document.getElementById("cartEmpty");
    footEl = document.getElementById("cartFoot");
    totalEl = document.getElementById("cartTotal");
    countEl = document.getElementById("cartCount");
    waLinkEl = document.getElementById("waOrder");

    // openers
    document.querySelectorAll("[data-cart-open]").forEach(el =>
      el.addEventListener("click", open)
    );
    // closers
    document.querySelectorAll("[data-cart-close], #cartOverlay").forEach(el =>
      el.addEventListener("click", close)
    );
    // Esc key closes drawer
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") close();
    });

    // WhatsApp order button
    if (waLinkEl) waLinkEl.addEventListener("click", orderViaWhatsApp);

    // quantity / remove delegation
    document.addEventListener("click", e => {
      const dec = e.target.closest("[data-dec]");
      const inc = e.target.closest("[data-inc]");
      const rem = e.target.closest("[data-remove]");
      if (dec) { e.preventDefault(); changeQty(dec.getAttribute("data-dec"), -1); }
      else if (inc) { e.preventDefault(); changeQty(inc.getAttribute("data-inc"), 1); }
      else if (rem) { e.preventDefault(); remove(rem.getAttribute("data-remove")); }
    });

    updateBadge();
    render();
    rebind();
  }

  return { init, rebind, add, remove, changeQty, count, total, open, close, buildMessage };
})();

document.addEventListener("DOMContentLoaded", Cart.init);

// expose on window for debugging / cross-page helpers
window.Cart = Cart;
