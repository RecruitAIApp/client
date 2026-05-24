export function Card({ children, className = "", hover = false, onClick }) {
  return (
    <div
      className={`bg-white rounded-xl border border-(--color-border) shadow-sm ${hover ? "hover:shadow-lg hover:border-(--color-accent) transition-all duration-200 cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`p-6 border-b border-(--color-border) ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
