export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <span
        style={{ backgroundColor: "var(--gold)" }}
        className="block w-10 h-px"
      />
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "var(--text)",
        }}
        className="text-3xl font-light"
      >
        No pieces found
      </h3>
      <p
        style={{ color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
        className="text-xs tracking-widest uppercase"
      >
        Try adjusting your filters
      </p>
      <button
        onClick={onClear}
        style={{
          border: "1px solid var(--gold)",
          color: "var(--gold)",
          fontFamily: "'DM Sans', sans-serif",
        }}
        className="mt-4 px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-amber-500 hover:text-black transition-all"
      >
        Clear All Filters
      </button>
    </div>
  );
}
