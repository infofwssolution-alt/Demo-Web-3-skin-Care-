import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Sparkles, 
  Scan
} from "lucide-react";
import confetti from "canvas-confetti";
import { PRODUCTS } from "./data/products";
import { ProductVisual } from "./components/ProductVisual";
import { CartDrawer } from "./components/CartDrawer";
import { ProductModal } from "./components/ProductModal";

export default function App() {
  const [activeNav, setActiveNav] = useState("Explore");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [cart, setCart] = useState([
    { product: PRODUCTS[3], quantity: 1 }
  ]);

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
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    alert("Demo Mode: Checkout is simulated for this showcase.");
  };

  const startSkinAnalysis = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
    }, 2800);
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-[#141615] flex flex-col font-sans selection:bg-[#EADBFF] selection:text-[#5B32A3] overflow-x-hidden">
      
      {/* =========================================================================
          HERO SECTION (FULLSCREEN VIDEO BACKGROUND WITH FLOATING OVERLAYS)
          ========================================================================= */}
      <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden">
        
        {/* 1. THE FULLSCREEN VIDEO BACKGROUND */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle vignette/contrast gradient so texts remain ultra-crisp */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-white/90 sm:from-white/90 sm:via-transparent sm:to-white/80 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </div>

        {/* 2. TOP FLOATING NAVIGATION BAR */}
        <header className="relative z-30 w-full">
          <div className="max-w-[1520px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center text-[#9370DB]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bold text-2xl tracking-tight text-[#141615]">
                Nuvé
              </span>
            </div>

            {/* Center Navigation Links (Frosted pill) */}
            <nav className="hidden lg:flex items-center gap-8 bg-white/70 backdrop-blur-md px-7 py-3 rounded-full border border-white/60 shadow-sm">
              {["Explore", "Your Skin", "Transformations", "AI Guidance", "Philosophy"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`text-sm transition duration-150 ${
                    activeNav === item ? "text-[#141615] font-bold" : "text-[#555957] hover:text-[#141615] font-medium"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 bg-white/80 backdrop-blur-md rounded-full border border-white/80 text-[#141615] hover:text-[#9370DB] transition shadow-sm mr-1"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartTotalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#141615] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-bold">
                    {cartTotalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  const faqSec = document.getElementById("faq-section");
                  if (faqSec) faqSec.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-[#D5D8D6] bg-white/80 backdrop-blur-md hover:border-[#141615] text-xs font-semibold text-[#141615] transition shadow-sm"
              >
                Contact Us
              </button>

              <a
                href="#app"
                className="inline-flex items-center gap-2 bg-[#0E100F] hover:bg-[#202422] text-white px-4 py-2 rounded-xl transition shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.07 1.71-.94 2.73 1.01.08 2.05-.48 2.66-1.23z"/>
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[8px] uppercase tracking-wider text-neutral-300">Download on the</div>
                  <div className="text-xs font-semibold tracking-tight">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </header>

        {/* 3. CENTER & SIDES OVERLAY CONTENT */}
        <div className="relative z-20 max-w-[1520px] mx-auto px-6 lg:px-12 w-full my-auto py-12">
          
          {/* Top Left User Pill */}
          <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md border border-white/80 rounded-full px-4 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-8">
            <div className="flex -space-x-1.5 overflow-hidden">
              <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-200 to-amber-400 border-2 border-white inline-block shadow-sm" />
              <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-300 to-rose-400 border-2 border-white inline-block shadow-sm" />
              <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-stone-400 to-stone-600 border-2 border-white inline-block shadow-sm" />
            </div>
            <span className="text-xs text-[#2A2E2C]">
              Trusted by <strong className="font-bold text-[#141615]">10,000+ users</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Headline & Action */}
            <div className="lg:col-span-5 max-w-lg">
              <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight text-[#141615] leading-[1.02] mb-6">
                Unlock <br />
                your skin's <br />
                potential
              </h1>
              <p className="text-base text-[#4C524F] font-medium leading-relaxed max-w-sm mb-8">
                Our AI scans your face and shows what can be improved
              </p>

              <button
                onClick={startSkinAnalysis}
                disabled={isScanning}
                className="bg-[#EFE9FC] hover:bg-[#E4D9FA] text-[#141615] font-semibold text-sm px-8 py-4 rounded-xl transition duration-200 shadow-sm flex items-center gap-2 group"
              >
                <span>{isScanning ? "Scanning Matrix..." : "Analyze Skin"}</span>
                <Sparkles className="w-4 h-4 text-[#7C52C2] group-hover:rotate-12 transition transform" />
              </button>

              {scanComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3.5 bg-white/95 backdrop-blur-md border border-[#E5E1D8] rounded-xl text-xs text-[#141615] flex items-center gap-2.5 shadow-lg"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                  <span>AI Scan Complete: 3 targeted routine matches generated below.</span>
                </motion.div>
              )}
            </div>

            {/* Spacer for the video face in the center */}
            <div className="lg:col-span-4 h-64 sm:h-96 pointer-events-none" />

            {/* Right Metric Cards (Glassy floating tiles) */}
            <div className="lg:col-span-3 space-y-6 flex flex-col items-start lg:items-end">
              
              {/* Metric 1 */}
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] w-full max-w-[260px]">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#EDEDEB] shadow-sm flex items-center justify-center text-[#2A2E2C] flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight text-[#141615]">95%</div>
                  <div className="text-[11px] text-[#686D6A] leading-tight">accurate skin analysis</div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] w-full max-w-[260px]">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#EDEDEB] shadow-sm flex items-center justify-center text-[#2A2E2C] flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
                    <circle cx="9" cy="12" r="6"/>
                    <circle cx="15" cy="12" r="6"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight text-[#141615]">30+</div>
                  <div className="text-[11px] text-[#686D6A] leading-tight">skin concerns analyzed</div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] w-full max-w-[260px]">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#EDEDEB] shadow-sm flex items-center justify-center text-[#2A2E2C] flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
                    <ellipse cx="12" cy="6" rx="8" ry="3"/>
                    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
                    <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight text-[#141615]">7-day</div>
                  <div className="text-[11px] text-[#686D6A] leading-tight">personalized routine</div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 4. SCANNING HUD BOXES (Positioned over the face across the screen) */}
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-square">
            
            {/* Laser Line */}
            {isScanning && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#9370DB] to-transparent shadow-[0_0_20px_#9370DB] z-30"
              />
            )}

            {/* Box 1: Forehead (Oiliness / Shine) */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              className="absolute top-[26%] right-[24%] pointer-events-auto cursor-pointer group"
              onClick={() => setSelectedProduct(PRODUCTS[3])}
            >
              <div className="w-24 h-20 border border-white/95 bg-white/20 backdrop-blur-sm p-2 flex flex-col justify-between shadow-lg relative group-hover:border-[#9370DB] group-hover:bg-white/30 transition">
                <div className="w-1.5 h-1.5 bg-white rounded-full group-hover:bg-[#9370DB]" />
                <div className="text-[10px] font-bold text-white tracking-tight leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  Oiliness<br />/ Shine
                </div>
              </div>
            </motion.div>

            {/* Box 2: Under-Eye (Fine Lines) */}
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut", delay: 0.4 }}
              className="absolute top-[46%] right-[14%] pointer-events-auto cursor-pointer group"
              onClick={() => setSelectedProduct(PRODUCTS[5])}
            >
              <div className="w-28 h-20 border border-white/95 bg-white/20 backdrop-blur-sm p-2 flex flex-col justify-between shadow-lg relative group-hover:border-[#9370DB] group-hover:bg-white/30 transition">
                <div className="w-1.5 h-1.5 bg-white rounded-full group-hover:bg-[#9370DB]" />
                <div className="text-[10px] font-bold text-white tracking-tight leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  Fine<br />Lines
                </div>
              </div>
            </motion.div>

            {/* Box 3: Cheek (Enlarged Pores) */}
            <motion.div
              animate={{ y: [0, -2.5, 0] }}
              transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut", delay: 0.8 }}
              className="absolute bottom-[24%] left-[22%] pointer-events-auto cursor-pointer group"
              onClick={() => setSelectedProduct(PRODUCTS[1])}
            >
              <div className="w-24 h-20 border border-white/95 bg-white/20 backdrop-blur-sm p-2 flex flex-col justify-between shadow-lg relative group-hover:border-[#9370DB] group-hover:bg-white/30 transition">
                <div className="w-1.5 h-1.5 bg-white rounded-full group-hover:bg-[#9370DB]" />
                <div className="text-[10px] font-bold text-white tracking-tight leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  Enlarged<br />Pores
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: AI FORMULATIONS CATALOG
          ========================================================================= */}
      <section className="py-24 bg-white border-t border-[#F0EFEA] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#9370DB] tracking-widest uppercase block mb-1">
                AI MATCHED BIOACTIVES
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141615]">
                Targeted Skincare Formulations
              </h2>
            </div>
            <p className="text-xs text-[#686D6A] max-w-sm mt-2 md:mt-0">
              Formulated at physiological pH levels (5.2 - 5.8) to address oiliness, pores, and cellular moisture loss.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[PRODUCTS[3], PRODUCTS[1], PRODUCTS[5], PRODUCTS[6]].map((product) => (
              <div
                key={product.id}
                className="bg-[#FAF9F7] border border-[#EBE8E1] rounded-2xl p-6 flex flex-col group hover:shadow-lg hover:-translate-y-1 transition duration-200"
              >
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="w-full aspect-[4/5] bg-white rounded-xl p-6 flex items-center justify-center cursor-pointer shadow-sm mb-4"
                >
                  <div className="w-24 h-32 group-hover:scale-105 transition duration-200">
                    <ProductVisual
                      svgType={product.svgType}
                      accentColor={product.accentColor}
                      accentHighlight={product.accentHighlight}
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="text-[10px] font-semibold tracking-wider uppercase text-[#9370DB] mb-1">
                    {product.categoryLabel}
                  </div>
                  <h3
                    onClick={() => setSelectedProduct(product)}
                    className="font-bold text-base text-[#141615] group-hover:text-[#9370DB] transition cursor-pointer mb-1 line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#686D6A] mb-4 line-clamp-2 leading-relaxed">
                    {product.summary}
                  </p>

                  <div className="mt-auto pt-3 border-t border-[#E8E5DD] flex items-center justify-between">
                    <span className="font-bold text-base text-[#141615]">${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#141615] hover:bg-[#9370DB] text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
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

      {/* =========================================================================
          SECTION 3: FAQ
          ========================================================================= */}
      <section id="faq-section" className="py-20 bg-[#FAF9F7] border-t border-[#F0EFEA] relative z-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#9370DB] tracking-widest uppercase block mb-1">
              SUPPORT &amp; POLICIES
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#141615]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What are your shipping rates and delivery times?",
                a: "Free Standard Shipping on orders over $50 ($5 flat rate under $50). Delivery takes 3 to 5 business days. Express shipping delivers in 1 to 2 business days for $15."
              },
              {
                q: "Can I return an opened product if I have an adverse reaction?",
                a: "Yes. Unopened items can be returned within 30 days. If an opened product caused a skin reaction or irritation, you are also eligible for a full refund or exchange within 30 days of delivery."
              },
              {
                q: "Can I use Vitamin C and Retinol together?",
                a: "We recommend separating them. Apply Glow Vitamin C Serum in the morning on cleansed skin, followed by Daily Shield SPF 50. Apply Renew Retinol 0.3% Night Serum strictly in the evening."
              },
              {
                q: "Are all products 100% cruelty-free and vegan?",
                a: "Yes. Nuvé is proudly Leaping Bunny certified cruelty-free. We never test on animals, and all formulas are 100% vegan with sugarcane-derived squalane."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#EAE8E1] shadow-sm">
                <h3 className="font-bold text-sm text-[#141615] mb-2">{faq.q}</h3>
                <p className="text-xs text-[#686D6A] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#F0EFEA] py-12 text-xs text-[#686D6A] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#141615]">Nuvé Skin Labs</span>
            <span>&copy; 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-[#141615]">Privacy Policy</a>
            <a href="#" className="hover:text-[#141615]">Terms of Service</a>
            <a href="#" className="hover:text-[#141615]">Security</a>
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
