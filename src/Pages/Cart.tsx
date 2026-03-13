import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useState } from "react";
import { SummaryRow } from "../../cartComponent/SummaryRow";

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  // Valid promo code for demo
  const VALID_PROMO = "EXTREME20";
  const discount = promoApplied ? totalPrice * 0.2 : 0;
  const shipping = totalPrice >= 300 ? 0 : 25;
  const finalTotal = totalPrice - discount + shipping;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === VALID_PROMO) {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  // ── Empty cart state ──
  if (items.length === 0) {
    return (
      <main
        style={{ backgroundColor: "var(--black)", minHeight: "100vh" }}
        className="flex flex-col items-center justify-center gap-8 px-6"
      >
        <span
          style={{ backgroundColor: "var(--gold)" }}
          className="block w-10 h-px"
        />
        <ShoppingBag size={48} style={{ color: "#2a2520" }} />
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--text)",
          }}
          className="text-4xl font-light"
        >
          Your Cart is Empty
        </h1>
        <p
          style={{ color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-xs tracking-[0.25em] uppercase text-center"
        >
          Looks like you haven't added anything yet
        </p>
        <Link
          to="/shop"
          style={{
            backgroundColor: "var(--gold)",
            color: "var(--black)",
            fontFamily: "'DM Sans', sans-serif",
          }}
          className="flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium mt-4"
        >
          Start Shopping
          <ArrowRight size={14} />
        </Link>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--black)", minHeight: "100vh" }}>
      {/* ── PAGE HEADER ── */}
      <div
        style={{
          borderBottom: "1px solid #1a1a1a",
          background: "linear-gradient(to bottom, #111 0%, var(--black) 100%)",
        }}
        className="py-16 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <span
            style={{ backgroundColor: "var(--gold)" }}
            className="block w-10 h-px mb-4"
          />
          <div className="flex items-end justify-between">
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--text)",
              }}
              className="text-5xl lg:text-6xl font-light"
            >
              Your Cart
            </h1>
            <div className="flex items-center gap-4">
              <span
                style={{
                  color: "var(--muted)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                className="text-xs tracking-widest uppercase hidden sm:block"
              >
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
              <button
                onClick={clearCart}
                style={{
                  color: "var(--muted)",
                  fontFamily: "'DM Sans', sans-serif",
                  border: "1px solid #2a2520",
                }}
                className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 hover:text-white hover:border-gray-500 transition-all"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ── LEFT: Cart Items (takes 2 cols) ── */}
          <div className="lg:col-span-2 flex flex-col gap-0">
            {/* Column headers */}
            <div
              style={{ borderBottom: "1px solid #1a1a1a" }}
              className="hidden sm:grid grid-cols-12 pb-3 mb-2"
            >
              {["Product", "", "Quantity", "Total"].map((h, i) => (
                <span
                  key={i}
                  style={{
                    color: "var(--muted)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className={`text-[10px] tracking-[0.2em] uppercase ${
                    i === 0
                      ? "col-span-2"
                      : i === 1
                        ? "col-span-4"
                        : i === 2
                          ? "col-span-4 text-center"
                          : "col-span-2 text-right"
                  }`}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Cart Items */}
            {items.map((item, index) => (
              <CartItem
                key={`${item.product.id}-${item.size}`}
                item={item}
                index={index}
                onRemove={() => removeFromCart(item.product.id)}
                onUpdateQuantity={(qty) => updateQuantity(item.product.id, qty)}
              />
            ))}
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="lg:col-span-1">
            <OrderSummary
              totalPrice={totalPrice}
              discount={discount}
              shipping={shipping}
              finalTotal={finalTotal}
              promoCode={promoCode}
              promoApplied={promoApplied}
              promoError={promoError}
              onPromoChange={setPromoCode}
              onPromoApply={handlePromo}
            />
          </div>
        </div>

        {/* ── CONTINUE SHOPPING ── */}
        <div
          style={{ borderTop: "1px solid #1a1a1a" }}
          className="mt-12 pt-8 flex justify-start"
        >
          <Link
            to="/shop"
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

// CART ITEM ROW
function CartItem({
  item,
  index,
  onRemove,
  onUpdateQuantity,
}: {
  item: ReturnType<typeof useCart>["items"][0];
  index: number;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}) {
  return (
    <div
      style={{
        borderBottom: "1px solid #1a1a1a",
        animationDelay: `${index * 80}ms`,
      }}
      className="grid grid-cols-12 gap-4 py-6 items-center"
    >
      {/* Product image */}
      <div className="col-span-2">
        <Link to={`/product/${item.product.id}`}>
          <div
            className="aspect-square overflow-hidden"
            style={{ backgroundColor: "var(--surface)" }}
          >
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
      </div>

      {/* Product info */}
      <div className="col-span-4 flex flex-col gap-1 pl-2">
        <span
          style={{ color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-[10px] tracking-[0.2em] uppercase "
        >
          {item.product.category} · {item.product.subcategory}
        </span>
        <Link to={`/product/${item.product.id}`}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--text)",
            }}
            className="text-lg font-light hover:text-amber-300 transition-colors leading-tight"
          >
            {item.product.name}
          </h3>
        </Link>
        {item.size && (
          <span
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
              border: "1px solid #2a2520",
            }}
            className="text-[10px] tracking-widest uppercase px-2 py-0.5 w-fit mt-1"
          >
            Size: {item.size}
          </span>
        )}
        <span
          style={{ color: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-sm mt-1"
        >
          ${item.product.price}
        </span>
      </div>

      {/* Quantity stepper */}
      <div className="col-span-4 flex items-center justify-center gap-0">
        <button
          onClick={() => onUpdateQuantity(item.quantity - 1)}
          style={{ border: "1px solid #2a2520", color: "var(--muted)" }}
          className="w-8 h-8 flex items-center justify-center hover:text-white hover:border-amber-500 transition-all"
        >
          <Minus size={10} />
        </button>
        <span
          style={{
            borderTop: "1px solid #2a2520",
            borderBottom: "1px solid #2a2520",
            color: "var(--text)",
            fontFamily: "'DM Sans', sans-serif",
          }}
          className="w-10 h-8 flex items-center justify-center text-sm"
        >
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.quantity + 1)}
          style={{ border: "1px solid #2a2520", color: "var(--muted)" }}
          className="w-8 h-8 flex items-center justify-center hover:text-white hover:border-amber-500 transition-all"
        >
          <Plus size={10} />
        </button>
      </div>

      {/* Line total + remove */}
      <div className="col-span-2 flex flex-col items-end gap-2">
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--text)",
          }}
          className="text-lg font-light"
        >
          ${(item.product.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={onRemove}
          style={{ color: "var(--muted)" }}
          className="hover:text-red-400 transition-colors"
          aria-label="Remove item"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

// ORDER SUMMARY
function OrderSummary({
  totalPrice,
  discount,
  shipping,
  finalTotal,
  promoCode,
  promoApplied,
  promoError,
  onPromoChange,
  onPromoApply,
}: {
  totalPrice: number;
  discount: number;
  shipping: number;
  finalTotal: number;
  promoCode: string;
  promoApplied: boolean;
  promoError: boolean;
  onPromoChange: (val: string) => void;
  onPromoApply: () => void;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid #1a1a1a",
      }}
      className="p-6 lg:p-8 sticky top-28"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <span
          style={{ backgroundColor: "var(--gold)" }}
          className="block w-6 h-px"
        />
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--text)",
          }}
          className="text-2xl font-light"
        >
          Order Summary
        </h2>
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-4 mb-6">
        <SummaryRow label="Subtotal" value={`$${totalPrice.toFixed(2)}`} />
        {discount > 0 && (
          <SummaryRow
            label="Promo (20% off)"
            value={`-$${discount.toFixed(2)}`}
            valueColor="#6abf6a"
          />
        )}
        <SummaryRow
          label="Shipping"
          value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          valueColor={shipping === 0 ? "var(--gold)" : undefined}
        />
        {shipping > 0 && (
          <p
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="text-[10px] tracking-widest uppercase -mt-2"
          >
            Free shipping on orders over $300
          </p>
        )}
      </div>

      {/* Divider */}
      <div
        style={{ backgroundColor: "#1a1a1a" }}
        className="h-px w-full mb-6"
      />

      {/* Total */}
      <div className="flex items-baseline justify-between mb-8">
        <span
          style={{ color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-xs tracking-[0.2em] uppercase"
        >
          Total
        </span>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--gold)",
          }}
          className="text-3xl font-light"
        >
          ${finalTotal.toFixed(2)}
        </span>
      </div>

      {/* Promo code input */}
      <div className="mb-6">
        <div className="flex gap-0">
          <div className="relative flex-1">
            <Tag
              size={12}
              style={{ color: "var(--muted)" }}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => onPromoChange(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && onPromoApply()}
              style={{
                backgroundColor: "var(--black)",
                border: promoError
                  ? "1px solid #e07070"
                  : promoApplied
                    ? "1px solid #6abf6a"
                    : "1px solid #2a2520",
                color: "var(--text)",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                transition: "border 0.2s ease",
              }}
              className="w-full pl-8 pr-4 py-3 text-xs tracking-widest uppercase placeholder:text-gray-700"
              disabled={promoApplied}
            />
          </div>
          <button
            onClick={onPromoApply}
            disabled={promoApplied || !promoCode}
            style={{
              backgroundColor: promoApplied ? "#2a4a2a" : "var(--gold)",
              color: promoApplied ? "#6abf6a" : "var(--black)",
              fontFamily: "'DM Sans', sans-serif",
              opacity: !promoCode && !promoApplied ? 0.5 : 1,
              transition: "all 0.2s ease",
            }}
            className="px-4 text-[10px] tracking-[0.15em] uppercase font-medium shrink-0"
          >
            {promoApplied ? "✓" : "Apply"}
          </button>
        </div>

        {/* Promo feedback */}
        {promoError && (
          <p
            style={{ color: "#e07070", fontFamily: "'DM Sans', sans-serif" }}
            className="text-[10px] tracking-widest uppercase mt-2"
          >
            Invalid promo code
          </p>
        )}
        {promoApplied && (
          <p
            style={{ color: "#6abf6a", fontFamily: "'DM Sans', sans-serif" }}
            className="text-[10px] tracking-widest uppercase mt-2"
          >
            ✓ EXTREME20 applied — 20% off
          </p>
        )}

        {/* Hint */}
        {!promoApplied && !promoError && (
          <p
            style={{
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="text-[10px] mt-2"
          >
            Try: <span style={{ color: "var(--gold)" }}>EXTREME20</span>
          </p>
        )}
      </div>

      {/* Checkout button */}
      <button
        style={{
          backgroundColor: "var(--gold)",
          color: "var(--black)",
          fontFamily: "'DM Sans', sans-serif",
          width: "100%",
        }}
        className="flex items-center justify-center gap-3 py-4 text-xs tracking-[0.2em] uppercase font-medium mb-4 hover:bg-amber-400 transition-colors"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            "var(--gold-light)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            "var(--gold)";
        }}
      >
        Proceed to Checkout
        <ArrowRight size={14} />
      </button>

      {/* Payment icons */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {["Visa", "MC", "Amex", "PayPal"].map((method) => (
          <span
            key={method}
            style={{
              border: "1px solid #2a2520",
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="text-[9px] tracking-widest uppercase px-2 py-1"
          >
            {method}
          </span>
        ))}
      </div>
    </div>
  );
}
