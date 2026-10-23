import React, { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Filter, 
  MapPin, 
  Phone, 
  ChevronRight, 
  ShieldCheck, 
  FlaskConical, 
  Activity,
  Layers
} from "lucide-react";
import confetti from "canvas-confetti";
import { PRODUCTS } from "./data/products";
import { ProductVisual } from "./components/ProductVisual";
import { CartDrawer } from "./components/CartDrawer";
import { ProductModal } from "./components/ProductModal";

export default function App() {
  // Navigation active tab: 'home' | 'shop' | 'about' | 'contact'
  const [activePage, setActivePage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([
    { product: PRODUCTS[3], quantity: 1 } // Pre-seeded with Calm Niacinamide Serum
  ]);

  // Shop filter state
  const [shopCategory, setShopCategory] = useState("all");
  const [shopConcern, setShopConcern] = useState("all");
  const [shopSort, setShopSort] = useState("featured");

  // Scroll progress for top indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Cart operations
  const handleAddToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const handleRemove = (productId) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleCheckout = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert("Demo Showcase Mode: Secure checkout is simulated for this presentation.");
  };

  // Filtered products list for shop view
  const filteredProducts = PRODUCTS.filter((p) => {
    if (shopCategory !== "all" && p.category.toLowerCase() !== shopCategory.toLowerCase()) return false;
    if (shopConcern !== "all" && !p.concerns.includes(shopConcern)) return false;
    return true;
  }).sort((a, b) => {
    if (shopSort === "price-asc") return a.price - b.price;
    if (shopSort === "price-desc") return b.price - a.price;
    if (shopSort === "name-asc") return a.name.localeCompare(b.name);
    return 0;
  });

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#141615] flex flex-col font-sans selection:bg-[#FF5A26] selection:text-white">
      {/* Scroll indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF5A26] origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* TOP HEADER */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
          activePage === "home"
            ? "bg-[#141615]/90 backdrop-blur-md text-white border-white/10"
            : "bg-[#F7F6F3]/90 backdrop-blur-md text-[#141615] border-[#E5E1D8]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setActivePage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group"
          >
            <span className="font-black text-xl tracking-tighter uppercase group-hover:text-[#FF5A26] transition">
              Minimalist
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A26]" />
          </button>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "home", label: "Home" },
              { id: "shop", label: "Shop All" },
              { id: "about", label: "About & Science" },
              { id: "contact", label: "Stores & Care" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`relative py-1 text-xs font-bold uppercase tracking-widest transition duration-200 ${
                  activePage === link.id
                    ? activePage === "home" ? "text-white" : "text-[#141615]"
                    : activePage === "home" ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-[#141615]"
                }`}
              >
                {link.label}
                {activePage === link.id && (
                  <motion.div
                    layoutId="header-active-pill"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5A26]"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Cart Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition ${
                activePage === "home"
                  ? "border-white/20 hover:border-white text-white"
                  : "border-[#E5E1D8] hover:border-[#141615] bg-white text-[#141615]"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#FF5A26]" />
              <span>Bag</span>
              <span className="bg-[#FF5A26] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {cartTotalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          PAGE 1: HOME (Exact Minimalist Editorial Layout from Reference Image)
          ========================================================================= */}
      {activePage === "home" && (
        <main className="flex-1">
          {/* 1. HERO SECTION (Dark Editorial) */}
          <section className="bg-[#141615] text-white pt-8 pb-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              {/* Giant Minimalist Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] font-black tracking-tighter leading-none select-none text-white uppercase mb-8"
              >
                Minimalist
              </motion.h1>

              {/* Editorial Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                {/* Credo Callout */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="lg:col-span-4 border-l border-white/20 pl-6 py-2"
                >
                  <p className="text-xs uppercase tracking-wider text-neutral-400 leading-relaxed max-w-xs">
                    We believe that skincare is not just a routine, it's a journey towards confidence, vitality, and self-expression.
                  </p>
                  <div className="font-mono text-[11px] text-neutral-500 mt-6 tracking-widest">[ 2026 ]</div>
                </motion.div>

                {/* Hero Showcase Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="lg:col-span-8 bg-gradient-to-r from-[#202422] to-[#161817] rounded-3xl border border-white/10 p-8 flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
                >
                  <div className="w-48 h-56 flex-shrink-0 drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]">
                    <ProductVisual
                      svgType="dropper-bottle"
                      accentColor="#E2ECE5"
                      accentHighlight="#BED3C4"
                    />
                  </div>

                  <div className="flex-1 text-left sm:pr-6">
                    <span className="font-mono text-[10px] text-[#FF5A26] font-bold tracking-widest uppercase">
                      [ FEATURED BIOACTIVE ]
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-white mt-1 mb-2">
                      Calm Niacinamide 10% Serum
                    </h3>
                    <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                      10% pure vitamin B3 buffered with zinc PCA &amp; centella asiatica to refine pore walls and suppress redness.
                    </p>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleAddToCart(PRODUCTS[3])}
                        className="bg-white hover:bg-[#FF5A26] text-[#141615] hover:text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition duration-200"
                      >
                        Buy Now • $28
                      </button>
                      <button
                        onClick={() => setSelectedProduct(PRODUCTS[3])}
                        className="text-xs text-neutral-400 hover:text-white underline font-mono tracking-wider"
                      >
                        Read Specs
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mt-6 text-[11px] font-mono text-neutral-400">
                      <span>✓ Sulfate-free</span>
                      <span>✓ Paraben-free</span>
                      <span>✓ Silicone-free</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 2. MANIFESTO (Middle Section from Reference) */}
          <section className="py-24 bg-[#F7F6F3]">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <span className="font-mono text-xs font-bold text-[#FF5A26] tracking-widest uppercase block mb-6">
                [ WHO WE ARE? ]
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#141615] leading-snug mb-8">
                We are a team of skincare enthusiasts dedicated to crafting products that redefine beauty standards. Committed to innovation and quality, we blend science with nature to create skincare solutions that nourish and transform.
              </h2>
              <button
                onClick={() => {
                  setActivePage("about");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-mono text-xs font-bold text-neutral-500 hover:text-[#FF5A26] uppercase tracking-widest inline-flex items-center gap-2 transition"
              >
                <span>Welcome to our skincare journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* 3. ENHANCED PERFORMANCE (Dropper Action Section) */}
          <section className="py-20 border-t border-[#E5E1D8] bg-[#F7F6F3]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="font-mono text-xs font-bold text-[#FF5A26] tracking-widest uppercase block mb-3">
                  [ 01 ]
                </span>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#141615] mb-6">
                  Enhanced Performance
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed max-w-md mb-8">
                  Our products deliver unparalleled performance, addressing a spectrum of concerns for both face and barrier integrity. From revitalizing damaged matrices to rejuvenating tired complexions, we prioritize efficacy above all else.
                </p>

                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#E5E1D8] max-w-sm shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E5E1D8] flex items-center justify-center text-[#FF5A26]">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#141615]">Micro-Encapsulated Bio-Actives</div>
                    <div className="text-[11px] text-neutral-500">Gradual release to eliminate flaking</div>
                  </div>
                </div>
              </div>

              {/* Pipette Illustration Box */}
              <div className="bg-gradient-to-br from-white to-[#EDE8DE] rounded-3xl p-12 border border-[#E5E1D8] flex items-center justify-center shadow-lg relative min-h-[380px]">
                <div className="w-56 h-72">
                  <svg viewBox="0 0 200 280" className="w-full h-full drop-shadow-md">
                    {/* Glass Pipette dropping serum */}
                    <rect x="96" y="10" width="8" height="110" rx="3" fill="#D6E0E6" stroke="#9BB0BD" strokeWidth="1.5"/>
                    <circle cx="100" cy="138" r="4.5" fill="#FF5A26"/>
                    <path d="M100 130 C97 134 97 136 100 138 C103 136 103 134 100 130 Z" fill="#FF5A26"/>
                    <rect x="55" y="150" width="90" height="115" rx="16" fill="#FFFFFF" stroke="#E2DDD5" strokeWidth="2"/>
                    <rect x="62" y="170" width="76" height="85" rx="8" fill="#F4EFEA"/>
                    <rect x="66" y="195" width="68" height="35" rx="3" fill="#FFFFFF"/>
                    <rect x="74" y="206" width="52" height="3" rx="1.5" fill="#141615"/>
                    <rect x="78" y="214" width="44" height="2" rx="1" fill="#FF5A26"/>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* 4. WHAT'S INSIDE? (Molecular Structure & Formula Table) */}
          <section className="py-24 bg-white border-y border-[#E5E1D8]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12 relative">
                <div className="text-5xl sm:text-8xl font-black text-neutral-100 uppercase tracking-tighter select-none">
                  What's Inside?
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-xs font-bold text-[#FF5A26] tracking-widest uppercase">
                    [ CLINICAL PURITY ]
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141615]">
                    Bioactive Molecular Architecture
                  </h3>
                </div>
              </div>

              {/* Molecular Graphic */}
              <div className="flex justify-center mb-16">
                <div className="w-80 h-44">
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 340 180">
                    <line x1="80" y1="90" x2="130" y2="120" stroke="#2C302D" strokeWidth="7" strokeLinecap="round"/>
                    <line x1="130" y1="120" x2="180" y2="90" stroke="#2C302D" strokeWidth="7" strokeLinecap="round"/>
                    <line x1="180" y1="90" x2="230" y2="120" stroke="#2C302D" strokeWidth="7" strokeLinecap="round"/>
                    <line x1="80" y1="90" x2="60" y2="50" stroke="#2C302D" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="130" y1="120" x2="130" y2="155" stroke="#2C302D" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="180" y1="90" x2="180" y2="45" stroke="#2C302D" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="230" y1="120" x2="265" y2="90" stroke="#2C302D" strokeWidth="6" strokeLinecap="round"/>
                    {/* Carbon Atoms */}
                    <circle cx="80" cy="90" r="18" fill="#202221"/>
                    <circle cx="130" cy="120" r="18" fill="#202221"/>
                    <circle cx="180" cy="90" r="18" fill="#202221"/>
                    <circle cx="230" cy="120" r="18" fill="#202221"/>
                    {/* Oxygen Red Atoms */}
                    <circle cx="60" cy="50" r="16" fill="#D32F2F"/>
                    <circle cx="180" cy="45" r="16" fill="#D32F2F"/>
                    <circle cx="265" cy="90" r="16" fill="#D32F2F"/>
                    {/* Hydrogen */}
                    <circle cx="130" cy="155" r="11" fill="#E8ECE9" stroke="#CCD2CE" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
                      <th className="py-4 px-6">Ingredient</th>
                      <th className="py-4 px-6">Formula</th>
                      <th className="py-4 px-6">Function</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E1D8]">
                    {[
                      { name: "Niacinamide (Vitamin B3)", formula: "[C6H6N2O]", desc: "Tightens enlarged pores & regulates lipid oxidation" },
                      { name: "Ceramide NP Complex", formula: "[C36H71NO3]", desc: "Acts as a skin-identical cellular adhesive against moisture loss" },
                      { name: "Stabilized Ethyl Ascorbic Acid", formula: "[C8H12O6]", desc: "Antioxidant defense against daily UV-induced oxidative stress" },
                      { name: "Multi-Weight Hyaluronic Acid", formula: "[(C14H21NO11)n]", desc: "Binds up to 1000x its weight in water to plump dermis" }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5] transition">
                        <td className="py-4 px-6 font-bold text-[#141615]">{row.name}</td>
                        <td className="py-4 px-6 font-mono text-[#FF5A26] font-semibold">{row.formula}</td>
                        <td className="py-4 px-6 text-neutral-600">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 5. WHAT MAKES IT SPECIAL? (In Vitro Study Progress Bar) */}
          <section className="py-24 bg-[#F7F6F3]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <span className="font-mono text-xs font-bold text-[#FF5A26] tracking-widest uppercase block mb-3">
                  [ IN VITRO STUDIES ]
                </span>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#141615] mb-4">
                  What makes it special
                </h2>
                <div className="text-7xl font-black text-neutral-300 tracking-tighter">
                  22.9%
                </div>
              </div>

              <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#E5E1D8] shadow-sm">
                <h3 className="text-xl font-bold text-[#141615] mb-2">
                  Revolutionary Patent-Pending Blend
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-8 max-w-lg">
                  Our formula delivers a remarkable 22.9% increase in moisture barrier retention after just one wash, significantly surpassing conventional market benchmarks.
                </p>

                {/* Progress bars */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-neutral-500">Usual Competitor Serum</span>
                      <span className="font-mono text-neutral-400">Baseline (42%)</span>
                    </div>
                    <div className="w-full h-4 bg-[#E5E1D8] rounded-sm overflow-hidden">
                      <div className="h-full bg-neutral-400 w-[42%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-[#FF5A26]">Minimalist Biocompatible Formula</span>
                      <span className="font-mono text-[#FF5A26]">+22.9% Efficacy (92%)</span>
                    </div>
                    <div className="w-full h-4 bg-[#E5E1D8] rounded-sm overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "92%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-[#FF5A26]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. SCIENTIFICALLY PROVEN INGREDIENTS (Slate Blue Frosted Card) */}
          <section className="py-20 bg-[#F7F6F3]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="bg-gradient-to-br from-[#5D6C78] to-[#3E4A54] rounded-3xl p-10 sm:p-14 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
                <div className="lg:col-span-7">
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                    Scientifically Proven Ingredients
                  </h2>
                  <p className="text-xs text-neutral-200 leading-relaxed mb-8 max-w-md">
                    Unlock the potential of our formulations with scientifically proven ingredients and optimal active dosages.
                  </p>
                  <button
                    onClick={() => {
                      setActivePage("shop");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-white hover:bg-[#FF5A26] text-[#141615] hover:text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition duration-200"
                  >
                    Shop All Formulations
                  </button>
                </div>

                <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-300 mb-2">
                    [ HYALURONIC ACID COMPLEX ]
                  </div>
                  <div className="text-5xl font-black text-white mb-2">40%</div>
                  <div className="text-xs text-neutral-200">
                    Increase in continuous 24h skin barrier hydration levels
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. MEET OUR SKINCARE HEROES (Top 4 Items) */}
          <section className="py-24 bg-white border-y border-[#E5E1D8]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="font-mono text-xs font-bold text-[#FF5A26] tracking-widest uppercase block mb-2">
                    [ SELECTION ]
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#141615]">
                    Meet Our Skincare Heroes
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setActivePage("shop");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="font-mono text-xs font-bold text-[#FF5A26] hover:underline uppercase tracking-wider"
                >
                  Shop All (14) &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="bg-white border border-[#E5E1D8] rounded-xl overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-1 transition duration-200"
                  >
                    <div
                      onClick={() => setSelectedProduct(p)}
                      className="bg-gradient-to-b from-[#FAF8F5] to-[#EDE8DE] p-8 flex items-center justify-center cursor-pointer min-h-[220px]"
                    >
                      <div className="w-28 h-36 group-hover:scale-105 transition duration-300">
                        <ProductVisual
                          svgType={p.svgType}
                          accentColor={p.accentColor}
                          accentHighlight={p.accentHighlight}
                        />
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <span className="font-mono text-[10px] text-[#FF5A26] font-bold uppercase tracking-wider mb-1">
                        [ {p.categoryLabel} ]
                      </span>
                      <h4
                        onClick={() => setSelectedProduct(p)}
                        className="font-bold text-sm tracking-tight text-[#141615] group-hover:text-[#FF5A26] transition cursor-pointer mb-1 truncate"
                      >
                        {p.name}
                      </h4>
                      <div className="text-[11px] text-neutral-400 mb-4">{p.size}</div>

                      <div className="mt-auto pt-4 border-t border-[#E5E1D8] flex items-center justify-between">
                        <span className="font-mono font-bold text-sm text-[#FF5A26]">${p.price}</span>
                        <button
                          onClick={() => handleAddToCart(p)}
                          className="bg-[#141615] hover:bg-[#FF5A26] text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full transition"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. CLIENT STORIES (Watermark Section) */}
          <section className="py-24 bg-[#F7F6F3] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-4xl sm:text-7xl font-black text-neutral-200 uppercase tracking-tighter mb-4 select-none">
                Client Stories
              </div>
              <span className="font-mono text-xs font-bold text-[#FF5A26] tracking-widest uppercase block mb-8">
                [ 20K+ HAPPY CLIENTS ]
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Sarah M.",
                    date: "May 2026",
                    text: "I'm amazed at how quickly my skin improved after using these products! My complexion feels smoother, less red, and significantly more balanced."
                  },
                  {
                    name: "Jane D.",
                    date: "April 2026",
                    text: "I've struggled with dry, sensitive skin for years. The Gentle Cloud Cleanser and Cloud Barrier Cream restored my comfort without any stinging or clogged pores."
                  },
                  {
                    name: "Elena R.",
                    date: "March 2026",
                    text: "The Renew Retinol is the first retinoid that didn't leave my face peeling. Waking up to plump, glowy skin is now part of my daily reality."
                  }
                ].map((review, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-[#E5E1D8] shadow-sm flex flex-col justify-between">
                    <p className="text-xs text-neutral-600 leading-relaxed mb-6">"{review.text}"</p>
                    <div className="flex justify-between items-center pt-4 border-t border-[#E5E1D8] text-xs">
                      <span className="font-bold text-[#141615]">{review.name}</span>
                      <span className="font-mono text-neutral-400 text-[11px]">{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 9. BUY OUR PRODUCTS IN STORES */}
          <section className="py-20 bg-white border-t border-[#E5E1D8]">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <span className="font-mono text-xs font-bold text-[#FF5A26] tracking-widest uppercase block mb-2">
                [ WHERE TO BUY? ]
              </span>
              <h2 className="text-3xl font-black tracking-tight text-[#141615] mb-12">
                Buy our products in stores
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {[
                  {
                    badge: "[ STORE 1 ]",
                    address: "Carrer de Mallorca, 123, 08036",
                    city: "Barcelona, Spain",
                    phone: "+34 123 456 789"
                  },
                  {
                    badge: "[ STORE 2 ]",
                    address: "123 Oxford Street, London W1D 1LU",
                    city: "United Kingdom",
                    phone: "+44 20 1234 5678"
                  }
                ].map((store, i) => (
                  <div key={i} className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E5E1D8] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#E5E1D8] flex items-center justify-center text-[#FF5A26] flex-shrink-0 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] font-bold text-[#FF5A26] uppercase mb-1">{store.badge}</div>
                      <div className="font-bold text-sm text-[#141615]">{store.address}</div>
                      <div className="text-xs text-neutral-500 mb-2">{store.city}</div>
                      <div className="text-xs font-mono text-neutral-400">{store.phone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =========================================================================
          PAGE 2: SHOP ALL FORMULATIONS (With dynamic filtering)
          ========================================================================= */}
      {activePage === "shop" && (
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-10">
              <span className="font-mono text-xs font-bold text-[#FF5A26] tracking-widest uppercase block mb-1">
                [ CATALOG • 14 FORMULAS ]
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#141615] mb-3">
                All Formulations
              </h1>
              <p className="text-sm text-neutral-500 max-w-xl">
                Bio-compatible skin barrier formulas developed with physiological pH (5.2 - 5.8) to clarify, restore, and preserve elasticity.
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6 border-b border-[#E5E1D8]">
              {[
                { id: "all", label: "All Formulations" },
                { id: "cleanser", label: "Cleansers" },
                { id: "serum", label: "Serums" },
                { id: "moisturizer", label: "Moisturizers" },
                { id: "sunscreen", label: "Sunscreens" },
                { id: "mask", label: "Masks" },
                { id: "sets", label: "Curated Sets" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setShopCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
                    shopCategory === tab.id
                      ? "bg-[#141615] text-white"
                      : "bg-white border border-[#E5E1D8] text-neutral-600 hover:border-[#141615]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Concern Filters & Sort Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 bg-white p-4 rounded-xl border border-[#E5E1D8]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mr-2">
                  Concern:
                </span>
                {["all", "Acne-prone", "Dry skin", "Oily skin", "Sensitive", "Anti-aging", "Dullness"].map((concern) => (
                  <button
                    key={concern}
                    onClick={() => setShopConcern(concern)}
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition ${
                      shopConcern === concern
                        ? "bg-[#FF5A26] text-white"
                        : "bg-[#FAF8F5] text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {concern === "all" ? "All" : concern}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">Sort:</span>
                <select
                  value={shopSort}
                  onChange={(e) => setShopSort(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#E5E1D8] text-xs font-semibold rounded-lg px-3 py-1.5 cursor-pointer outline-none"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Alphabetical: A-Z</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={p.id}
                  className="bg-white border border-[#E5E1D8] rounded-xl overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-1 transition duration-200"
                >
                  <div
                    onClick={() => setSelectedProduct(p)}
                    className="bg-gradient-to-b from-[#FAF8F5] to-[#EDE8DE] p-8 flex items-center justify-center cursor-pointer min-h-[220px]"
                  >
                    <div className="w-28 h-36 group-hover:scale-105 transition duration-300">
                      <ProductVisual
                        svgType={p.svgType}
                        accentColor={p.accentColor}
                        accentHighlight={p.accentHighlight}
                      />
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <span className="font-mono text-[10px] text-[#FF5A26] font-bold uppercase tracking-wider mb-1">
                      [ {p.categoryLabel} ]
                    </span>
                    <h4
                      onClick={() => setSelectedProduct(p)}
                      className="font-bold text-sm tracking-tight text-[#141615] group-hover:text-[#FF5A26] transition cursor-pointer mb-1 truncate"
                    >
                      {p.name}
                    </h4>
                    <div className="text-[11px] text-neutral-400 mb-2">{p.size}</div>

                    <div className="flex gap-1.5 flex-wrap mb-4">
                      {p.concerns.map((c) => (
                        <span key={c} className="text-[10px] bg-[#FAF8F5] border border-[#E5E1D8] px-2 py-0.5 rounded text-neutral-500">
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-[#E5E1D8] flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-[#FF5A26]">${p.price}</span>
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="bg-[#141615] hover:bg-[#FF5A26] text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full transition"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          PAGE 3: ABOUT & CLINICAL SCIENCE
          ========================================================================= */}
      {activePage === "about" && (
        <main className="flex-1 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <span className="font-mono text-xs font-bold text-[#FF5A26] tracking-widest uppercase block mb-3">
              [ CLINICAL INTEGRITY ]
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#141615] mb-8 leading-tight">
              Science over marketing. Purity over trends.
            </h1>
            <p className="text-base text-neutral-600 leading-relaxed mb-12">
              At Minimalist, we strip away all unnecessary fillers, synthetic dyes, fragrance fixatives, and pseudo-scientific claims. We focus strictly on physiological active ingredients dosed at clinical percentages proven to regenerate the human skin moisture barrier.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white p-6 rounded-xl border border-[#E5E1D8]">
                <div className="font-mono text-xs font-bold text-[#FF5A26] mb-2">01. BIOMIMETIC</div>
                <p className="text-xs text-neutral-600">
                  Formulated to closely emulate natural lipid bilayers with balanced 5.2-5.8 pH levels.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-[#E5E1D8]">
                <div className="font-mono text-xs font-bold text-[#FF5A26] mb-2">02. TRANSPARENT</div>
                <p className="text-xs text-neutral-600">
                  Full active percentages disclosed on every bottle. Zero hidden fillers or proprietary camouflage.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-[#E5E1D8]">
                <div className="font-mono text-xs font-bold text-[#FF5A26] mb-2">03. CRUELTY-FREE</div>
                <p className="text-xs text-neutral-600">
                  Leaping Bunny certified, 100% vegan formulations using plant-derived sugarcane squalane.
                </p>
              </div>
            </div>

            {/* In Vitro Data Review */}
            <div className="bg-[#141615] text-white p-8 sm:p-12 rounded-3xl mb-12">
              <span className="font-mono text-xs text-[#FF5A26] font-bold tracking-widest uppercase block mb-2">
                [ IN VITRO VALIDATION ]
              </span>
              <h3 className="text-2xl font-bold mb-4">Reconstructed Epidermis Stress Test</h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-8">
                Samples treated with our multi-ceramide matrix demonstrated a +22.9% reduction in transepidermal moisture loss after acute solvent-induced barrier disruption.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 font-mono">
                <div>
                  <div className="text-3xl font-extrabold text-[#FF5A26]">+22.9%</div>
                  <div className="text-[11px] text-neutral-400">Tensile Barrier Strength</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white">40%</div>
                  <div className="text-[11px] text-neutral-400">Hydration Depth Retention</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          PAGE 4: STORES & CUSTOMER CARE (FAQ matches Knowledge Base)
          ========================================================================= */}
      {activePage === "contact" && (
        <main className="flex-1 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <span className="font-mono text-xs font-bold text-[#FF5A26] tracking-widest uppercase block mb-3">
              [ LOCATIONS &amp; POLICIES ]
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#141615] mb-12">
              Customer Support &amp; Stores
            </h1>

            {/* Flagship Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="bg-white p-6 rounded-xl border border-[#E5E1D8]">
                <span className="font-mono text-xs text-[#FF5A26] font-bold block mb-1">[ BARCELONA ]</span>
                <h4 className="font-bold text-base text-[#141615]">Carrer de Mallorca, 123</h4>
                <p className="text-xs text-neutral-500 mb-4">08036 Barcelona, Spain</p>
                <div className="text-xs font-mono text-neutral-400">+34 123 456 789</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-[#E5E1D8]">
                <span className="font-mono text-xs text-[#FF5A26] font-bold block mb-1">[ LONDON ]</span>
                <h4 className="font-bold text-base text-[#141615]">123 Oxford Street</h4>
                <p className="text-xs text-neutral-500 mb-4">London W1D 1LU, United Kingdom</p>
                <div className="text-xs font-mono text-neutral-400">+44 20 1234 5678</div>
              </div>
            </div>

            {/* Knowledge Base FAQs */}
            <h3 className="text-2xl font-black tracking-tight text-[#141615] mb-6">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              {[
                {
                  q: "What are your shipping rates and delivery times?",
                  a: "Free Standard Shipping on orders over $50 ($5 flat rate under $50). Delivery takes 3 to 5 business days. Express 1-2 day delivery is available for $15."
                },
                {
                  q: "Can I return an opened product if I have a skin reaction?",
                  a: "Yes. Unopened items can be returned within 30 days. Furthermore, if an opened product causes an adverse reaction, you are fully covered for a refund or replacement within 30 days of delivery."
                },
                {
                  q: "Can I use Vitamin C and Retinol together?",
                  a: "Do not combine them in the same application step. Apply Glow Vitamin C Serum in the morning followed by Daily Shield SPF 50. Use Renew Retinol 0.3% Night Serum strictly in the evening."
                },
                {
                  q: "Are all formulations cruelty-free and vegan?",
                  a: "100% Leaping Bunny certified cruelty-free and vegan. We never test on animals at any stage of development, and our squalane is derived purely from sugarcane."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-[#E5E1D8]">
                  <h4 className="font-bold text-sm text-[#141615] mb-2">{faq.q}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* FOOTER (Exact Blueprint Dark Footer from Reference) */}
      <footer className="bg-[#141615] text-neutral-400 pt-16 pb-8 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-[10vw] font-black tracking-tighter text-neutral-800 leading-none select-none uppercase mb-12 text-center">
            Minimalist
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-12 border-b border-white/10 text-xs">
            <div className="flex flex-col gap-3 font-semibold uppercase tracking-wider text-neutral-300">
              <button onClick={() => { setActivePage("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-white">About Us</button>
              <button onClick={() => { setActivePage("shop"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-white">Shop Formulas</button>
              <button onClick={() => { setActivePage("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-white">Technology &amp; In Vitro</button>
            </div>

            <div className="flex flex-col gap-3 font-semibold uppercase tracking-wider text-neutral-300">
              <button onClick={() => { setActivePage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-white">Store Locator</button>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Twitter / X</a>
            </div>

            <div className="flex justify-end opacity-40">
              {/* Bottle outlines blueprint */}
              <svg viewBox="0 0 260 90" className="w-56 h-20">
                <rect x="10" y="25" width="38" height="60" rx="4" fill="none" stroke="#778079" strokeWidth="1.5"/>
                <rect x="22" y="10" width="14" height="15" fill="none" stroke="#778079" strokeWidth="1.5"/>
                <rect x="65" y="15" width="34" height="70" rx="4" fill="none" stroke="#778079" strokeWidth="1.5"/>
                <rect x="115" y="35" width="55" height="50" rx="8" fill="none" stroke="#778079" strokeWidth="1.5"/>
                <path d="M190 20 L230 20 L220 85 L200 85 Z" fill="none" stroke="#778079" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-neutral-500 pt-8 gap-4">
            <div>&copy; 2026 Minimalist. All rights reserved.</div>
            <div>Localhost 5500 Preview • High-End Minimalist UI/UX</div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer & Product Modal */}
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
