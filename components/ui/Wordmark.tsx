/* The RURO wordmark, set to match the supplied logo: classical roman capitals, no punctuation. */
export function Wordmark({ className = "", children = "RURO" }: { className?: string; children?: React.ReactNode }) {
  return <span className={`font-[family-name:var(--font-logo)] font-medium tracking-[0.06em] ${className}`}>{children}</span>;
}
