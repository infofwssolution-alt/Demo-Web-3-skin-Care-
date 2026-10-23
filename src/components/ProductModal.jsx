import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, AlertCircle } from "lucide-react";
import { ProductVisual } from "./ProductVisual";

export function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl border border-[#E5E1D8] overflow-hidden relative max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur border border-[#E5E1D8] flex items-center justify-center text-[#141615] hover:bg-[#141615] hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Visual Side */}
              <div className="md:w-5/12 bg-gradient-to-br from-[#FAF8F5] to-[#EFECE6] p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#E5E1D8]">
                <div className="w-48 h-64 drop-shadow-xl">
                  <ProductVisual
                    svgType={product.svgType}
                    accentColor={product.accentColor}
                    accentHighlight={product.accentHighlight}
                  />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mt-4">
                  Dermatologically Evaluated
                </span>
              </div>

              {/* Details Side */}
              <div className="md:w-7/12 p-8 overflow-y-auto flex flex-col">
                <span className="font-mono text-xs font-bold text-[#FF5A26] uppercase tracking-wider mb-1">
                  [ {product.categoryLabel} ]
                </span>

                <h3 className="text-2xl font-black tracking-tight text-[#141615] mb-2">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-2xl font-bold text-[#141615]">
                    ${product.price}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">
                    {product.size}
                  </span>
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Key Ingredients */}
                <div className="mb-5">
                  <div className="font-mono text-xs uppercase tracking-wider font-bold text-[#141615] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF5A26]" />
                    <span>Bioactive Complexes</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-600 bg-[#F7F6F3] p-3 rounded-lg border border-[#E5E1D8]">
                    {product.keyIngredients.map((ing, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF5A26] flex-shrink-0 mt-0.5" />
                        <span><strong>{ing.name}:</strong> {ing.benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Usage Note */}
                <div className="text-xs bg-[#FAF8F5] border-l-2 border-[#FF5A26] p-3 rounded-r-lg mb-6 text-neutral-700">
                  <strong className="block text-[#141615] font-bold mb-0.5">How to Apply:</strong>
                  {product.howToUse}
                </div>

                {/* Compatibility notes if any */}
                {product.avoidNotes && (
                  <div className="flex items-center gap-2 text-[11px] text-amber-800 bg-amber-50 border border-amber-200 p-2.5 rounded-lg mb-6">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{product.avoidNotes}</span>
                  </div>
                )}

                {/* Action button */}
                <div className="mt-auto pt-4 border-t border-[#E5E1D8]">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="w-full bg-[#141615] hover:bg-[#FF5A26] text-white text-xs font-bold uppercase tracking-wider py-4 rounded-full transition duration-200 shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Add to Bag • ${product.price}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
