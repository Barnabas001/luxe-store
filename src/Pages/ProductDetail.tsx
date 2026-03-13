import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import { ImageGallery } from "../../productDetailComponent/ImageGallery";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find the product by ID from URL
  const product = products.find((p) => p.id === id);

  // Local state
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wishListed, setWishListed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  // Related products — same category, excluding current
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  // ── 404 state ──
  if (!product) {
    return (
      <div
        style={{ backgroundColor: "var(--black)", minHeight: "100vh" }}
        className="flex flex-col items-center justify-center gap-6"
      >
        <span
          style={{ backgroundColor: "var(--gold)" }}
          className="block w-10 h-px"
        />
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--text)",
          }}
          className="text-4xl font-light"
        >
          Product Not Found
        </h1>
        <Link
          to="/shop"
          style={{ color: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-xs tracking-[0.2em] uppercase border-b border-amber-500 pb-1"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  // ── Add to cart handler ──
  const handleAddToCart = () => {
    // Clothing requires a size
    if (product.sizes && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize ?? undefined);

    // Show confirmation flash then reset
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main style={{ backgroundColor: "var(--black)", minHeight: "100vh" }}>
      {/* ── BREADCRUMB ── */}
      <div
        style={{ borderBottom: "1px solid #1a1a1a" }}
        className="px-6 lg:px-12 py-4 max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="flex items-center gap-2 text-xs tracking-widest uppercase hover:text-white transition-colors"
          >
            <ArrowLeft size={12} />
            Back
          </button>
          <span style={{ color: "#2a2520" }}>/</span>
          <Link
            to="/shop"
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="text-xs tracking-widest uppercase hover:text-white transition-colors"
          >
            Shop
          </Link>
          <span style={{ color: "#2a2520" }}>/</span>
          <Link
            to={`/shop?category=${product.category}`}
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="text-xs tracking-widest uppercase  hover:text-white transition-colors"
          >
            {product.category}
          </Link>
          <span style={{ color: "#2a2520" }}>/</span>
          <span
            style={{
              color: "var(--gold)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="text-xs tracking-widest uppercase"
          >
            {product.name}
          </span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ── LEFT: Image Gallery ── */}
          <ImageGallery
            images={product.images}
            name={product.name}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
          />

          {/* ── RIGHT: Product Info ── */}
          <div className="flex flex-col">
            {/* Category + subcategory label */}
            <div className="flex items-center gap-3 mb-4">
              <span
                style={{ backgroundColor: "var(--gold)" }}
                className="block w-6 h-px"
              />
              <span
                style={{
                  color: "var(--gold)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                className="text-[10px] tracking-[0.3em] uppercase"
              >
                {product.category} · {product.subcategory}
              </span>
            </div>

            {/* Product name */}
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--text)",
                lineHeight: "1.1",
              }}
              className="text-4xl lg:text-5xl font-light mb-6"
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--gold)",
                }}
                className="text-3xl font-light"
              >
                ${product.price}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    color: "var(--muted)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="text-lg line-through"
                >
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "var(--black)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="text-[10px] tracking-widest uppercase px-2 py-1 font-medium"
                >
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Divider */}
            <div
              style={{ backgroundColor: "#1a1a1a" }}
              className="h-px w-full mb-8"
            />

            {/* Description */}
            <p
              style={{
                color: "var(--muted)",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: "1.8",
              }}
              className="text-sm mb-8"
            >
              {product.description}
            </p>

            {/* ── SIZE SELECTOR (clothing only) ── */}
            {product.sizes && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span
                    style={{
                      color: "var(--text)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    className="text-xs tracking-[0.2em] uppercase"
                  >
                    Select Size
                  </span>
                  {sizeError && (
                    <span
                      style={{
                        color: "#e07070",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      className="text-[10px] tracking-widest uppercase"
                    >
                      Please select a size
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        backgroundColor:
                          selectedSize === size ? "var(--gold)" : "transparent",
                        color:
                          selectedSize === size
                            ? "var(--black)"
                            : "var(--muted)",
                        border:
                          selectedSize === size
                            ? "1px solid var(--gold)"
                            : sizeError
                              ? "1px solid #e07070"
                              : "1px solid #2a2520",
                        transition: "all 0.2s ease",
                      }}
                      className="w-12 h-12 text-xs tracking-widest uppercase hover:border-amber-500 hover:text-white"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── QUANTITY SELECTOR ── */}
            <div className="mb-8">
              <span
                style={{
                  color: "var(--text)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                className="text-xs tracking-[0.2em] uppercase block mb-3"
              >
                Quantity
              </span>
              <div className="flex items-center gap-0 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    border: "1px solid #2a2520",
                    color: "var(--muted)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="w-10 h-10 flex items-center justify-center hover:text-white hover:border-amber-500 transition-all text-lg"
                >
                  −
                </button>
                <span
                  style={{
                    borderTop: "1px solid #2a2520",
                    borderBottom: "1px solid #2a2520",
                    color: "var(--text)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="w-12 h-10 flex items-center justify-center text-sm"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{
                    border: "1px solid #2a2520",
                    color: "var(--muted)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="w-10 h-10 flex items-center justify-center hover:text-white hover:border-amber-500 transition-all text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* ── ACTION BUTTONS ── */}
            <div className="flex gap-3 mb-8">
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                style={{
                  backgroundColor: addedToCart
                    ? "#2a4a2a"
                    : product.inStock
                      ? "var(--gold)"
                      : "#2a2520",
                  color: addedToCart
                    ? "#6abf6a"
                    : product.inStock
                      ? "var(--black)"
                      : "var(--muted)",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.3s ease",
                  flex: 1,
                }}
                className="flex items-center justify-center gap-3 py-4 text-xs tracking-[0.2em] uppercase font-medium"
              >
                <ShoppingBag size={14} />
                {!product.inStock
                  ? "Out of Stock"
                  : addedToCart
                    ? "✓ Added to Cart"
                    : "Add to Cart"}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishListed((prev) => !prev)}
                style={{
                  border: wishListed
                    ? "1px solid var(--gold)"
                    : "1px solid #2a2520",
                  color: wishListed ? "var(--gold)" : "var(--muted)",
                  backgroundColor: wishListed
                    ? "rgba(201,168,76,0.08)"
                    : "transparent",
                  transition: "all 0.2s ease",
                }}
                className="w-14 flex items-center justify-center hover:border-amber-500"
                aria-label="Wishlist"
              >
                <Heart size={16} fill={wishListed ? "var(--gold)" : "none"} />
              </button>

              {/* Share */}
              <button
                style={{ border: "1px solid #2a2520", color: "var(--muted)" }}
                className="w-14 flex items-center justify-center hover:border-amber-500 hover:text-white transition-all"
                aria-label="Share"
                onClick={() =>
                  navigator.share?.({
                    title: product.name,
                    url: window.location.href,
                  })
                }
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* ── TRUST BADGES ── */}
            <div
              style={{
                borderTop: "1px solid #1a1a1a",
                borderBottom: "1px solid #1a1a1a",
              }}
              className="py-6 grid grid-cols-3 gap-4 mb-8"
            >
              {[
                {
                  icon: Truck,
                  label: "Free Shipping",
                  sub: "Orders over $300",
                },
                {
                  icon: RotateCcw,
                  label: "Free Returns",
                  sub: "30-day policy",
                },
                { icon: Shield, label: "Authentic", sub: "Guaranteed genuine" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <Icon size={16} style={{ color: "var(--gold)" }} />
                  <span
                    style={{
                      color: "var(--text)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    className="text-[10px] tracking-widest uppercase"
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      color: "var(--muted)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    className="text-[10px]"
                  >
                    {sub}
                  </span>
                </div>
              ))}
            </div>

            {/* ── TAGS ── */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: "1px solid #2a2520",
                    color: "var(--muted)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="text-[10px] tracking-widest uppercase px-3 py-1 "
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RELATED PRODUCTS ── */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </main>
  );
}

// ═══════════════════════════════════════
// RELATED PRODUCTS
// ═══════════════════════════════════════
function RelatedProducts({
  products,
}: {
  products: typeof import("../data/products").products;
}) {
  return (
    <section
      style={{ borderTop: "1px solid #1a1a1a" }}
      className="py-20 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <span
            style={{ backgroundColor: "var(--gold)" }}
            className="block w-10 h-px mb-4"
          />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--text)",
            }}
            className="text-3xl font-light"
          >
            You May Also Like
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <div className="relative overflow-hidden aspect-3/4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "var(--text)",
                  }}
                  className="text-base font-light mb-1 group-hover:text-amber-300 transition-colors"
                >
                  {product.name}
                </h3>
                <span
                  style={{
                    color: "var(--gold)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="text-sm"
                >
                  ${product.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
