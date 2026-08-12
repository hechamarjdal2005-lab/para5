/* =========================================================
   PRODUCTS.JS — Shared product data & render helpers
   Para Centre Deroua — Casablanca
   ---------------------------------------------------------
   To update the shop, edit the PRODUCTS array below.
   Fields: id, name, cat, price, oldPrice, badge, image, rating, desc
   badge values: "best" | "promo" | "new" | null
   ========================================================= */

const PRODUCTS = [
  {
    id: 1,
    name: "Maglear Sérum Vitamine C Anti-Âge",
    cat: "skincare",
    price: 149,
    oldPrice: 220,
    badge: "best",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=640&q=70",
    desc: "Sérum éclat à la Vitamine C, unifie le teint et combat les signes de l'âge."
  },
  {
    id: 2,
    name: "Maglear Soin Hydratant Visage",
    cat: "skincare",
    price: 99,
    oldPrice: 140,
    badge: "promo",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=640&q=70",
    desc: "Hydratation intense 24h, texture légère, adapté à tous les types de peau."
  },
  {
    id: 3,
    name: "Health Power Multivitamines Gummies",
    cat: "health",
    price: 129,
    oldPrice: 170,
    badge: "best",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=640&q=70",
    desc: "Dose quotidienne de vitamines essentielles en gummies au goût fruité."
  },
  {
    id: 4,
    name: "Health Power Oméga-3 Capsules",
    cat: "health",
    price: 89,
    oldPrice: null,
    badge: null,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=640&q=70",
    desc: "Acides gras oméga-3 pour le cœur et le cerveau, 60 capsules."
  },
  {
    id: 5,
    name: "Rayonnelle Masque Éclat à l'Argile",
    cat: "skincare",
    price: 79,
    oldPrice: 110,
    badge: "promo",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=640&q=70",
    desc: "Masque purifiant à l'argile blanche, resserre les pores et révèle l'éclat."
  },
  {
    id: 6,
    name: "Rayonnelle Eau Micellaire 400ml",
    cat: "skincare",
    price: 69,
    oldPrice: null,
    badge: null,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=640&q=70",
    desc: "Démaquille et nettoie en douceur sans rincer, même pour les peaux sensibles."
  },
  {
    id: 7,
    name: "Dermoz Crème Barrière Peau Irritée",
    cat: "dermo",
    price: 119,
    oldPrice: 155,
    badge: "best",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=640&q=70",
    desc: "Soin réparateur ultra-nourrissant qui apaise et protège les peaux sèches."
  },
  {
    id: 8,
    name: "Physiolos Soin Réparateur Peaux Sèches",
    cat: "dermo",
    price: 139,
    oldPrice: null,
    badge: null,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=640&q=70",
    desc: "Rééquilibre le microbiote et restaure la barrière cutanée jour après jour."
  },
  {
    id: 9,
    name: "Isiderm Crème Solaire SPF50+",
    cat: "dermo",
    price: 149,
    oldPrice: 195,
    badge: "promo",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=640&q=70",
    desc: "Protection solaire haute à large spectre, non grasse et sans effet blanc."
  },
  {
    id: 10,
    name: "Éclat Fond de Teint Naturel",
    cat: "makeup",
    price: 129,
    oldPrice: null,
    badge: null,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=640&q=70",
    desc: "Couvrance modulable, fini peau nue, teint lumineux toute la journée."
  },
  {
    id: 11,
    name: "LipColor Rouge à Lèvres Longue Tenue",
    cat: "makeup",
    price: 89,
    oldPrice: 125,
    badge: "promo",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=640&q=70",
    desc: "Couleur intense longue durée avec une texture confortable et veloutée."
  },
  {
    id: 12,
    name: "Volume Extra Mascara 24h",
    cat: "makeup",
    price: 99,
    oldPrice: null,
    badge: null,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=640&q=70",
    desc: "Cils spectaculairement volumineux, sans paquets, résistant à l'eau."
  },
  {
    id: 13,
    name: "Bébé Douceur Pack Soin Complet",
    cat: "baby",
    price: 109,
    oldPrice: 145,
    badge: "promo",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=640&q=70",
    desc: "Pack douceur : nettoyant + lait corporel pour la peau délicate de bébé."
  },
  {
    id: 14,
    name: "Bébé Douceur Lait Corporel Hypoallergénique",
    cat: "baby",
    price: 69,
    oldPrice: null,
    badge: null,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=640&q=70",
    desc: "Lait hydratant testé dermatologiquement, sans parfum, dès la naissance."
  },
  {
    id: 15,
    name: "CleanDerm Gel Nettoyant Purifiant",
    cat: "dermo",
    price: 95,
    oldPrice: 130,
    badge: "best",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=640&q=70",
    desc: "Nettoie en profondeur, élimine l'excès de sébum et prévient les imperfections."
  },
  {
    id: 16,
    name: "Visiofresh Crème Contour des Yeux",
    cat: "skincare",
    price: 129,
    oldPrice: 165,
    badge: "promo",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=640&q=70",
    desc: "Atténue cernes et poches, lisse le regard pour un effet frais immédiat."
  },
  {
    id: 17,
    name: "WellnessPro Vitamine D3 2000 UI",
    cat: "health",
    price: 79,
    oldPrice: null,
    badge: "new",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=640&q=70",
    desc: "Soutient l'immunité et la santé osseuse. Nouveau format 90 gélules."
  },
  {
    id: 18,
    name: "Rayonnelle Huile Corporelle Éclat",
    cat: "skincare",
    price: 119,
    oldPrice: 150,
    badge: "best",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=640&q=70",
    desc: "Huile sèche qui nourrit la peau et lui donne un éclat doré naturel."
  }
];

const CATEGORIES = {
  all:     { label: "Tous", icon: "grid" },
  skincare:{ label: "Skincare", icon: "droplet" },
  dermo:   { label: "Dermo-cosmétique", icon: "shield" },
  health:  { label: "Santé & Bien-être", icon: "heart" },
  makeup:  { label: "Makeup", icon: "lipstick" },
  baby:    { label: "Bébé", icon: "baby" }
};

const BADGE_LABELS = {
  best:  "BEST PRICE",
  promo: "PROMO",
  new:   "NOUVEAU"
};

/* Convert category key to display label */
function catLabel(key) {
  return (CATEGORIES[key] && CATEGORIES[key].label) || "Produit";
}

/* Build the HTML for a single product card */
function productCardHTML(p, opts) {
  opts = opts || {};
  const hasBadge = p.badge && BADGE_LABELS[p.badge];
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const rating = p.rating || 4.7;

  return `
  <article class="product-card" data-id="${p.id}">
    <div class="product-media">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      ${hasBadge ? `<span class="badge badge--${p.badge}">${BADGE_LABELS[p.badge]}</span>` : ""}
      ${discount > 0 ? `<span class="discount-tag">-${discount}%</span>` : ""}
      <button class="add-btn" data-add-to-cart="${p.id}" aria-label="Ajouter ${p.name} au panier">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <span>Ajouter</span>
      </button>
    </div>
    <div class="product-body">
      <span class="product-cat">${catLabel(p.cat)}</span>
      <h3 class="product-name">${p.name}</h3>
      <div class="product-rating">
        <span class="stars" aria-hidden="true">${starsHTML(rating)}</span>
        <span class="rating-num">${rating.toFixed(1)}</span>
      </div>
      <div class="product-foot">
        <div class="product-price">
          <b>${p.price} <small>DH</small></b>
          ${p.oldPrice ? `<s>${p.oldPrice} DH</s>` : ""}
        </div>
        <button class="add-btn-sm" data-add-to-cart="${p.id}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    </div>
  </article>`;
}

/* Star rating row (5 stars, filled by rounding) */
function starsHTML(rating) {
  const full = Math.round(rating);
  let s = "";
  for (let i = 1; i <= 5; i++) {
    s += i <= full
      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>'
      : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>';
  }
  return s;
}

/* Render a list of products into a container element */
function renderProducts(products, container, opts) {
  if (!container) return;
  container.innerHTML = products.map(p => productCardHTML(p, opts)).join("");
  container.querySelectorAll(".product-card").forEach((card, i) => {
    card.style.setProperty("--i", i);
    card.classList.add("reveal");
  });
  // refresh the scroll-reveal observers for the newly added cards
  if (typeof initReveal === "function") initReveal();
  if (typeof Cart !== "undefined") Cart.rebind();
}

/*
   Expose on window as well (const declarations do NOT attach
   to window automatically — this keeps console + older helpers working).
*/
window.PRODUCTS = PRODUCTS;
