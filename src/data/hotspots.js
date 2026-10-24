// Hotspot data for the 3D hero bottle. Kept separate from Bottle3D so the
// main bundle doesn't pull in three.js (the 3D scene is lazy-loaded).
export const HOTSPOTS = [
  {
    id: "dropper",
    label: "Precision dropper",
    title: "Glass pipette dropper",
    desc: "3–4 drops each morning on clean, dry skin. Follow with moisturizer and SPF.",
    position: [0.32, 1.55, 0.25],
  },
  {
    id: "formula",
    label: "15% Vitamin C",
    title: "Stabilized vitamin C",
    desc: "Ethyl ascorbic acid with ferulic acid, formulated to help brighten dull, uneven-looking skin.",
    position: [0.66, 0.15, 0.15],
  },
  {
    id: "botanical",
    label: "Kakadu plum",
    title: "Botanical antioxidants",
    desc: "Kakadu plum extract supports the formula's antioxidant blend. Use AM — pair retinol at night.",
    position: [-0.66, -0.65, 0.15],
  },
];
