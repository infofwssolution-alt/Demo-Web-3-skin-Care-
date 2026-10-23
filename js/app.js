/**
 * Veloura Skin - Application Logic
 * Manages:
 * - Product filtering (by category chips and skin concerns)
 * - Sorting by price and name
 * - Product detail modal
 * - Interactive cart drawer, quantities, subtotal, and free shipping progress
 * - Accordion FAQs
 * - Smooth anchor scrolling
 * - Top-center toast feedback
 */

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    selectedCategory: "all",
    selectedConcern: "all",
    sortOrder: "featured",
    cart: [
      // Pre-seed with one starter item for realistic initial demo look
      { id: "gentle-cloud-cleanser", quantity: 1 }
    ]
  };

  // DOM Elements
  const productsGrid = document.getElementById("products-grid");
  const categoryChips = document.querySelectorAll(".chip-btn");
  const concernCards = document.querySelectorAll(".concern-card");
  const sortSelect = document.getElementById("sort-select");
  const filterIndicator = document.getElementById("filter-indicator");
  const filterSummary = document.getElementById("filter-summary");
  const resetFilterBtn = document.getElementById("reset-filter-btn");

  // Cart Elements
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
  const cartCloseBtn = document.getElementById("cart-close-btn");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartCountBadges = document.querySelectorAll(".cart-count-badge");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const freeShippingMessage = document.getElementById("free-shipping-message");
  const shippingProgressBar = document.getElementById("shipping-progress-bar");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Modal Elements
  const productModalOverlay = document.getElementById("product-modal-overlay");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalBody = document.getElementById("modal-body");

  // FAQ Elements
  const faqItems = document.querySelectorAll(".faq-item");

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form");

  // Toast Container
  const toastContainer = document.getElementById("toast-container");

  /* ==========================================================================
     Toast Notifications (Top-Center, avoiding bottom-right widget)
     ========================================================================== */
  function showToast(message, type = "normal") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast ${type === "info" ? "toast-info" : ""}`;
    toast.setAttribute("role", "alert");
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  /* ==========================================================================
     Filtering & Sorting Products
     ========================================================================== */
  function getFilteredProducts() {
    let result = [...PRODUCTS];

    // Filter by Category
    if (state.selectedCategory !== "all") {
      result = result.filter(p => p.category.toLowerCase() === state.selectedCategory.toLowerCase());
    }

    // Filter by Concern
    if (state.selectedConcern !== "all") {
      result = result.filter(p => p.concerns.includes(state.selectedConcern));
    }

    // Sort products
    switch (state.sortOrder) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Featured default order in products.js
        break;
    }

    return result;
  }

  function renderProducts() {
    const filtered = getFilteredProducts();

    // Update filter feedback pill
    if (state.selectedCategory !== "all" || state.selectedConcern !== "all") {
      filterIndicator.style.display = "flex";
      const parts = [];
      if (state.selectedCategory !== "all") parts.push(`Category: "${state.selectedCategory}"`);
      if (state.selectedConcern !== "all") parts.push(`Concern: "${state.selectedConcern}"`);
      filterSummary.textContent = `Showing ${filtered.length} products for ${parts.join(" & ")}`;
    } else {
      filterIndicator.style.display = "none";
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #FFFFFF; border-radius: 12px; border: 1px solid var(--border-light);">
          <p style="font-size: 1.1rem; color: var(--color-text-main); margin-bottom: 8px;">No matching formulas found.</p>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 16px;">Try clearing your filters to view our full collection.</p>
          <button id="clear-empty-filter-btn" class="btn-secondary" style="font-size: 0.8125rem; padding: 8px 18px;">Reset All Filters</button>
        </div>
      `;
      document.getElementById("clear-empty-filter-btn")?.addEventListener("click", resetAllFilters);
      return;
    }

    productsGrid.innerHTML = filtered.map(product => `
      <article class="product-card" data-id="${product.id}">
        <div class="product-visual-wrapper" data-action="open-modal" data-id="${product.id}" tabindex="0" role="button" aria-label="View details for ${product.name}">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          ${getProductSvg(product.svgType, product.accentColor, product.accentHighlight)}
        </div>
        <div class="product-card-body">
          <span class="product-category-tag">${product.categoryLabel}</span>
          <h3 class="product-title" data-action="open-modal" data-id="${product.id}">${product.name}</h3>
          <div class="product-size">${product.size}</div>
          <div class="product-concerns-pills">
            ${product.concerns.map(c => `<span class="concern-pill">${c}</span>`).join("")}
          </div>
          <div class="product-card-footer">
            <span class="product-price">$${product.price}</span>
            <button class="btn-card-add" data-action="add-to-cart" data-id="${product.id}" aria-label="Add ${product.name} to cart">
              + Add to Cart
            </button>
          </div>
        </div>
      </article>
    `).join("");

    // Attach card event listeners
    productsGrid.querySelectorAll('[data-action="open-modal"]').forEach(el => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-id");
        openProductModal(id);
      });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const id = el.getAttribute("data-id");
          openProductModal(id);
        }
      });
    });

    productsGrid.querySelectorAll('[data-action="add-to-cart"]').forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        addToCart(id);
      });
    });
  }

  function resetAllFilters() {
    state.selectedCategory = "all";
    state.selectedConcern = "all";

    categoryChips.forEach(chip => {
      chip.classList.toggle("active", chip.getAttribute("data-category") === "all");
    });

    concernCards.forEach(card => {
      card.classList.remove("active");
    });

    renderProducts();
  }

  // Filter Chips Click
  categoryChips.forEach(chip => {
    chip.addEventListener("click", () => {
      categoryChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.selectedCategory = chip.getAttribute("data-category");
      renderProducts();
    });
  });

  // Concern Cards Click
  concernCards.forEach(card => {
    card.addEventListener("click", () => {
      const concern = card.getAttribute("data-concern");
      if (state.selectedConcern === concern) {
        // Toggle off
        state.selectedConcern = "all";
        card.classList.remove("active");
      } else {
        concernCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        state.selectedConcern = concern;
      }
      renderProducts();

      // Smooth scroll toward shop grid
      const shopEl = document.getElementById("shop");
      if (shopEl) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = shopEl.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });

  // Sort change
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortOrder = e.target.value;
      renderProducts();
    });
  }

  // Reset filter button
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", resetAllFilters);
  }

  /* ==========================================================================
     Cart Functionality & Drawer
     ========================================================================== */
  function addToCart(productId, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = state.cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      state.cart.push({ id: productId, quantity: qty });
    }

    renderCart();
    showToast(`Added ${product.name} to cart`);

    // Bump cart badge animation
    cartCountBadges.forEach(badge => {
      badge.classList.remove("pop");
      void badge.offsetWidth; // trigger reflow
      badge.classList.add("pop");
    });

    // Auto open drawer for interactive satisfaction
    openCart();
  }

  function updateCartQuantity(productId, newQty) {
    if (newQty <= 0) {
      state.cart = state.cart.filter(item => item.id !== productId);
    } else {
      const item = state.cart.find(item => item.id === productId);
      if (item) item.quantity = newQty;
    }
    renderCart();
  }

  function removeFromCart(productId) {
    const item = PRODUCTS.find(p => p.id === productId);
    state.cart = state.cart.filter(i => i.id !== productId);
    renderCart();
    if (item) {
      showToast(`Removed ${item.name}`, "info");
    }
  }

  function renderCart() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadges.forEach(badge => {
      badge.textContent = totalItems;
    });

    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
          <p>Your bag is currently empty.</p>
          <button id="cart-start-shopping" class="btn-primary" style="font-size: 0.875rem; padding: 10px 20px;">Explore Formulas</button>
        </div>
      `;
      document.getElementById("cart-start-shopping")?.addEventListener("click", () => {
        closeCart();
        const shop = document.getElementById("shop");
        if (shop) shop.scrollIntoView({ behavior: "smooth" });
      });

      cartSubtotalEl.textContent = "$0.00";
      shippingProgressBar.style.width = "0%";
      freeShippingMessage.innerHTML = `Add <strong>$50.00</strong> more to unlock Free Standard Shipping!`;
      return;
    }

    let subtotal = 0;
    cartItemsContainer.innerHTML = state.cart.map(cartItem => {
      const product = PRODUCTS.find(p => p.id === cartItem.id);
      if (!product) return "";
      const itemTotal = product.price * cartItem.quantity;
      subtotal += itemTotal;

      return `
        <div class="cart-item-row" data-id="${product.id}">
          <div class="cart-item-thumb">
            ${getProductSvg(product.svgType, product.accentColor, product.accentHighlight)}
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${product.name}</div>
            <div class="cart-item-size">${product.size}</div>
            <div class="cart-qty-control">
              <button class="qty-btn" data-action="decrease" data-id="${product.id}" aria-label="Decrease quantity">-</button>
              <span class="qty-number">${cartItem.quantity}</span>
              <button class="qty-btn" data-action="increase" data-id="${product.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="cart-item-actions">
            <span class="cart-item-price">$${itemTotal}</span>
            <button class="cart-item-remove" data-action="remove" data-id="${product.id}" aria-label="Remove ${product.name}">Remove</button>
          </div>
        </div>
      `;
    }).join("");

    cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    // Free Shipping Progress ($50 threshold)
    const threshold = 50;
    if (subtotal >= threshold) {
      shippingProgressBar.style.width = "100%";
      shippingProgressBar.style.background = "var(--color-primary)";
      freeShippingMessage.innerHTML = `🎉 You have unlocked <strong>Free Standard Shipping!</strong>`;
    } else {
      const diff = (threshold - subtotal).toFixed(2);
      const percent = Math.min(100, Math.round((subtotal / threshold) * 100));
      shippingProgressBar.style.width = `${percent}%`;
      freeShippingMessage.innerHTML = `Add <strong>$${diff}</strong> more for <strong>Free Shipping</strong>`;
    }

    // Attach listeners for cart actions
    cartItemsContainer.querySelectorAll('[data-action="decrease"]').forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = state.cart.find(i => i.id === id);
        if (item) updateCartQuantity(id, item.quantity - 1);
      });
    });

    cartItemsContainer.querySelectorAll('[data-action="increase"]').forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = state.cart.find(i => i.id === id);
        if (item) updateCartQuantity(id, item.quantity + 1);
      });
    });

    cartItemsContainer.querySelectorAll('[data-action="remove"]').forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        removeFromCart(id);
      });
    });
  }

  function openCart() {
    cartDrawerOverlay.classList.add("active");
    cartDrawerOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    cartDrawerOverlay.classList.remove("active");
    cartDrawerOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener("click", openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);

  cartDrawerOverlay.addEventListener("click", (e) => {
    if (e.target === cartDrawerOverlay) closeCart();
  });

  // Non-functional Checkout button with friendly demo message
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      showToast("Demo Store: Online checkout is disabled for this preview.", "info");
    });
  }

  /* ==========================================================================
     Product Detail Modal
     ========================================================================== */
  function openProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    modalBody.innerHTML = `
      <div class="modal-grid">
        <div class="modal-visual-side">
          ${getProductSvg(product.svgType, product.accentColor, product.accentHighlight)}
          <div style="margin-top: 20px; font-size: 0.8125rem; color: var(--color-text-muted); text-align: center;">
            Veloura Clean Formulation Guarantee • Dermatologist Tested
          </div>
        </div>
        <div class="modal-info-side">
          <span class="modal-category">${product.categoryLabel}</span>
          <h2 class="modal-title">${product.name}</h2>
          <div class="modal-meta-row">
            <span class="modal-price">$${product.price}</span>
            <span class="modal-size">${product.size}</span>
          </div>

          <p class="modal-desc">${product.description}</p>

          <div style="margin-bottom: 20px;">
            <h4 class="modal-section-title">Key Active Ingredients</h4>
            <ul class="modal-ingredients-list">
              ${product.keyIngredients.map(ing => `
                <li><strong>${ing.name}:</strong> ${ing.benefit}</li>
              `).join("")}
            </ul>
          </div>

          <div style="margin-bottom: 16px;">
            <h4 class="modal-section-title">Recommended Skin Types</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
              ${product.skinTypes.map(st => `<span class="concern-pill" style="font-size: 0.75rem; padding: 4px 10px;">${st}</span>`).join("")}
            </div>
          </div>

          <div class="modal-box-info">
            <strong>How to Use:</strong> ${product.howToUse}
          </div>

          ${product.avoidNotes ? `
            <div style="font-size: 0.775rem; color: #8A5B38; background: #FAF2EC; padding: 10px 12px; border-radius: 6px; margin-bottom: 20px;">
              <strong>Note:</strong> ${product.avoidNotes}
            </div>
          ` : ""}

          <div class="modal-action-row">
            <button id="modal-add-to-cart-btn" class="btn-primary" style="flex-grow: 1;">
              Add to Bag • $${product.price}
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modal-add-to-cart-btn")?.addEventListener("click", () => {
      addToCart(product.id);
      closeProductModal();
    });

    productModalOverlay.classList.add("active");
    productModalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProductModal() {
    productModalOverlay.classList.remove("active");
    productModalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProductModal);

  productModalOverlay.addEventListener("click", (e) => {
    if (e.target === productModalOverlay) closeProductModal();
  });

  // Global ESC handler for modal and drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (productModalOverlay.classList.contains("active")) {
        closeProductModal();
      } else if (cartDrawerOverlay.classList.contains("active")) {
        closeCart();
      }
    }
  });

  /* ==========================================================================
     FAQ Accordion
     ========================================================================== */
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question-btn");
    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items for clean accordion UX
      faqItems.forEach(other => {
        other.classList.remove("active");
        other.querySelector(".faq-question-btn").setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ==========================================================================
     Newsletter Visual Form
     ========================================================================== */
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast("Thank you for joining the Veloura Skin community!");
        input.value = "";
      }
    });
  }

  /* ==========================================================================
     Initialize Application
     ========================================================================== */
  renderProducts();
  renderCart();
});
