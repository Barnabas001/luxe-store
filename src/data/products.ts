import type { Product } from "../types";

export const products: Product[] = [
  // --- JEWELRY ---
  {
    id: "j1",
    name: "Aurum Stacking Ring",
    price: 189,
    originalPrice: 240,
    category: "jewelry",
    subcategory: "rings",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
    ],
    description:
      "Handcrafted 18k gold stacking ring with a minimalist silhouette. Designed to be worn alone or layered.",
    inStock: true,
    featured: true,
    tags: ["gold", "ring", "minimalist", "bestseller"],
  },
  {
    id: "j2",
    name: "Eclipse Pendant Necklace",
    price: 320,
    originalPrice: 380,
    category: "jewelry",
    subcategory: "necklaces",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    ],
    description:
      'A bold circular pendant in brushed gold on a 16" chain. Makes a statement without saying a word.',
    inStock: true,
    featured: true,
    tags: ["gold", "necklace", "pendant", "statement"],
  },
  {
    id: "j3",
    name: "Noir Cuff Bracelet",
    price: 275,
    originalPrice: 300,
    category: "jewelry",
    subcategory: "bracelets",
    images: [
      "https://images.unsplash.com/photo-1573408301185-9519f94815f4?w=800",
    ],
    description:
      "A sleek blackened gold cuff. Architectural and bold — jewelry as sculpture.",
    inStock: true,
    featured: false,
    tags: ["gold", "bracelet", "cuff", "dark"],
  },

  // --- CLOTHING ---
  {
    id: "c1",
    name: "Obsidian Silk Blazer",
    price: 490,
    originalPrice: 550,
    category: "clothing",
    subcategory: "outerwear",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b5f05?w=800",
    ],
    description:
      "A structured silk blazer in deep black. Sharp shoulders, fluid drape — power dressing redefined.",
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    featured: true,
    tags: ["blazer", "silk", "black", "luxury"],
  },
  {
    id: "c2",
    name: "Velvet Column Dress",
    price: 380,
    originalPrice: 520,
    category: "clothing",
    subcategory: "dresses",
    images: [
      "https://images.unsplash.com/photo-1566479179817-0b9570b5ac2d?w=800",
    ],
    description:
      "Floor-length velvet column dress in midnight black. Effortless elegance for every occasion.",
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    featured: true,
    tags: ["dress", "velvet", "evening", "black"],
  },
  {
    id: "c3",
    name: "Sand Linen Trousers",
    price: 210,
    originalPrice: 365,
    category: "clothing",
    subcategory: "bottoms",
    images: [
      "https://images.unsplash.com/photo-1594938374182-a57b2e5f7b1d?w=800",
    ],
    description:
      "Wide-leg linen trousers in warm sand. Relaxed but intentional — dressed-down luxury.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: false,
    tags: ["trousers", "linen", "casual", "neutral"],
  },
  {
    id: "c4",
    name: "Ivory Cashmere Turtleneck",
    price: 295,
    originalPrice: 388,
    category: "clothing",
    subcategory: "tops",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    ],
    description:
      "Grade-A cashmere turtleneck in ivory. The kind of piece you keep forever.",
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    featured: false,
    tags: ["cashmere", "turtleneck", "ivory", "winter"],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const getByCategory = (category: "jewelry" | "clothing") =>
  products.filter((p) => p.category === category);
