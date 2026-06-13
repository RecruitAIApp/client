export function Card({ children, className = "", hover = false, onClick }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${hover ? "hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.1)] hover:border-blue-100 transition-all duration-300 cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`p-6 border-b border-slate-100 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
