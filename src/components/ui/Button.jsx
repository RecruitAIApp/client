export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const baseStyles =
    "rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-blue-light)] active:scale-95",
    secondary:
      "bg-[var(--color-brand-teal)] text-white hover:bg-[var(--color-brand-teal-light)] hover:text-[var(--color-brand-blue)] active:scale-95",
    outline:
      "border-2 border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)] hover:text-white active:scale-95",
    ghost: "text-[var(--color-brand-blue)] hover:bg-blue-50 active:scale-95",
    destructive: "bg-red-600 text-white hover:bg-red-700 active:scale-95",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5",
    lg: "px-8 py-3.5 text-lg",
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
