export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const baseStyles =
    "rounded-[24px] font-bold tracking-wide transition-all duration-300 ease-out flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95";

  const variants = {
    primary:
      "bg-[var(--color-primary-main)] text-white shadow-[0_4px_14px_rgba(29,78,216,0.3)] hover:shadow-[0_6px_20px_rgba(29,78,216,0.4)] hover:bg-blue-700 hover:scale-[1.02] hover:cursor-pointer",
    secondary:
      "bg-[var(--color-secondary-main)] text-white shadow-[0_4px_12px_rgba(15,23,42,0.15)] hover:shadow-[0_6px_18px_rgba(15,23,42,0.25)] hover:bg-slate-800 hover:scale-[1.02] hover:cursor-pointer",
    outline:
      "border border-[var(--color-primary-main)] bg-white text-[var(--color-primary-main)] shadow-[0_4px_12px_rgba(29,78,216,0.05)] hover:shadow-[0_6px_16px_rgba(29,78,216,0.1)] hover:bg-[var(--color-bg-light-tint)] hover:scale-[1.02] hover:cursor-pointer",
    ghost:
      "text-[var(--color-primary-main)] hover:bg-[var(--color-bg-light-tint)] hover:scale-[1.02] hover:cursor-pointer",
    destructive:
      "bg-red-600 text-white shadow-[0_4px_14px_rgba(220,38,38,0.25)] hover:shadow-[0_6px_18px_rgba(220,38,38,0.35)] hover:bg-red-700 hover:scale-[1.02] hover:cursor-pointer",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs md:text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base md:text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
