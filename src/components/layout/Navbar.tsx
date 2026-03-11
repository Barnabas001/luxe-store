import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Jewelry", to: "/shop?category=jewelry" },
    { label: "Clothing", to: "/shop?category=clothing" },
  ];

  return (
    <>
      <div
        style={{ backgroundColor: "var(--gold)", color: "var(--black)" }}
        className="text-center py-2 text-xs tracking-[0.2em] uppercase font-medium"
      >
        Free shipping on orders over $300 · New arrivals every Friday
      </div>

      {/* ── MAIN NAVBAR ── */}
      <nav
        style={{
          backgroundColor: scrolled ? "rgba(10,10,10,0.92)" : "var(--black)",
          borderBottom: scrolled
            ? "1px solid #2a2520"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.4s ease",
        }}
        className="sticky top-0 z-50 w-full"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* ── LEFT: Desktop Nav Links ── */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.slice(0, 2).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  currentPath={location.pathname}
                />
              ))}
            </div>

            {/* ── CENTER: Logo ── */}
            <Link to="/" className="flex flex-col items-center group">
              <span
                style={{ backgroundColor: "var(--gold)" }}
                className="block w-8 h-px mb-1 transition-all duration-300 group-hover:w-12"
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--text)",
                  letterSpacing: "0.15em",
                }}
                className="text-xl font-light uppercase tracking-widest"
              >
                Extreme Hub
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--gold)",
                  letterSpacing: "0.3em",
                }}
                className="text-xs font-light uppercase"
              >
                Enterprise
              </span>
              <span
                style={{ backgroundColor: "var(--gold)" }}
                className="block w-8 h-px mt-1 transition-all duration-300 group-hover:w-12"
              />
            </Link>

            {/* ── RIGHT: Desktop Nav Links + Icons ── */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.slice(2).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  currentPath={location.pathname}
                />
              ))}

              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                style={{ color: "var(--muted)" }}
                className="hover:text-white transition-colors duration-200"
                aria-label="Toggle search"
              >
                <Search size={18} />
              </button>

              {/* Cart icon with badge */}
              <Link to="/cart" className="relative group" aria-label="Cart">
                <ShoppingBag
                  size={20}
                  style={{ color: "var(--muted)" }}
                  className="group-hover:text-white transition-colors duration-200"
                />
                {totalItems > 0 && (
                  <span
                    style={{
                      backgroundColor: "var(--gold)",
                      color: "var(--black)",
                    }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce"
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* ── MOBILE: Cart + Hamburger ── */}
            <div className="flex lg:hidden items-center gap-5">
              <Link to="/cart" className="relative" aria-label="Cart">
                <ShoppingBag size={20} style={{ color: "var(--text)" }} />
                {totalItems > 0 && (
                  <span
                    style={{
                      backgroundColor: "var(--gold)",
                      color: "var(--black)",
                    }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                style={{ color: "var(--text)" }}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── SEARCH BAR ── */}
        <div
          style={{
            borderTop: searchOpen ? "1px solid #2a2520" : "none",
            maxHeight: searchOpen ? "80px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
            backgroundColor: "var(--surface)",
          }}
        >
          <div className="max-w-2xl mx-auto px-6 py-4">
            <input
              type="text"
              placeholder="Search jewelry, clothing..."
              style={{
                backgroundColor: "transparent",
                borderBottom: "1px solid var(--gold)",
                color: "var(--text)",
                outline: "none",
                width: "100%",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.05em",
              }}
              className="text-sm py-2 placeholder:text-gray-600"
              autoFocus={searchOpen}
            />
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          style={{
            maxHeight: menuOpen ? "400px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.4s ease",
            backgroundColor: "var(--surface)",
            borderTop: menuOpen ? "1px solid #2a2520" : "none",
          }}
        >
          <div className="px-6 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)} // ✅ direct click handler
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--text)",
                  letterSpacing: "0.15em",
                }}
                className="text-2xl font-light uppercase hover:text-amber-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div
              style={{ backgroundColor: "#2a2520" }}
              className="h-px w-full"
            />

            <p
              style={{ color: "var(--muted)" }}
              className="text-xs tracking-widest uppercase"
            >
              Free shipping over $300
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}

// ── Reusable NavLink sub-component ──
function NavLink({
  to,
  label,
  currentPath,
}: {
  to: string;
  label: string;
  currentPath: string;
}) {
  const isActive = currentPath === to.split("?")[0];

  return (
    <Link
      to={to}
      style={{
        color: isActive ? "var(--gold)" : "var(--muted)",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.12em",
        position: "relative",
      }}
      className="text-xs uppercase font-light hover:text-white transition-colors duration-200 group"
    >
      {label}
      {/* Gold underline slides in on hover */}
      <span
        style={{ backgroundColor: "var(--gold)" }}
        className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}
