import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sparkles, ChevronRight, Hand } from "lucide-react";
import confetti from "canvas-confetti";
import { PRODUCTS } from "./data/products";
import { ProductVisual } from "./components/ProductVisual";
import { CartDrawer } from "./components/CartDrawer";
import { ProductModal } from "./components/ProductModal";
import { HOTSPOTS } from "./data/hotspots";

const HeroScene = lazy(() => import("./components/HeroScene"));

const HERO_PRODUCT = PRODUCTS.find((p) => p.id === "glow-vitamin-c-serum");

const FAQS = [
  {
    q: "What are your shipping rates and delivery times?",
    a: "Free Standard Shipping on orders over $50 ($5 flat rate under $50). Delivery takes 3 to 5 business days. Express shipping delivers in 1 to 2 business days for $15.",
  },
  {
    q: "Can I return an opened product if I have an adverse reaction?",
    a: "Yes. Unopened items can be returned within 30 days. If an opened product caused a skin reaction or irritation, you are also eligible for a full refund or exchange within 30 days of delivery.",
  },
  {
    q: "Can I use Vitamin C and Retinol together?",
    a: "We recommend separating them. Apply Glow Vitamin C Serum in the morning on cleansed skin, followed by Daily Shield SPF 50. Apply Renew Retinol 0.3% Night Serum strictly in the evening.",
  },
  {
    q: "Are all products cruelty-free and vegan?",
    a: "Yes. We are Leaping Bunny certified cruelty-free. We never test on animals, and all formulas are 100% vegan with sugarcane-derived squalane.",
  },
];

export default function App() {
  const [activeNav, setActiveNav] = useState("Explore");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [activeId, setActiveId] = useState("formula");
  const [cart, setCart] = useState([]);

  const activeHotspot = HOTSPOTS.find((h) => h.id === activeId);

  const handleAddToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, q) =>
    setCart((prev) =>
      q <= 0 ? prev.filter((i) => i.product.id !== id) : prev.map((i) => (i.product.id === id ? { ...i, quantity: q } : i))
    );

  const handleRemove = (id) => setCart((prev) => prev.filter((i) => i.product.id !== id));

  const handleCheckout = () => alert("Demo store: checkout is disabled in this preview.");

  const runScan = () => {
    if (scanning) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      confetti({ particleCount: 50, spread: 55, origin: { y: 0.55 }, colors: ["#9370DB", "#CBB8F2", "#E9CC92"] });
    }, 2400);
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#141615] font-sans selection:bg-[#EADBFF] selection:text-[#5B32A3] overflow-x-hidden">
      {/* ======================= HERO (full viewport, 3D) ======================= */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        {/* 3D canvas fills the whole hero */}
        <div className="absolute inset-0">
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#9370DB] border-t-transparent" />
              </div>
            }
          >
            <HeroScene scanning={scanning} activeId={activeId} onSelect={setActiveId} />
          </Suspense>
        </div>

        {/* Overlay layer — pointer-events pass through to the canvas except on controls */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col">
          {/* Nav */}
          <header className="pointer-events-auto mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-6 lg:px-12">
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9370DB" strokeWidth="2.5" className="h-7 w-7">
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeLinecap="round" />
              </svg>
              <span className="text-2xl font-semibold tracking-tight">Nuvé</span>
            </div>

            <nav className="hidden items-center gap-8 lg:flex">
              {["Explore", "Your Skin", "Transformations", "AI Guidance", "Philosophy"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`text-sm transition ${activeNav === item ? "font-semibold text-[#141615]" : "font-medium text-[#555957] hover:text-[#141615]"}`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 hover:text-[#9370DB] transition" aria-label="Open bag">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#141615] font-mono text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" })}
                className="hidden rounded-xl border border-[#D5D8D6] bg-white/60 px-5 py-2.5 text-xs font-semibold backdrop-blur hover:border-[#141615] transition sm:inline-flex"
              >
                Contact Us
              </button>
              <a href="#shop" className="inline-flex items-center gap-2 rounded-xl bg-[#0E100F] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#202422] transition">
                Shop Now
              </a>
            </div>
          </header>

          {/* Hero content */}
          <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center px-6 lg:grid-cols-12 lg:px-12">
            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto self-start pt-6 lg:col-span-4 lg:self-center lg:pt-0"
            >
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/70 px-3.5 py-1.5 shadow-sm backdrop-blur">
                <div className="flex -space-x-1.5">
                  <span className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-tr from-amber-200 to-amber-400" />
                  <span className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-tr from-rose-300 to-rose-400" />
                  <span className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-tr from-purple-300 to-purple-500" />
                </div>
                <span className="text-xs text-[#2A2E2C]">
                  Trusted by <strong className="font-semibold text-[#141615]">10,000+ users</strong>
                </span>
              </div>

              <h1 className="mb-6 text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl xl:text-[76px]">
                Unlock
                <br />
                your skin's
                <br />
                potential
              </h1>
              <p className="mb-8 max-w-sm text-base leading-relaxed text-[#5F6461]">
                A 15% vitamin C serum formulated to help brighten dull, uneven-looking skin. Drag the bottle to explore it.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={runScan}
                  disabled={scanning}
                  className="group flex items-center gap-2.5 rounded-xl bg-[#EFE9FC] px-7 py-4 text-sm font-semibold shadow-sm transition hover:bg-[#E4D9FA] disabled:opacity-70"
                >
                  {scanning ? "Analyzing formula…" : "Analyze Formula"}
                  <Sparkles className="h-4 w-4 text-[#7C52C2] transition group-hover:rotate-12" />
                </button>
                <button
                  onClick={() => handleAddToCart(HERO_PRODUCT)}
                  className="flex items-center gap-1.5 rounded-xl bg-[#141615] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#9370DB]"
                >
                  Add to Bag · ${HERO_PRODUCT.price}
                </button>
              </div>
            </motion.div>

            {/* Center — empty so the 3D bottle shows through */}
            <div className="hidden lg:col-span-5 lg:block" />

            {/* Right metrics */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto hidden flex-col items-end gap-8 lg:col-span-3 lg:flex"
            >
              {[
                { v: "15%", l: "stabilized vitamin C", icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /> },
                { v: "30 ml", l: "1.0 fl oz bottle", icon: <><circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="6" /></> },
                { v: "AM", l: "morning routine step", icon: <><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" /><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></> },
              ].map((m) => (
                <div key={m.v} className="flex w-full max-w-[250px] items-center gap-4 rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#EDEDEB] bg-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">{m.icon}</svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight">{m.v}</div>
                    <div className="text-[11px] leading-tight text-[#686D6A]">{m.l}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom bar: active hotspot detail (centered, away from the bottom-right widget) */}
          <div className="mx-auto flex w-full max-w-[1440px] items-end justify-between px-6 pb-8 lg:px-12">
            <div className="hidden items-center gap-2 text-xs text-[#686D6A] sm:flex">
              <Hand className="h-4 w-4" /> Drag to rotate
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-auto mx-auto w-full max-w-sm rounded-2xl border border-white/80 bg-white/80 p-4 shadow-xl backdrop-blur-md"
              >
                <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#9370DB]">{activeHotspot.label}</div>
                <div className="mb-1 text-sm font-bold">{activeHotspot.title}</div>
                <p className="text-xs leading-relaxed text-[#5F6461]">{activeHotspot.desc}</p>
              </motion.div>
            </AnimatePresence>
            <div className="hidden w-[110px] sm:block" />
          </div>
        </div>
      </section>

      {/* ======================= CATALOG ======================= */}
      <section id="shop" className="border-t border-[#E8E4DC] bg-white py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
            <div>
              <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-[#9370DB]">The full line</span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">All 14 formulations</h2>
            </div>
            <p className="mt-2 max-w-sm text-xs text-[#686D6A] md:mt-0">
              Fragrance-free formulas with transparent active percentages.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="group flex flex-col rounded-2xl border border-[#EBE8E1] bg-[#FAF9F7] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div onClick={() => setSelectedProduct(p)} className="mb-4 flex aspect-[4/5] w-full cursor-pointer items-center justify-center rounded-xl bg-white p-6 shadow-sm">
                  <div className="h-32 w-24 transition duration-200 group-hover:scale-105">
                    <ProductVisual svgType={p.svgType} accentColor={p.accentColor} accentHighlight={p.accentHighlight} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#9370DB]">{p.categoryLabel}</div>
                  <h3 onClick={() => setSelectedProduct(p)} className="mb-1 line-clamp-1 cursor-pointer text-base font-bold transition group-hover:text-[#9370DB]">{p.name}</h3>
                  <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-[#686D6A]">{p.summary}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-[#E8E5DD] pt-3">
                    <span className="text-base font-bold">${p.price}</span>
                    <button onClick={() => handleAddToCart(p)} className="rounded-xl bg-[#141615] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#9370DB]">
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= FAQ ======================= */}
      <section id="faq-section" className="border-t border-[#E8E4DC] bg-[#FAF9F7] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-[#9370DB]">Support &amp; policies</span>
            <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-[#EAE8E1] bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-sm font-bold">{f.q}</h3>
                <p className="text-xs leading-relaxed text-[#686D6A]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E8E4DC] bg-white py-12 text-xs text-[#686D6A]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-12">
          <div><span className="font-bold text-[#141615]">Nuvé</span> &copy; 2026 · Fictional brand for demo purposes</div>
          <div className="flex gap-6 font-medium">
            <a href="#faq-section" className="hover:text-[#141615]">Shipping</a>
            <a href="#faq-section" className="hover:text-[#141615]">Returns</a>
            <a href="#faq-section" className="hover:text-[#141615]">Ingredients</a>
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => handleAddToCart(p)}
      />
    </div>
  );
}
