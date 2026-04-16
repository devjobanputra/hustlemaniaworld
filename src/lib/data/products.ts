export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;
  price: number;
  description: string;
  fit: string;
  fabric: string;
  sizes: { size: string; stock: number }[];
  isLimited: boolean;
  isSoldOut: boolean;
  imageUrl: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "the-blueprint-heavyweight-tee",
    name: "THE BLUEPRINT HEAVYWEIGHT TEE",
    collection: "HUMAN OS: FOCUS MODE",
    price: 1999,
    description:
      "Engineered for those who architect their own path. The Blueprint is a statement piece — a 300GSM heavyweight cotton canvas built for the relentless. Features an oversized drop-shoulder silhouette with a deconstructed seam finish and a subtle embossed logo at the back neckline.",
    fit: "Oversized drop-shoulder fit. Size up for an exaggerated silhouette, true-to-size for a relaxed drape.",
    fabric: "300GSM premium heavyweight combed cotton. Pre-shrunk. Enzyme-washed for a broken-in feel from day one.",
    sizes: [
      { size: "S", stock: 3 },
      { size: "M", stock: 8 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 5 },
      { size: "XXL", stock: 2 },
    ],
    isLimited: true,
    isSoldOut: false,
    imageUrl: "/products/blueprint.jpg",
  },
  {
    id: "2",
    slug: "foundry-edition-drop-shoulder",
    name: "FOUNDRY EDITION DROP-SHOULDER",
    collection: "INDUSTRIAL SERIES",
    price: 2499,
    description:
      "Forged, not manufactured. The Foundry Edition is raw industrial aesthetics distilled into fabric. Cut from 300GSM heavyweight cotton with reinforced double-needle stitching. The extended drop-shoulder and elongated body create a silhouette that commands space.",
    fit: "Oversized drop-shoulder with elongated body. Runs large — consider sizing down if you prefer less volume.",
    fabric: "300GSM heavyweight ring-spun cotton. Garment-dyed for a matte finish. Triple-washed for zero shrinkage.",
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 4 },
      { size: "L", stock: 7 },
      { size: "XL", stock: 3 },
      { size: "XXL", stock: 1 },
    ],
    isLimited: true,
    isSoldOut: false,
    imageUrl: "/products/foundry.jpg",
  },
  {
    id: "3",
    slug: "tech-sole-relentless-tee",
    name: "TECH SOLE RELENTLESS TEE",
    collection: "RUNTIME COLLECTION",
    price: 1799,
    description:
      "For those running on zero excuses and maximum output. The Relentless features a clean, minimal front with a bold back-panel graphic. Built on our signature 300GSM heavyweight base with a boxy, oversized cut that sits perfectly untucked.",
    fit: "Boxy oversized fit. True to size for a boxy look, size up for maximum volume.",
    fabric: "300GSM heavyweight organic cotton. Bio-washed for softness. Reinforced collar ribbing to hold its shape.",
    sizes: [
      { size: "S", stock: 15 },
      { size: "M", stock: 20 },
      { size: "L", stock: 18 },
      { size: "XL", stock: 10 },
      { size: "XXL", stock: 6 },
    ],
    isLimited: false,
    isSoldOut: false,
    imageUrl: "/products/relentless.jpg",
  },
  {
    id: "4",
    slug: "signal-loss-oversized-tee",
    name: "SIGNAL LOSS OVERSIZED TEE",
    collection: "HUMAN OS: FOCUS MODE",
    price: 2199,
    description:
      "Disconnect to reconnect. Signal Loss is for the ones who go dark to get things done. Features a distressed signal-wave graphic across the chest with a raw-cut hem. Pure black, zero distractions.",
    fit: "Oversized relaxed fit with raw-cut hem. True to size for a relaxed fit.",
    fabric: "300GSM heavyweight cotton. Acid-washed black finish. Raw-cut hem for a deconstructed edge.",
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
      { size: "XXL", stock: 0 },
    ],
    isLimited: true,
    isSoldOut: true,
    imageUrl: "/products/signal-loss.jpg",
  },
  {
    id: "5",
    slug: "protocol-zero-tee",
    name: "PROTOCOL ZERO TEE",
    collection: "RUNTIME COLLECTION",
    price: 1899,
    description:
      "Start from zero. Build to infinite. Protocol Zero is the foundation piece — stripped-back design with a micro-embroidered tag detail and tonal back print. The ultimate blank canvas for the minimalist who speaks through fit, not flash.",
    fit: "Oversized boxy fit with dropped shoulders. True to size.",
    fabric: "300GSM heavyweight combed cotton. Silicone-finished for a premium hand-feel. Pre-shrunk.",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 11 },
      { size: "L", stock: 9 },
      { size: "XL", stock: 4 },
      { size: "XXL", stock: 2 },
    ],
    isLimited: false,
    isSoldOut: false,
    imageUrl: "/products/protocol-zero.jpg",
  },
  {
    id: "6",
    slug: "deadstock-phantom-tee",
    name: "DEADSTOCK PHANTOM TEE",
    collection: "INDUSTRIAL SERIES",
    price: 2799,
    description:
      "Gone before you blinked. The Phantom is our rarest cut — limited to 50 units worldwide. Features a reflective phantom-print that only reveals itself under direct light. Invisible in photos, unmissable in person.",
    fit: "Oversized drop-shoulder with extended body length. Size down for a fitted oversized look.",
    fabric: "300GSM heavyweight Supima cotton. Reactive-dyed with reflective ink overlay. Museum-grade finishing.",
    sizes: [
      { size: "S", stock: 1 },
      { size: "M", stock: 2 },
      { size: "L", stock: 3 },
      { size: "XL", stock: 1 },
      { size: "XXL", stock: 0 },
    ],
    isLimited: true,
    isSoldOut: false,
    imageUrl: "/products/phantom.jpg",
  },
  {
    id: "7",
    slug: "runtime-error-tee",
    name: "RUNTIME ERROR TEE",
    collection: "RUNTIME COLLECTION",
    price: 1999,
    description:
      "When the system crashes, the real ones keep building. Runtime Error is a tribute to the grind — featuring a glitch-art back panel and a clean error-code chest tag. For developers, creators, and anyone running their own program.",
    fit: "Oversized boxy fit. True to size for relaxed, size up for extra volume.",
    fabric: "300GSM heavyweight cotton jersey. Enzyme-washed. DTG-printed with water-based inks for zero hand-feel on the print.",
    sizes: [
      { size: "S", stock: 9 },
      { size: "M", stock: 14 },
      { size: "L", stock: 11 },
      { size: "XL", stock: 7 },
      { size: "XXL", stock: 3 },
    ],
    isLimited: false,
    isSoldOut: false,
    imageUrl: "/products/runtime-error.jpg",
  },
  {
    id: "8",
    slug: "blackout-mesh-panel-tee",
    name: "BLACKOUT MESH PANEL TEE",
    collection: "INDUSTRIAL SERIES",
    price: 2999,
    description:
      "Engineering meets aesthetics. The Blackout features a functional mesh panel across the upper back for ventilation, paired with our signature 300GSM cotton body. Matte-black hardware on the side seam adds an industrial edge.",
    fit: "Oversized with functional mesh panel. True to size recommended for best panel alignment.",
    fabric: "300GSM heavyweight cotton body with technical mesh upper back panel. YKK matte-black zip detail. Bonded seams.",
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 1 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 1 },
      { size: "XXL", stock: 0 },
    ],
    isLimited: true,
    isSoldOut: false,
    imageUrl: "/products/blackout.jpg",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}
