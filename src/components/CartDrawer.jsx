import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { ProductVisual } from "./ProductVisual";

export function CartDrawer({ isOpen, onClose, cart, onUpdateQty, onRemove, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const threshold = 50;
  const progressPct = Math.min(100, Math.round((subtotal / threshold) * 100));
  const diff = (threshold - subtotal).toFixed(2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-[#E5E1D8]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E5E1D8] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#FF5A26]" />
                <h3 className="font-extrabold text-lg tracking-tight uppercase">Shopping Bag</h3>
                <span className="font-mono text-xs bg-[#141615] text-white px-2 py-0.5 rounded-full">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="bg-[#FAF8F5] p-5 border-b border-[#E5E1D8]">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span>{subtotal >= threshold ? "Free Standard Shipping Unlocked!" : `Add $${diff} for Free Shipping`}</span>
                <span className="font-mono text-[#FF5A26]">{progressPct}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E1D8] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-[#FF5A26]"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E5E1D8]">
              {cart.length === 0 ? (
                <div className="py-20 text-center text-neutral-400">
                  <p className="text-sm">Your bag is empty.</p>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="py-4 first:pt-0 last:pb-0 flex items-center gap-4"
                  >
                    <div className="w-16 h-20 bg-[#FAF8F5] rounded border border-[#E5E1D8] p-1 flex items-center justify-center flex-shrink-0">
                      <ProductVisual
                        svgType={product.svgType}
                        accentColor={product.accentColor}
                        accentHighlight={product.accentHighlight}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm tracking-tight truncate text-[#141615]">
                        {product.name}
                      </h4>
                      <p className="text-xs text-neutral-500 mb-2">{product.size}</p>
                      <div className="inline-flex items-center border border-[#E5E1D8] rounded-full px-2 py-0.5 gap-2">
                        <button
                          onClick={() => onUpdateQty(product.id, quantity - 1)}
                          className="hover:text-[#FF5A26] transition p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold w-4 text-center">{quantity}</span>
                        <button
                          onClick={() => onUpdateQty(product.id, quantity + 1)}
                          className="hover:text-[#FF5A26] transition p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1">
                      <span className="font-mono font-bold text-sm text-[#FF5A26]">
                        ${product.price * quantity}
                      </span>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="text-[11px] text-neutral-400 hover:text-red-600 underline transition"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            <div className="p-6 pb-24 sm:pb-6 border-t border-[#E5E1D8] bg-white">
              <div className="flex justify-between items-center text-xs text-neutral-500 mb-2">
                <span>Shipping</span>
                <span>{subtotal >= threshold ? "Free" : "Calculated next"}</span>
              </div>
              <div className="flex justify-between items-baseline mb-5 pt-2 border-t border-dashed border-[#E5E1D8]">
                <span className="font-bold text-base uppercase tracking-tight">Subtotal</span>
                <span className="font-mono font-extrabold text-xl text-[#141615]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-[#141615] hover:bg-[#FF5A26] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full flex items-center justify-center gap-2 transition duration-200"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
