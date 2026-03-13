export function CategoryTabs({
  activeCategory,
  onChange,
}: {
  activeCategory: string;
  onChange: (cat: "all" | "jewelry" | "clothing") => void;
}) {
  const tabs: { label: string; value: "all" | "jewelry" | "clothing" }[] = [
    { label: "Everything", value: "all" },
    { label: "Jewelry", value: "jewelry" },
    { label: "Clothing", value: "clothing" },
  ];

  return (
    <div
      style={{ borderBottom: "1px solid #1a1a1a" }}
      className="flex max-w-7xl mx-auto px-6 lg:px-12"
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color:
              activeCategory === tab.value ? "var(--gold)" : "var(--muted)",
            borderBottom:
              activeCategory === tab.value
                ? "1px solid var(--gold)"
                : "1px solid transparent",
            transition: "all 0.2s ease",
          }}
          className="px-6 py-4 text-xs tracking-[0.2em] uppercase hover:text-white -mb-px"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
