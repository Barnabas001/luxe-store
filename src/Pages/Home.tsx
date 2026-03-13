import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { featuredProducts } from "../data/products";

export default function Home() {
  return (
    <main style={{ backgroundColor: "var(--black)" }}>
      <HeroSection />
      <CategorySplit />
      <FeaturedProducts />
    </main>
  );
}

// 1. HERO SECTION
function HeroSection() {
  return (
    <section
      style={{ minHeight: "92vh", backgroundColor: "var(--black)" }}
      className="relative flex items-center overflow-hidden"
    >
      {/* ── Background image (right side bleeds in) ── */}
      <div className="absolute inset-0 flex">
        <div className="w-full lg:w-1/2" />
        <div
          className="hidden lg:block w-1/2 relative"
          style={{ opacity: 0.75 }}
        >
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200"
            alt="Luxury fashion"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, var(--black) 0%, transparent 40%)",
            }}
          />
        </div>
      </div>

      {/* Mobile background */}
      <div className="lg:hidden absolute inset-0" style={{ opacity: 0.2 }}>
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--black) 40%, transparent)",
          }}
        />
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <span
              style={{ backgroundColor: "var(--gold)" }}
              className="block w-10 h-px"
            />
            <span
              style={{
                color: "var(--gold)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              className="text-xs tracking-[0.3em] uppercase"
            >
              New Collection 2025
            </span>
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--text)",
              lineHeight: "1.05",
            }}
            className="text-6xl lg:text-8xl font-light mb-6"
          >
            Crafted for
            <br />
            <span style={{ color: "var(--gold)" }}>the Bold.</span>
          </h1>

          <p
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: "1.8",
            }}
            className="text-base lg:text-lg font-light mb-10 max-w-md"
          >
            Jewelry and clothing for those who refuse the ordinary. Each piece
            is a statement. Each collection, a world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="group flex items-center justify-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
              style={{
                backgroundColor: "var(--gold)",
                color: "var(--black)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--gold-light)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--gold)";
              }}
            >
              Shop Collection
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/shop?category=jewelry"
              className="group flex items-center justify-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
              style={{
                border: "1px solid var(--gold)",
                color: "var(--gold)",
                fontFamily: "'DM Sans', sans-serif",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "rgba(201,168,76,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent";
              }}
            >
              Explore Jewelry
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex gap-10 mt-16">
            {[
              { number: "200+", label: "Pieces" },
              { number: "12", label: "Collections" },
              { number: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "var(--gold)",
                  }}
                  className="text-3xl font-light"
                >
                  {stat.number}
                </p>
                <p
                  style={{
                    color: "var(--muted)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="text-xs tracking-widest uppercase mt-1"
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span
          style={{ color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-[10px] tracking-[0.3em] uppercase"
        >
          Scroll
        </span>
        <ChevronDown size={14} style={{ color: "var(--muted)" }} />
      </div>
    </section>
  );
}

// 2. CATEGORY SPLIT
function CategorySplit() {
  return (
    <section
      className="flex flex-col lg:flex-row"
      style={{ height: "clamp(400px, 70vh, 700px)" }}
    >
      {/* JEWELRY Panel */}
      <CategoryPanel
        to="/shop?category=jewelry"
        image="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200"
        label="Jewelry"
        description="Rings, necklaces, earrings & more"
      />

      {/* Divider line */}
      <div
        style={{ backgroundColor: "var(--gold)", opacity: 0.4 }}
        className="w-full h-px lg:w-px lg:h-auto shrink-0"
      />

      {/* CLOTHING Panel */}
      <CategoryPanel
        to="/shop?category=clothing"
        image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200"
        label="Clothing"
        description="Blazers, dresses, tops & more"
      />
    </section>
  );
}

// Reusable panel used by CategorySplit
function CategoryPanel({
  to,
  image,
  label,
  description,
}: {
  to: string;
  image: string;
  label: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="relative flex-1 overflow-hidden group flex items-end"
    >
      {/* Background image — zooms on hover via CSS group */}
      <img
        src={image}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ opacity: 0.6 }}
      />

      {/* Dark overlay — lightens slightly on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%)",
          opacity: 0.9,
        }}
      />

      {/* Text content */}
      <div className="relative z-10 p-8 lg:p-12 w-full">
        <span
          style={{ backgroundColor: "var(--gold)" }}
          className="block w-8 h-px mb-4 transition-all duration-500 group-hover:w-16"
        />
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--text)",
          }}
          className="text-5xl lg:text-6xl font-light mb-2"
        >
          {label}
        </h2>
        <p
          style={{ color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-sm tracking-widest uppercase mb-6 transition-all duration-300 group-hover:text-gray-300"
        >
          {description}
        </p>

        {/* Arrow CTA slides in on hover */}
        <div
          className="flex items-center gap-2 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ color: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}
        >
          <span className="text-xs tracking-[0.2em] uppercase">Shop Now</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════
// 3. FEATURED PRODUCTS
// ═══════════════════════════════════════
function FeaturedProducts() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col items-center mb-16">
        <span
          style={{ backgroundColor: "var(--gold)" }}
          className="block w-10 h-px mb-4"
        />
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--text)",
          }}
          className="text-4xl lg:text-5xl font-light tracking-wide mb-3"
        >
          Featured Pieces
        </h2>
        <p
          style={{ color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-xs tracking-[0.25em] uppercase"
        >
          Handpicked from our latest collections
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group relative overflow-hidden"
            style={{ backgroundColor: "var(--surface)" }}
          >
            {/* Product image */}
            <div className="relative overflow-hidden aspect-3/4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Sale badge */}
              {product.originalPrice && (
                <span
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "var(--black)",
                  }}
                  className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 font-medium"
                >
                  Sale
                </span>
              )}

              {/* Out of stock overlay */}
              {!product.inStock && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                >
                  <span
                    style={{
                      color: "var(--muted)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    className="text-xs tracking-widest uppercase border border-gray-700 px-4 py-2"
                  >
                    Sold Out
                  </span>
                </div>
              )}

              {/* Hover overlay with Quick Shop */}
              <div
                className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                }}
              >
                <span
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "var(--black)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="text-[10px] tracking-[0.2em] uppercase px-6 py-2.5 font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  Quick View
                </span>
              </div>
            </div>

            {/* Product info */}
            <div className="p-4">
              <p
                style={{
                  color: "var(--muted)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                className="text-[10px] tracking-[0.2em] uppercase mb-1"
              >
                {product.subcategory}
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--text)",
                }}
                className="text-lg font-light mb-2 group-hover:text-amber-300 transition-colors duration-200"
              >
                {product.name}
              </h3>
              <div className="flex items-center gap-3">
                <span
                  style={{
                    color: "var(--gold)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="text-sm font-medium"
                >
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span
                    style={{
                      color: "var(--muted)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    className="text-sm line-through"
                  >
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View all CTA */}
      <div className="flex justify-center mt-14">
        <Link
          to="/shop"
          className="group flex items-center gap-3 px-12 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
          style={{
            border: "1px solid var(--gold)",
            color: "var(--gold)",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "rgba(201,168,76,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "transparent";
          }}
        >
          View All Products
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
