export function ShopHeader({
  activeCategory,
  totalCount,
}: {
  activeCategory: string;
  totalCount: number;
}) {
  const title =
    activeCategory === "jewelry"
      ? "Jewelry"
      : activeCategory === "clothing"
        ? "Clothing"
        : "All Products";

  return (
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
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--text)",
          }}
          className="text-5xl lg:text-6xl font-light mb-3"
        >
          {title}
        </h1>
        <p
          style={{ color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
          className="text-xs tracking-[0.25em] uppercase"
        >
          {totalCount} {totalCount === 1 ? "piece" : "pieces"} available
        </p>
      </div>
    </div>
  );
}
