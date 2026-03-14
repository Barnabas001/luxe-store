import { Link } from "react-router-dom";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const links = {
    Shop: [
      { label: "All Products", to: "/shop" },
      { label: "Jewelry", to: "/shop?category=jewelry" },
      { label: "Clothing", to: "/shop?category=clothing" },
      { label: "New Arrivals", to: "/shop" },
      { label: "Sale", to: "/shop" },
    ],
    Company: [
      { label: "About Us", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Press", to: "/" },
      { label: "Sustainability", to: "/" },
    ],
    Support: [
      { label: "Contact Us", to: "/" },
      { label: "Shipping Info", to: "/" },
      { label: "Returns", to: "/" },
      { label: "Size Guide", to: "/" },
      { label: "FAQ", to: "/" },
    ],
  };

  const socials = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
  ];

  return (
    <footer
      style={{
        backgroundColor: "var(--surface)",
        borderTop: "1px solid #1a1a1a",
      }}
    >
      {/* ── NEWSLETTER BANNER ── */}
      <div
        style={{
          borderBottom: "1px solid #1a1a1a",
          background:
            "linear-gradient(to right, #111 0%, #1a1612 50%, #111 100%)",
        }}
        className="py-14 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span
              style={{ backgroundColor: "var(--gold)" }}
              className="block w-10 h-px mb-4"
            />
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--text)",
              }}
              className="text-3xl lg:text-4xl font-light mb-2"
            >
              Join the Inner Circle
            </h3>
            <p
              style={{
                color: "var(--muted)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              className="text-xs tracking-[0.2em] uppercase"
            >
              Early access · Exclusive drops · Members-only offers
            </p>
          </div>

          {/* Newsletter input */}
          {subscribed ? (
            <div className="flex items-center gap-3">
              <span
                style={{ backgroundColor: "var(--gold)" }}
                className="block w-6 h-px"
              />
              <p
                style={{
                  color: "var(--gold)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                className="text-xs tracking-[0.2em] uppercase"
              >
                ✓ You're on the list
              </p>
            </div>
          ) : (
            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #2a2520",
                  borderRight: "none",
                  color: "var(--text)",
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                  minWidth: "280px",
                }}
                className="px-5 py-3 text-xs tracking-widest placeholder:text-gray-700 flex-1 lg:flex-none focus:border-amber-800 transition-colors"
              />
              <button
                onClick={handleSubscribe}
                style={{
                  backgroundColor: "var(--gold)",
                  color: "var(--black)",
                  fontFamily: "'DM Sans', sans-serif",
                  flexShrink: 0,
                }}
                className="px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium flex items-center gap-2 hover:bg-amber-400 transition-colors"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--gold-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--gold)";
                }}
              >
                Subscribe <ArrowRight size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column — takes 2 cols */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-6">
              <span
                style={{ backgroundColor: "var(--gold)" }}
                className="block w-8 h-px mb-3"
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--text)",
                  letterSpacing: "0.15em",
                }}
                className="text-2xl font-light uppercase block"
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
            </div>

            <p
              style={{
                color: "var(--muted)",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: "1.8",
              }}
              className="text-sm mb-8 max-w-xs"
            >
              Luxury jewelry and clothing crafted for those who refuse the
              ordinary. Every piece tells a story.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    border: "1px solid #2a2520",
                    color: "var(--muted)",
                    transition: "all 0.2s ease",
                  }}
                  className="w-9 h-9 flex items-center justify-center hover:border-amber-500 hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <div className="flex items-center gap-2 mb-6">
                <span
                  style={{ backgroundColor: "var(--gold)" }}
                  className="block w-4 h-px"
                />
                <h4
                  style={{
                    color: "var(--text)",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.2em",
                  }}
                  className="text-[10px] uppercase font-medium"
                >
                  {heading}
                </h4>
              </div>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      style={{
                        color: "var(--muted)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      className="text-sm hover:text-white transition-colors duration-200 relative group"
                    >
                      {item.label}
                      <span
                        style={{ backgroundColor: "var(--gold)" }}
                        className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        style={{ borderTop: "1px solid #1a1a1a" }}
        className="px-6 lg:px-12 py-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="text-[10px] tracking-widest uppercase"
          >
            © {new Date().getFullYear()} Extreme Hub Enterprise. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="text-[10px] tracking-widest uppercase hover:text-white transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
