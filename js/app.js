/**
 * Shared App Logic for Minimalist / Veloura Skin Multi-Page Setup
 */

const AppState = {
  cart: [
    { id: "gentle-cloud-cleanser", quantity: 1 }
  ]
};

// Toast notification helper
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

// Global Cart Handling
function getCartSubtotal() {
  return AppState.cart.reduce((sum, item) => {
    const prod = PRODUCTS.find(p => p.id === item.id);
    return sum + (prod ? prod.price * item.quantity : 0);
  }, 0);
}

function updateCartBadges() {
  const count = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-badge").forEach(badge => {
    badge.textContent = count;
  });
}

function addToCart(productId, qty = 1) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;
  const existing = AppState.cart.find(i => i.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    AppState.cart.push({ id: productId, quantity: qty });
  }
  updateCartBadges();
  renderCartDrawer();
  showToast(`Added ${prod.name} to bag`);
  openCartDrawer();
}

function updateCartQty(productId, newQty) {
  if (newQty <= 0) {
    AppState.cart = AppState.cart.filter(i => i.id !== productId);
  } else {
    const item = AppState.cart.find(i => i.id === productId);
    if (item) item.quantity = newQty;
  }
  updateCartBadges();
  renderCartDrawer();
}

function removeCartItem(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  AppState.cart = AppState.cart.filter(i => i.id !== productId);
  updateCartBadges();
  renderCartDrawer();
  if (prod) showToast(`Removed ${prod.name}`);
}

function renderCartDrawer() {
  const container = document.getElementById("cart-items-container");
  const subtotalEl = document.getElementById("cart-subtotal");
  const progressFill = document.getElementById("shipping-progress-bar");
  const progressText = document.getElementById("free-shipping-message");
  if (!container) return;

  const subtotal = getCartSubtotal();
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  // Shipping progress bar ($50 goal)
  if (progressFill && progressText) {
    const threshold = 50;
    if (subtotal >= threshold) {
      progressFill.style.width = "100%";
      progressText.innerHTML = `🎉 You unlocked <strong>Free Standard Shipping!</strong>`;
    } else {
      const diff = (threshold - subtotal).toFixed(2);
      const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
      progressFill.style.width = `${pct}%`;
      progressText.innerHTML = `Add <strong>$${diff}</strong> more for Free Shipping`;
    }
  }

  if (AppState.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--color-text-muted); font-size: 0.875rem;">
        Your bag is empty.
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.cart.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if (!p) return "";
    return `
      <div class="cart-item-row">
        <div style="width: 56px; height: 64px; background: var(--color-bg-light); border-radius: 4px; display: flex; align-items: center; justify-content: center; padding: 4px;">
          ${getProductSvg(p.svgType, p.accentColor, p.accentHighlight)}
        </div>
        <div>
          <div style="font-size: 0.8125rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 2px;">${p.name}</div>
          <div style="font-size: 0.725rem; color: var(--color-text-light); margin-bottom: 6px;">${p.size}</div>
          <div style="display: inline-flex; align-items: center; border: 1px solid var(--color-border); border-radius: 99px; padding: 1px 6px;">
            <button onclick="updateCartQty('${p.id}', ${item.quantity - 1})" style="padding: 0 4px; font-size: 0.8125rem;">-</button>
            <span style="font-size: 0.75rem; font-weight: 700; padding: 0 6px;">${item.quantity}</span>
            <button onclick="updateCartQty('${p.id}', ${item.quantity + 1})" style="padding: 0 4px; font-size: 0.8125rem;">+</button>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-family: var(--font-mono); font-size: 0.875rem; font-weight: 700; color: var(--color-accent-orange);">$${p.price * item.quantity}</div>
          <button onclick="removeCartItem('${p.id}')" style="font-size: 0.6875rem; color: var(--color-text-light); text-decoration: underline; margin-top: 6px;">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

function openCartDrawer() {
  const overlay = document.getElementById("cart-drawer-overlay");
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const overlay = document.getElementById("cart-drawer-overlay");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Product Details Modal
function openProductModal(productId) {
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;
  const overlay = document.getElementById("product-modal-overlay");
  const body = document.getElementById("modal-body");
  if (!overlay || !body) return;

  body.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 30px; padding: 30px;">
      <div style="background: radial-gradient(circle, #FAF8F5 0%, #EDE6DC 100%); border-radius: 8px; padding: 30px; display: flex; align-items: center; justify-content: center;">
        <div style="width: 180px; height: 230px;">
          ${getProductSvg(p.svgType, p.accentColor, p.accentHighlight)}
        </div>
      </div>
      <div style="display: flex; flex-direction: column;">
        <span class="bracket-tag">[ ${p.categoryLabel.toUpperCase()} ]</span>
        <h2 style="font-size: 1.6rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 6px;">${p.name}</h2>
        <div style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 700; color: var(--color-accent-orange); margin-bottom: 16px;">
          $${p.price} <span style="font-size: 0.75rem; color: var(--color-text-light); font-weight: 400;">(${p.size})</span>
        </div>
        <p style="font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 18px;">${p.description}</p>
        
        <div style="margin-bottom: 14px;">
          <div style="font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-text-main); margin-bottom: 6px;">Key Actives:</div>
          <ul style="list-style: none; font-size: 0.8125rem; line-height: 1.4; color: var(--color-text-muted);">
            ${p.keyIngredients.map(ing => `<li>• <strong>${ing.name}:</strong> ${ing.benefit}</li>`).join("")}
          </ul>
        </div>

        <div style="font-size: 0.775rem; background: var(--color-bg-light); padding: 10px 14px; border-radius: 4px; border-left: 3px solid var(--color-accent-orange); margin-bottom: 20px;">
          <strong>Usage:</strong> ${p.howToUse}
        </div>

        <button onclick="addToCart('${p.id}'); closeProductModal();" class="hero-btn-pill" style="align-self: flex-start; background: var(--color-dark); color: #fff; padding: 10px 24px;">
          Add to Bag • $${p.price}
        </button>
      </div>
    </div>
  `;

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const overlay = document.getElementById("product-modal-overlay");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Wire common handlers
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadges();
  renderCartDrawer();

  const cartBtn = document.getElementById("cart-toggle-btn");
  if (cartBtn) cartBtn.addEventListener("click", openCartDrawer);

  const cartClose = document.getElementById("cart-close-btn");
  if (cartClose) cartClose.addEventListener("click", closeCartDrawer);

  const cartOverlay = document.getElementById("cart-drawer-overlay");
  if (cartOverlay) cartOverlay.addEventListener("click", (e) => {
    if (e.target === cartOverlay) closeCartDrawer();
  });

  const modalOverlay = document.getElementById("product-modal-overlay");
  const modalClose = document.getElementById("modal-close-btn");
  if (modalClose) modalClose.addEventListener("click", closeProductModal);
  if (modalOverlay) modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeProductModal();
  });

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", () => {
    showToast("Demo Environment: Checkout is disabled.");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
      closeCartDrawer();
    }
  });
});
