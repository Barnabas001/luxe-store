export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: "jewelry" | "clothing";
  subcategory: string;
  images: string[];
  description: string;
  sizes?: string[];
  inStock: boolean;
  featured: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
