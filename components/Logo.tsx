export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/assests/logo.png"
        alt="SiteCrafted Logo"
        className="h-full w-auto"
      />
      <span className="text-xl font-bold text-[var(--color-brand-primary)]">
        SiteCrafted
      </span>
    </div>
  );
}
