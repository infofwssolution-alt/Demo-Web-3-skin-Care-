const PRODUCTS = [
  {
    id: "gentle-cloud-cleanser",
    name: "Gentle Cloud Cleanser",
    category: "cleanser",
    categoryLabel: "Cleanser",
    price: 18,
    size: "150 ml / 5.1 fl. oz.",
    skinTypes: ["Dry", "Sensitive", "Normal"],
    concerns: ["Dry skin", "Sensitive"],
    summary: "A cushiony, non-foaming cream-gel cleanser that removes impurities without stripping delicate moisture barriers.",
    description: "Gentle Cloud Cleanser is formulated to respect and soothe stressed, delicate skin. It sweeps away sunscreen, light makeup, and daily impurities while replenishing natural lipids with colloidal oat extract and botanical ceramides. Skin feels soft, supple, and calm after every wash.",
    keyIngredients: [
      { name: "Colloidal Oat Extract", benefit: "Soothes visible irritation and supports skin comfort." },
      { name: "Ceramide NP", benefit: "Helps preserve the natural lipid barrier against moisture loss." },
      { name: "Glycerin & Panthenol", benefit: "Delivers weightless humectant hydration." }
    ],
    howToUse: "Morning and evening, massage 1-2 pumps onto damp skin using gentle circular motions. Rinse thoroughly with lukewarm water. Pat dry with a clean towel.",
    compatibility: "Suitable for twice-daily use and safe to pair with all active serums (including vitamin C, niacinamide, and retinol).",
    avoidNotes: "None under normal conditions. Always patch-test prior to initial use if you have hypersensitive skin.",
    svgType: "pump-bottle",
    badge: "Bestseller",
    accentColor: "#E8DED2",
    accentHighlight: "#D4C5B3"
  },
  {
    id: "clear-balance-gel-cleanser",
    name: "Clear Balance Gel Cleanser",
    category: "cleanser",
    categoryLabel: "Cleanser",
    price: 19,
    size: "150 ml / 5.1 fl. oz.",
    skinTypes: ["Oily", "Acne-prone", "Combination"],
    concerns: ["Acne-prone", "Oily skin"],
    summary: "A refreshing foaming gel with tea tree extract and gentle zinc PCA to clear excess oil and purify pores.",
    description: "Engineered specifically for congested and shine-prone complexions, Clear Balance Gel Cleanser breaks down sebum and clears surface debris without leaving the skin tight or parched. Botanical tea tree hydrosol and zinc PCA clarify pores and support a balanced skin microbiome.",
    keyIngredients: [
      { name: "Zinc PCA", benefit: "Helps regulate surface shine and calms blemish-prone areas." },
      { name: "Tea Tree Hydrosol", benefit: "Naturally purifies pores and balances skin flora." },
      { name: "Green Tea Extract", benefit: "Provides antioxidant protection against environmental stressors." }
    ],
    howToUse: "Dispense a nickel-sized amount onto wet palms, lather into a gentle foam, and massage across face for 60 seconds. Rinse clean with cool or lukewarm water. Use AM and PM.",
    compatibility: "Pairs exceptionally well with Calm Niacinamide 10% Serum and Weightless Water Gel. If pairing with strong resurfacing acids in the same routine, monitor skin tolerance.",
    avoidNotes: "May feel overly clarifying for very dry or severely eczema-prone skin types.",
    svgType: "gel-tube",
    badge: "Purifying",
    accentColor: "#DFEBE2",
    accentHighlight: "#BDD4C3"
  },
  {
    id: "glow-vitamin-c-serum",
    name: "Glow Vitamin C Serum",
    category: "serum",
    categoryLabel: "Serum",
    price: 34,
    size: "30 ml / 1.0 fl. oz.",
    skinTypes: ["All Skin Types", "Normal", "Combination", "Dry"],
    concerns: ["Dullness", "Anti-aging"],
    summary: "A stabilized 15% antioxidant complex of vitamin C, ferulic acid, and kakadu plum to illuminate uneven tone.",
    description: "Glow Vitamin C Serum revitalizes lackluster complexions, boosts natural radiance, and shields the skin against daily oxidative damage. Formulated with stabilized ethyl ascorbic acid and soothing botanicals, it absorbs instantly without any sticky residue.",
    keyIngredients: [
      { name: "15% Stabilized Vitamin C (Ethyl Ascorbic Acid)", benefit: "Brightens dull skin and supports a luminous, even tone." },
      { name: "Ferulic Acid", benefit: "Stabilizes active antioxidants and amplifies photoprotective benefits." },
      { name: "Kakadu Plum Extract", benefit: "Potent botanical source of natural vitamin C and polyphenol antioxidants." }
    ],
    howToUse: "Apply 3-4 drops to cleansed, dry skin every morning. Gently press into face, neck, and décolletage. Follow with moisturizer and always finish with sunscreen.",
    compatibility: "Recommended for morning use. Pair with Daily Shield SPF 50 for enhanced defense against UV-induced free radicals.",
    avoidNotes: "Do NOT combine with Renew Retinol 0.3% Night Serum in the same morning/evening step. Use Vitamin C in the morning and Retinol at night.",
    svgType: "dropper-bottle",
    badge: "Radiance",
    accentColor: "#F8EBD7",
    accentHighlight: "#E7CCA8"
  },
  {
    id: "calm-niacinamide-serum",
    name: "Calm Niacinamide 10% Serum",
    category: "serum",
    categoryLabel: "Serum",
    price: 28,
    size: "30 ml / 1.0 fl. oz.",
    skinTypes: ["Oily", "Acne-prone", "Combination", "Sensitive"],
    concerns: ["Acne-prone", "Oily skin", "Sensitive"],
    summary: "Concentrated 10% niacinamide paired with 1% zinc PCA and centella asiatica to refine pores and minimize redness.",
    description: "A lightweight, silk-finish serum designed to balance oil production, visibly tighten enlarged pores, and calm stubborn post-blemish redness. Centella Asiatica (cica) provides immediate relief to irritated skin while niacinamide strengthens the moisture barrier.",
    keyIngredients: [
      { name: "10% Niacinamide (Vitamin B3)", benefit: "Refines pore appearance, evens tone, and balances oil production." },
      { name: "1% Zinc PCA", benefit: "Targeted control for excess surface sebum and blemish flare-ups." },
      { name: "Centella Asiatica (Cica)", benefit: "Calms visible redness and comforts reactive skin." }
    ],
    howToUse: "Dispense 3-4 drops onto clean fingertips and press gently into face and neck. Can be used morning and evening before creams.",
    compatibility: "Extremely versatile. Pairs comfortably with hyaluronic acid, moisturizers, and sunscreens. Can be used in the evening before retinol to buffer sensitivity.",
    avoidNotes: "Generally very well tolerated. Those with extreme sensitivities to high-potency niacinamide should patch-test first.",
    svgType: "dropper-bottle",
    badge: "Clarifying",
    accentColor: "#E2ECE5",
    accentHighlight: "#BED3C4"
  },
  {
    id: "hydra-hyaluronic-serum",
    name: "Hydra Hyaluronic Serum",
    category: "serum",
    categoryLabel: "Serum",
    price: 30,
    size: "30 ml / 1.0 fl. oz.",
    skinTypes: ["All Skin Types", "Dry", "Dehydrated", "Sensitive", "Oily"],
    concerns: ["Dry skin", "Dullness", "Sensitive"],
    summary: "A multi-molecular weight hyaluronic acid serum delivering multi-layer plumping hydration to thirsty skin.",
    description: "Hydra Hyaluronic Serum quenches deep dehydration by combining three molecular weights of hyaluronic acid with replenishing provitamin B5 (panthenol). It instantly smooths fine dryness lines and creates a bouncy, dewy foundation for subsequent skincare.",
    keyIngredients: [
      { name: "Multi-Weight Hyaluronic Acid Complex", benefit: "Penetrates varying skin depths for sustained surface and deep moisture." },
      { name: "Provitamin B5 (Panthenol)", benefit: "Attracts water molecules and reinforces barrier flexibility." },
      { name: "Snow Mushroom Extract (Tremella)", benefit: "Natural polysaccharide that locks in moisture." }
    ],
    howToUse: "Apply 3-4 drops onto slightly damp skin immediately following cleansing. Pat until absorbed, then lock in moisture with your favorite cream or gel.",
    compatibility: "Universal compatibility. Can be layered underneath any serum, cream, or active treatment both morning and night.",
    avoidNotes: "Always follow with a moisturizer to seal hydration inside the skin barrier, especially in dry climates.",
    svgType: "dropper-bottle",
    badge: "Hydrating",
    accentColor: "#DEEEF4",
    accentHighlight: "#BADAE6"
  },
  {
    id: "renew-retinol-serum",
    name: "Renew Retinol 0.3% Night Serum",
    category: "serum",
    categoryLabel: "Serum",
    price: 38,
    size: "30 ml / 1.0 fl. oz.",
    skinTypes: ["Normal", "Dry", "Combination", "Oily"],
    concerns: ["Anti-aging", "Dullness"],
    summary: "Time-released 0.3% encapsulated retinol with soothing squalane to smooth fine lines and refine texture overnight.",
    description: "A gentle yet targeted evening serum designed to accelerate surface cellular turnover, smooth the appearance of fine lines, and firm aging skin. Encapsulation technology delivers pure retinol gradually into the skin overnight, reducing the flaking and redness often associated with retinoids.",
    keyIngredients: [
      { name: "0.3% Encapsulated Retinol", benefit: "Gradually releases active vitamin A to smooth texture and diminish fine lines." },
      { name: "Plant-Derived Squalane", benefit: "Emollient barrier buffer that cushions skin against dryness." },
      { name: "Bisabolol (Chamomile Extract)", benefit: "Soothes skin reactivity and counters irritation." }
    ],
    howToUse: "EVENING USE ONLY. Start by using 1-2 drops twice a week on dry skin, gradually increasing to alternate nights as tolerated. Follow with Cloud Barrier Cream.",
    compatibility: "Do NOT pair with Vitamin C, AHA/BHA exfoliants, or strong physical scrubs on the same evening. Always use Daily Shield SPF 50 during daytime while using retinol products.",
    avoidNotes: "Not recommended for hypersensitive, eczema-compromised skin, or broken skin. If pregnant or nursing, do not use retinol without consulting your physician first.",
    svgType: "dropper-bottle",
    badge: "Night Renewal",
    accentColor: "#E9E0EC",
    accentHighlight: "#CFBED4"
  },
  {
    id: "cloud-barrier-cream",
    name: "Cloud Barrier Cream",
    category: "moisturizer",
    categoryLabel: "Moisturizer",
    price: 32,
    size: "50 ml / 1.7 oz.",
    skinTypes: ["Dry", "Sensitive", "Normal"],
    concerns: ["Dry skin", "Sensitive", "Anti-aging"],
    summary: "A rich, velvety cream infused with a 5-ceramide complex, squalane, and fatty acids to restore fragile moisture barriers.",
    description: "Cloud Barrier Cream wraps stressed, parched skin in a deeply restorative moisture veil. Engineered with skin-identical lipids, ceramides, and cholesterol, it seals micro-cracks in compromised barriers, soothes dryness flakes, and provides round-the-clock comfort.",
    keyIngredients: [
      { name: "5-Ceramide Biomimetic Complex (EOP, NS, NP, AS, AP)", benefit: "Replenishes essential barrier lipids." },
      { name: "Pure Plant Squalane", benefit: "Softens rough texture and seals in deep hydration." },
      { name: "Colloidal Oatmeal", benefit: "Relieves itching and tight discomfort from dry skin." }
    ],
    howToUse: "Warm a dime-sized amount between clean fingertips and press gently into face and neck. Ideal as the finishing moisturizer in morning and evening routines.",
    compatibility: "Excellent as a recovery buffer over Renew Retinol 0.3% Night Serum. Compatible with all gentle cleansers and hydrators.",
    avoidNotes: "May be too emollient or rich for very oily or congested, acne-prone t-zones during hot humid months.",
    svgType: "cream-jar",
    badge: "Barrier Rescue",
    accentColor: "#F4EDE4",
    accentHighlight: "#E2D3C0"
  },
  {
    id: "weightless-water-gel",
    name: "Weightless Water Gel",
    category: "moisturizer",
    categoryLabel: "Moisturizer",
    price: 29,
    size: "50 ml / 1.7 oz.",
    skinTypes: ["Oily", "Combination", "Acne-prone"],
    concerns: ["Oily skin", "Acne-prone"],
    summary: "An oil-free, cooling burst moisturizer with bamboo water and aloe that hydrates without clogging pores or adding shine.",
    description: "Weightless Water Gel delivers instant, refreshing hydration in a 100% oil-free, non-comedogenic jelly formula. Upon contact with skin, it breaks into a water-light surge that absorbs in seconds, leaving an undetectable, soft-matte finish that controls midday shine.",
    keyIngredients: [
      { name: "Fermented Bamboo Water", benefit: "Supplies essential minerals and soothing hydration." },
      { name: "Aloe Leaf Juice", benefit: "Calms inflammation and provides instant cooling comfort." },
      { name: "Sodium Hyaluronate", benefit: "Binds water to surface layers without heavy emollient weight." }
    ],
    howToUse: "Smooth a blueberry-sized amount over face and neck after cleansing and serum application. Use morning and night.",
    compatibility: "Perfect partner for Clear Balance Gel Cleanser and Calm Niacinamide 10% Serum. Wears beautifully under makeup and sunscreens without pilling.",
    avoidNotes: "Dry skin types may require additional lipid richness during colder winter seasons.",
    svgType: "gel-jar",
    badge: "Oil-Free",
    accentColor: "#E2F0EA",
    accentHighlight: "#BEDBCE"
  },
  {
    id: "daily-shield-spf50",
    name: "Daily Shield SPF 50 Fluid",
    category: "sunscreen",
    categoryLabel: "Sunscreen",
    price: 26,
    size: "50 ml / 1.7 fl. oz.",
    skinTypes: ["All Skin Types", "Normal", "Combination", "Oily"],
    concerns: ["Anti-aging", "Dullness"],
    summary: "An ultra-sheer broad spectrum SPF 50 chemical fluid with invisible finish and zero white cast or greasy film.",
    description: "Daily Shield SPF 50 Fluid provides modern broad-spectrum UVA/UVB protection in an undetectable, weightless fluid. Infused with antioxidant vitamin E and white tea extract, it defends against photo-aging, dark spot formation, and environmental pollution.",
    keyIngredients: [
      { name: "Broad Spectrum UV Filters (SPF 50)", benefit: "High-level protection against UVA and UVB sunburn and photo-damage." },
      { name: "White Tea Extract", benefit: "Neutralizes free radicals triggered by pollution and sun exposure." },
      { name: "Vitamin E (Tocopherol)", benefit: "Nourishes skin and supports photostability." }
    ],
    howToUse: "Apply generously as the final step of your morning skincare routine, 15 minutes before sun exposure (two finger-lengths for face and neck). Reapply every 2 hours if outdoors.",
    compatibility: "Must be used as the daytime companion when incorporating Renew Retinol or Glow Vitamin C into your regimen.",
    avoidNotes: "For daytime use only. Rinse off thoroughly at night with Gentle Cloud Cleanser or Clear Balance Gel Cleanser.",
    svgType: "sunscreen-tube",
    badge: "Zero Cast",
    accentColor: "#FBF3E2",
    accentHighlight: "#EBDDBF"
  },
  {
    id: "mineral-sheer-spf30",
    name: "Mineral Sheer SPF 30",
    category: "sunscreen",
    categoryLabel: "Sunscreen",
    price: 27,
    size: "50 ml / 1.7 fl. oz.",
    skinTypes: ["Sensitive", "Reactive", "Dry", "Acne-prone"],
    concerns: ["Sensitive", "Dry skin"],
    summary: "100% non-nano zinc oxide physical sunscreen that calms redness while offering gentle broad spectrum defense.",
    description: "Specially crafted for reactive, easily irritated, and allergy-prone skin, Mineral Sheer SPF 30 relies entirely on gentle non-nano zinc oxide. Free from fragrance and chemical filters, it leaves skin calm, protected, and lightly hydrated with an effortless satin finish.",
    keyIngredients: [
      { name: "18% Non-Nano Zinc Oxide", benefit: "Gentle physical barrier that reflects UVA and UVB rays without stinging eyes." },
      { name: "Chamomile Flower Water", benefit: "Soothes flushing, heat sensations, and visible redness." },
      { name: "Allantoin", benefit: "Promotes skin comfort and softens delicate barriers." }
    ],
    howToUse: "Dispense two finger-lengths onto fingertips and smooth evenly over face, neck, and ears as your morning final step. Reapply every 2 hours during continuous sun exposure.",
    compatibility: "Safe for post-procedure or easily sensitized skin. Pairs harmoniously with Cloud Barrier Cream and Gentle Cloud Cleanser.",
    avoidNotes: "Rinse completely at night. For darker skin tones, blend thoroughly for 30 seconds to allow the sheer mineral tint to meld seamlessly.",
    svgType: "mineral-bottle",
    badge: "100% Mineral",
    accentColor: "#F4ECE5",
    accentHighlight: "#DECFC5"
  },
  {
    id: "clay-reset-mask",
    name: "Clay Reset Mask",
    category: "mask",
    categoryLabel: "Mask",
    price: 24,
    size: "75 ml / 2.5 fl. oz.",
    skinTypes: ["Oily", "Acne-prone", "Congested"],
    concerns: ["Acne-prone", "Oily skin"],
    summary: "A creamy French green and kaolin clay treatment that purges congested pores without over-drying.",
    description: "Unlike traditional cracking clay masks, Clay Reset Mask stays creamy and flexible on the skin. French green clay and white kaolin draw out trapped sebum and environmental debris while spirulina and evening primrose oil keep skin comfortably soft and supple.",
    keyIngredients: [
      { name: "French Green & Kaolin Clay", benefit: "Gently absorbs excess sebum and unclogs congested pores." },
      { name: "Spirulina Algae", benefit: "Infuses detoxifying minerals and vitamins." },
      { name: "Evening Primrose Oil", benefit: "Prevents barrier moisture loss during purification." }
    ],
    howToUse: "Apply an even layer to clean skin, avoiding eye and lip areas. Leave on for 10-15 minutes (do not allow to fully crack). Rinse gently with warm water. Use 1-2 times weekly.",
    compatibility: "Do NOT use on the same evening as Renew Retinol 0.3% Night Serum to prevent over-exfoliation.",
    avoidNotes: "Not recommended for severely dry, sensitized, or sunburned skin.",
    svgType: "mask-jar",
    badge: "Detoxifying",
    accentColor: "#DCE7DF",
    accentHighlight: "#BACDC0"
  },
  {
    id: "overnight-dew-mask",
    name: "Overnight Dew Mask",
    category: "mask",
    categoryLabel: "Mask",
    price: 31,
    size: "75 ml / 2.5 fl. oz.",
    skinTypes: ["Dry", "Dull", "Normal", "Mature"],
    concerns: ["Dry skin", "Dullness", "Anti-aging"],
    summary: "A sleeping leave-on gel-cream mask with peptides and fermented honey to replenish luminous hydration by dawn.",
    description: "Overnight Dew Mask transforms tired, parched skin while you sleep. The cushiony leave-on treatment infuses the complexion with plumping peptide complexes and fermented black bee honey, sealing in hydration so you wake up to luminous, velvety-smooth skin.",
    keyIngredients: [
      { name: "Copper Tripeptide-1", benefit: "Supports natural skin elasticity and firmness." },
      { name: "Fermented Black Bee Honey Extract", benefit: "Rebalances surface microflora and strengthens skin recovery." },
      { name: "Beta-Glucan", benefit: "Provides 20% greater moisture retention than hyaluronic acid." }
    ],
    howToUse: "As the final step of your nighttime routine, smooth a generous layer over face and neck. Allow to absorb for 5 minutes before sleep. Rinse with warm water in the morning. Use 2-3 times per week.",
    compatibility: "Pairs wonderfully after Hydra Hyaluronic Serum or over Cloud Barrier Cream on dry winter nights.",
    avoidNotes: "Oily complexions may prefer using this as a 20-minute rinse-off mask rather than an overnight treatment.",
    svgType: "mask-jar",
    badge: "Overnight Glow",
    accentColor: "#F5EADF",
    accentHighlight: "#E2CCB8"
  },
  {
    id: "starter-routine-set",
    name: "Starter Routine Set",
    category: "sets",
    categoryLabel: "Set",
    price: 62,
    size: "3 Full Size Items (150ml + 50ml + 50ml)",
    skinTypes: ["All Skin Types", "Normal", "Dry", "Combination"],
    concerns: ["Dry skin", "Dullness", "Sensitive"],
    summary: "The essential 3-step daily foundation: Gentle Cloud Cleanser, Cloud Barrier Cream, and Daily Shield SPF 50.",
    description: "The Starter Routine Set is the ultimate curation for healthy, resilient skin. It combines our award-winning Gentle Cloud Cleanser to purify, Cloud Barrier Cream to nourish and protect the lipid matrix, and Daily Shield SPF 50 Fluid to defend against UV damage. Perfect for beginners and skincare minimalists.",
    keyIngredients: [
      { name: "Step 1: Gentle Cloud Cleanser (150ml)", benefit: "Gentle oat and ceramide daily wash." },
      { name: "Step 2: Cloud Barrier Cream (50ml)", benefit: "5-ceramide biomimetic moisture restore." },
      { name: "Step 3: Daily Shield SPF 50 Fluid (50ml)", benefit: "Invisible broad spectrum sun defense." }
    ],
    howToUse: "AM: Wash with Gentle Cloud Cleanser, apply Cloud Barrier Cream, and finish with Daily Shield SPF 50. PM: Cleanse with Gentle Cloud Cleanser and finish with Cloud Barrier Cream.",
    compatibility: "Universally compatible with any targeted serums added in the future. Saves $14 compared to individual items.",
    avoidNotes: "Suitable for all skin types including sensitive skin.",
    svgType: "set-box",
    badge: "Best Value ($76 Value)",
    accentColor: "#EAE7DF",
    accentHighlight: "#D1CBBF"
  },
  {
    id: "acne-care-set",
    name: "Acne Care Set",
    category: "sets",
    categoryLabel: "Set",
    price: 67,
    size: "3 Full Size Items (150ml + 30ml + 50ml)",
    skinTypes: ["Oily", "Acne-prone", "Combination"],
    concerns: ["Acne-prone", "Oily skin"],
    summary: "A targeted 3-step balancing system: Clear Balance Gel Cleanser, Calm Niacinamide 10% Serum, and Weightless Water Gel.",
    description: "The Acne Care Set is a science-backed trio formulated to clarify congested pores, calm visible redness, and regulate excess sebum without stripping the skin. Together, tea tree, 10% niacinamide, 1% zinc PCA, and fermented bamboo water restore clarity and comfort.",
    keyIngredients: [
      { name: "Step 1: Clear Balance Gel Cleanser (150ml)", benefit: "Zinc PCA and tea tree purifying gel." },
      { name: "Step 2: Calm Niacinamide 10% Serum (30ml)", benefit: "Pore refining and redness soothing serum." },
      { name: "Step 3: Weightless Water Gel (50ml)", benefit: "100% oil-free cooling hydration." }
    ],
    howToUse: "AM & PM: Cleanse with Clear Balance Gel Cleanser, pat 3-4 drops of Calm Niacinamide Serum into skin, and seal with Weightless Water Gel. (Apply sunscreen in AM).",
    compatibility: "Specifically formulated to work synergistically. Saves $9 compared to individual purchases.",
    avoidNotes: "Formulated specifically for oily and acne-prone skin. Overly dry skin may find this formula insufficiently rich.",
    svgType: "set-box",
    badge: "Targeted Set ($76 Value)",
    accentColor: "#DFEBE5",
    accentHighlight: "#B8D4C4"
  }
];

// Helper to get SVG illustration based on type and custom colors
function getProductSvg(svgType, accentColor = "#E8DED2", accentHighlight = "#D4C5B3") {
  switch (svgType) {
    case "pump-bottle":
      return `
        <svg viewBox="0 0 200 240" class="product-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pump Bottle illustration">
          <defs>
            <linearGradient id="grad-${svgType}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${accentColor}" />
              <stop offset="100%" stop-color="${accentHighlight}" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8"/>
              <stop offset="40%" stop-color="#FAF8F5" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="#ECE5DC" stop-opacity="0.9"/>
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="220" rx="42" ry="10" fill="#2D312E" fill-opacity="0.08"/>
          <!-- Pump dispenser -->
          <rect x="85" y="32" width="30" height="8" rx="2" fill="#7C9A82"/>
          <path d="M96 32 V18 C96 14 100 12 108 12 H124 C128 12 130 14 130 18 C130 20 128 22 124 22 H110 V32" fill="#7C9A82"/>
          <rect x="94" y="38" width="12" height="12" fill="#D3DDD5"/>
          <rect x="88" y="50" width="24" height="10" rx="3" fill="#A8BFAD"/>
          <!-- Bottle body -->
          <rect x="62" y="60" width="76" height="152" rx="18" fill="url(#bodyGrad)"/>
          <!-- Bottle accent wrap -->
          <rect x="68" y="90" width="64" height="84" rx="6" fill="url(#grad-${svgType})"/>
          <rect x="76" y="105" width="48" height="4" rx="2" fill="#2D312E" fill-opacity="0.5"/>
          <rect x="82" y="115" width="36" height="3" rx="1.5" fill="#2D312E" fill-opacity="0.3"/>
          <rect x="80" y="145" width="40" height="2" rx="1" fill="#7C9A82"/>
        </svg>
      `;

    case "dropper-bottle":
      return `
        <svg viewBox="0 0 200 240" class="product-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dropper Bottle illustration">
          <defs>
            <linearGradient id="grad-${svgType}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${accentColor}" />
              <stop offset="100%" stop-color="${accentHighlight}" />
            </linearGradient>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
              <stop offset="35%" stop-color="#FBF9F6" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="#E5DEC3" stop-opacity="0.4"/>
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="220" rx="38" ry="9" fill="#2D312E" fill-opacity="0.08"/>
          <!-- Rubber bulb -->
          <path d="M92 24 C92 14 108 14 108 24 L108 30 H92 Z" fill="#2D312E" fill-opacity="0.8"/>
          <!-- Dropper collar -->
          <rect x="88" y="30" width="24" height="8" rx="2" fill="#C5B5A3"/>
          <rect x="86" y="38" width="28" height="14" rx="3" fill="#DCD3C7"/>
          <!-- Dropper bottle body -->
          <rect x="66" y="52" width="68" height="158" rx="16" fill="url(#glassGrad)"/>
          <!-- Inner liquid -->
          <rect x="72" y="80" width="56" height="122" rx="10" fill="url(#grad-${svgType})" fill-opacity="0.85"/>
          <!-- Minimalist label -->
          <rect x="76" y="105" width="48" height="65" rx="4" fill="#FFFFFF" fill-opacity="0.95"/>
          <rect x="84" y="120" width="32" height="3" rx="1.5" fill="#2D312E" fill-opacity="0.6"/>
          <rect x="88" y="128" width="24" height="2" rx="1" fill="#7C9A82"/>
          <rect x="86" y="152" width="28" height="2" rx="1" fill="#2D312E" fill-opacity="0.3"/>
        </svg>
      `;

    case "cream-jar":
    case "gel-jar":
      return `
        <svg viewBox="0 0 200 240" class="product-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Jar illustration">
          <defs>
            <linearGradient id="grad-${svgType}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${accentColor}" />
              <stop offset="100%" stop-color="${accentHighlight}" />
            </linearGradient>
            <linearGradient id="jarLid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#A5B8A8"/>
              <stop offset="50%" stop-color="#7C9A82"/>
              <stop offset="100%" stop-color="#5E7A64"/>
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="216" rx="52" ry="12" fill="#2D312E" fill-opacity="0.08"/>
          <!-- Jar Lid -->
          <rect x="52" y="90" width="96" height="22" rx="6" fill="url(#jarLid)"/>
          <ellipse cx="100" cy="91" rx="48" ry="7" fill="#8DA693"/>
          <!-- Jar Base -->
          <rect x="56" y="112" width="88" height="92" rx="18" fill="url(#grad-${svgType})"/>
          <!-- Frosting / Glass border -->
          <path d="M56 122 C56 112 60 112 100 112 C140 112 144 112 144 122 V184 C144 198 132 204 100 204 C68 204 56 198 56 184 Z" fill="#FFFFFF" fill-opacity="0.45"/>
          <!-- Minimalist label -->
          <rect x="68" y="132" width="64" height="42" rx="4" fill="#FAF8F5" fill-opacity="0.95"/>
          <rect x="76" y="146" width="48" height="3" rx="1.5" fill="#2D312E" fill-opacity="0.6"/>
          <rect x="84" y="155" width="32" height="2" rx="1" fill="#7C9A82"/>
        </svg>
      `;

    case "gel-tube":
    case "sunscreen-tube":
      return `
        <svg viewBox="0 0 200 240" class="product-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tube illustration">
          <defs>
            <linearGradient id="grad-${svgType}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${accentColor}" />
              <stop offset="100%" stop-color="${accentHighlight}" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="222" rx="36" ry="8" fill="#2D312E" fill-opacity="0.08"/>
          <!-- Tube Crimp Top -->
          <path d="M68 40 L132 40 L130 52 L70 52 Z" fill="#C5C2BA"/>
          <!-- Tube Body tapering down -->
          <path d="M70 52 L130 52 C126 120 122 170 118 186 L82 186 C78 170 74 120 70 52 Z" fill="url(#grad-${svgType})"/>
          <!-- Tube Cap -->
          <rect x="80" y="186" width="40" height="26" rx="4" fill="#7C9A82"/>
          <rect x="84" y="212" width="32" height="6" rx="2" fill="#5F7B65"/>
          <!-- Label -->
          <rect x="78" y="80" width="44" height="70" rx="4" fill="#FAF8F5" fill-opacity="0.85"/>
          <rect x="84" y="96" width="32" height="3" rx="1.5" fill="#2D312E" fill-opacity="0.6"/>
          <rect x="88" y="106" width="24" height="2" rx="1" fill="#7C9A82"/>
          <rect x="86" y="130" width="28" height="2" rx="1" fill="#2D312E" fill-opacity="0.3"/>
        </svg>
      `;

    case "mineral-bottle":
      return `
        <svg viewBox="0 0 200 240" class="product-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mineral Bottle illustration">
          <defs>
            <linearGradient id="grad-${svgType}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${accentColor}" />
              <stop offset="100%" stop-color="${accentHighlight}" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="220" rx="38" ry="9" fill="#2D312E" fill-opacity="0.08"/>
          <!-- Flip Cap -->
          <rect x="82" y="44" width="36" height="22" rx="5" fill="#7C9A82"/>
          <!-- Oval Body -->
          <rect x="65" y="66" width="70" height="146" rx="26" fill="url(#grad-${svgType})"/>
          <!-- Label -->
          <rect x="74" y="98" width="52" height="76" rx="5" fill="#FFFFFF" fill-opacity="0.9"/>
          <rect x="82" y="116" width="36" height="3" rx="1.5" fill="#2D312E" fill-opacity="0.7"/>
          <rect x="88" y="126" width="24" height="2" rx="1" fill="#E8B4B8"/>
          <rect x="84" y="150" width="32" height="2" rx="1" fill="#2D312E" fill-opacity="0.3"/>
        </svg>
      `;

    case "mask-jar":
      return `
        <svg viewBox="0 0 200 240" class="product-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mask Jar illustration">
          <defs>
            <linearGradient id="grad-${svgType}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${accentColor}" />
              <stop offset="100%" stop-color="${accentHighlight}" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="216" rx="54" ry="12" fill="#2D312E" fill-opacity="0.08"/>
          <!-- Wood/Sage Lid -->
          <rect x="50" y="86" width="100" height="24" rx="7" fill="#6A8570"/>
          <ellipse cx="100" cy="87" rx="50" ry="8" fill="#7C9A82"/>
          <!-- Jar Body -->
          <rect x="54" y="110" width="92" height="96" rx="18" fill="url(#grad-${svgType})"/>
          <!-- Label -->
          <rect x="66" y="130" width="68" height="48" rx="4" fill="#FAF8F5" fill-opacity="0.95"/>
          <rect x="76" y="146" width="48" height="3" rx="1.5" fill="#2D312E" fill-opacity="0.7"/>
          <rect x="84" y="156" width="32" height="2" rx="1" fill="#7C9A82"/>
        </svg>
      `;

    case "set-box":
      return `
        <svg viewBox="0 0 200 240" class="product-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Set Box illustration">
          <defs>
            <linearGradient id="grad-${svgType}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${accentColor}" />
              <stop offset="100%" stop-color="${accentHighlight}" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="222" rx="60" ry="12" fill="#2D312E" fill-opacity="0.1"/>
          <!-- Gift Box Body -->
          <rect x="42" y="80" width="116" height="132" rx="12" fill="url(#grad-${svgType})"/>
          <!-- Box Lid Overhang -->
          <rect x="38" y="68" width="124" height="26" rx="6" fill="#7C9A82"/>
          <!-- Ribbon Accent -->
          <rect x="94" y="68" width="12" height="144" fill="#E8B4B8"/>
          <ellipse cx="100" cy="67" rx="14" ry="7" fill="#E8B4B8"/>
          <!-- Badge on box -->
          <rect x="56" y="120" width="88" height="54" rx="6" fill="#FAF8F5" fill-opacity="0.95"/>
          <rect x="68" y="136" width="64" height="4" rx="2" fill="#2D312E" fill-opacity="0.7"/>
          <rect x="76" y="148" width="48" height="3" rx="1.5" fill="#7C9A82"/>
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 200 240" class="product-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="60" y="60" width="80" height="140" rx="16" fill="${accentColor}"/>
        </svg>
      `;
  }
}
