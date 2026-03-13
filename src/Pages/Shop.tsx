import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { products } from "../data/products";
import type { Product } from "../types";
import { useCart } from "../hooks/useCart";
import { EmptyState } from "../../shopComponents/EmptyState";
import { ShopHeader } from "../../shopComponents/ShopHeader";
import { CategoryTabs } from "../../shopComponents/CategoryTabs";

// TYPES
type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

// MAIN SHOP PAGE
export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read category from URL — e.g. /shop?category=jewelry
  const urlCategory = searchParams.get("category") as
    | "jewelry"
    | "clothing"
    | null;

  const [activeCategory, setActiveCategory] = useState<
    "all" | "jewelry" | "clothing"
  >(urlCategory ?? "all");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // ── Dynamically build subcategory list from current category ──
  const subcategories = useMemo(() => {
    const filtered =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);
    const subs = Array.from(new Set(filtered.map((p) => p.subcategory)));
    return ["all", ...subs];
  }, [activeCategory]);

  // ── Filter + Sort products ──
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by subcategory
    if (activeSubcategory !== "all") {
      result = result.filter((p) => p.subcategory === activeSubcategory);
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, activeSubcategory, sortBy, priceRange]);

  // ── When user clicks a category tab, reset subcategory ──
  const handleCategoryChange = (cat: "all" | "jewelry" | "clothing") => {
    setActiveCategory(cat);
    setActiveSubcategory("all");
    // Sync URL params
    if (cat === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <main style={{ backgroundColor: "var(--black)", minHeight: "100vh" }}>
      {/* ── PAGE HEADER ── */}
      <ShopHeader
        activeCategory={activeCategory}
        totalCount={filteredProducts.length}
      />

      {/* ── CATEGORY TABS ── */}
      <CategoryTabs
        activeCategory={activeCategory}
        onChange={handleCategoryChange}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        {/* ── TOOLBAR: Subcategory + Sort + Filter Toggle ── */}
        <Toolbar
          subcategories={subcategories}
          activeSubcategory={activeSubcategory}
          onSubcategoryChange={setActiveSubcategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filtersOpen={filtersOpen}
          onToggleFilters={() => setFiltersOpen((prev) => !prev)}
          totalCount={filteredProducts.length}
        />

        <div className="flex gap-8 mt-8">
          {/* ── SIDEBAR FILTERS (desktop) ── */}
          <aside
            style={{
              maxWidth: filtersOpen ? "260px" : "0px",
              overflow: "hidden",
              transition: "max-width 0.4s ease",
              flexShrink: 0,
            }}
          >
            <FilterSidebar
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onClearFilters={() => {
                setActiveSubcategory("all");
                setPriceRange([0, 1000]);
              }}
            />
          </aside>

          {/* ── PRODUCT GRID ── */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <EmptyState
                onClear={() => {
                  setActiveCategory("all");
                  setActiveSubcategory("all");
                  setPriceRange([0, 1000]);
                }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// ═══════════════════════════════════════
// TOOLBAR
// ═══════════════════════════════════════
function Toolbar({
  subcategories,
  activeSubcategory,
  onSubcategoryChange,
  sortBy,
  onSortChange,
  filtersOpen,
  onToggleFilters,
  totalCount,
}: {
  subcategories: string[];
  activeSubcategory: string;
  onSubcategoryChange: (sub: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  totalCount: number;
}) {
  return (
    <div
      style={{ borderBottom: "1px solid #1a1a1a" }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 mt-8"
    >
      {/* Subcategory pills */}
      <div className="flex flex-wrap gap-2">
        {subcategories.map((sub) => (
          <button
            key={sub}
            onClick={() => onSubcategoryChange(sub)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              backgroundColor:
                activeSubcategory === sub ? "var(--gold)" : "transparent",
              color:
                activeSubcategory === sub ? "var(--black)" : "var(--muted)",
              border:
                activeSubcategory === sub
                  ? "1px solid var(--gold)"
                  : "1px solid #2a2520",
              transition: "all 0.2s ease",
            }}
            className="px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase "
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Right side: count + sort + filter toggle */}
      <div className="flex items-center gap-4 shrink-0">
        <span
          style={{ color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-xs hidden sm:block"
        >
          {totalCount} results
        </span>

        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--muted)",
              border: "1px solid #2a2520",
              fontFamily: "'DM Sans', sans-serif",
              appearance: "none",
              paddingRight: "2rem",
            }}
            className="text-xs tracking-widest uppercase px-4 py-2 pr-8 cursor-pointer outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
          <ChevronDown
            size={12}
            style={{ color: "var(--muted)" }}
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        {/* Filter toggle button */}
        <button
          onClick={onToggleFilters}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: filtersOpen ? "var(--gold)" : "var(--muted)",
            border: filtersOpen ? "1px solid var(--gold)" : "1px solid #2a2520",
            backgroundColor: filtersOpen
              ? "rgba(201,168,76,0.08)"
              : "transparent",
            transition: "all 0.2s ease",
          }}
          className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase"
        >
          <SlidersHorizontal size={12} />
          Filters
        </button>
      </div>
    </div>
  );
}

// FILTER SIDEBAR
function FilterSidebar({
  priceRange,
  onPriceChange,
  onClearFilters,
}: {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}) {
  return (
    <div
      style={{
        width: "240px",
        borderRight: "1px solid #1a1a1a",
        paddingRight: "2rem",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <span
          style={{ color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-xs tracking-[0.2em] uppercase"
        >
          Filters
        </span>
        <button
          onClick={onClearFilters}
          style={{ color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-[10px] tracking-widest uppercase hover:text-white transition-colors flex items-center gap-1"
        >
          <X size={10} /> Clear
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <p
          style={{ color: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-[10px] tracking-[0.2em] uppercase mb-4"
        >
          Price Range
        </p>

        <div className="flex justify-between mb-3">
          <span
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="text-xs"
          >
            ${priceRange[0]}
          </span>
          <span
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="text-xs"
          >
            ${priceRange[1]}
          </span>
        </div>

        {/* Min price slider */}
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={priceRange[0]}
          onChange={(e) =>
            onPriceChange([Number(e.target.value), priceRange[1]])
          }
          className="w-full mb-2 accent-amber-500"
        />

        {/* Max price slider */}
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={priceRange[1]}
          onChange={(e) =>
            onPriceChange([priceRange[0], Number(e.target.value)])
          }
          className="w-full accent-amber-500"
        />
      </div>

      {/* In Stock Filter */}
      <div>
        <p
          style={{ color: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-[10px] tracking-[0.2em] uppercase mb-4"
        >
          Availability
        </p>
        {["In Stock", "All Items"].map((opt) => (
          <label
            key={opt}
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="flex items-center gap-3 text-xs mb-3 cursor-pointer hover:text-white transition-colors"
          >
            <input
              type="radio"
              name="availability"
              className="accent-amber-500"
              defaultChecked={opt === "All Items"}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// PRODUCT CARD
// ═══════════════════════════════════════
function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div
      className="group relative overflow-hidden"
      style={{ backgroundColor: "var(--surface)" }}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden aspect-3/4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Badges */}
          {product.originalPrice && (
            <span
              style={{ backgroundColor: "var(--gold)", color: "var(--black)" }}
              className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 font-medium"
            >
              Sale
            </span>
          )}
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

          {/* Quick view hover */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)",
            }}
          >
            <span
              style={{
                color: "var(--text)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              className="text-[10px] tracking-[0.2em] uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
            >
              View Details →
            </span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p
          style={{ color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-[10px] tracking-[0.2em] uppercase mb-1 "
        >
          {product.subcategory}
        </p>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--text)",
          }}
          className="text-lg font-light mb-3"
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center gap-2">
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
                className="text-xs line-through"
              >
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to cart button */}
          {product.inStock && (
            <button
              onClick={() => addToCart(product)}
              style={{
                color: "var(--gold)",
                border: "1px solid var(--gold)",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s ease",
              }}
              className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 hover:bg-amber-500 hover:text-black"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--gold)";
                (e.currentTarget as HTMLElement).style.color = "var(--black)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--gold)";
              }}
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
