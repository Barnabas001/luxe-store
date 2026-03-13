export function SummaryRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        style={{ color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
        className="text-xs tracking-widest uppercase"
      >
        {label}
      </span>
      <span
        style={{
          color: valueColor ?? "var(--text)",
          fontFamily: "'DM Sans', sans-serif",
        }}
        className="text-sm"
      >
        {value}
      </span>
    </div>
  );
}
