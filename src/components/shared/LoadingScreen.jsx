/**
 * Full-screen loading screen shown while the auth session is restoring.
 * Design: Premium brand-only loader — no technical status text.
 */
export function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      role="status"
      aria-label="Loading"
      aria-busy="true"
      style={{
        background: "linear-gradient(135deg, #f0f9ff 0%, #e8f4f8 40%, #eff6ff 100%)",
      }}
    >
      {/* Subtle animated background orbs */}
      <div
        className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
      />
      <div
        className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #1e3a8a, transparent)" }}
      />

      <div className="flex flex-col items-center gap-8 select-none">
        {/* Brand logo mark */}
        <div className="relative">
          {/* Outer glow ring — slow pulse */}
          <div
            className="absolute inset-0 rounded-3xl animate-ping opacity-20"
            style={{
              background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
              animationDuration: "2.4s",
            }}
          />
          {/* Logo tile */}
          <div
            className="relative w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)",
              boxShadow: "0 20px 60px -10px rgba(30,58,138,0.35), 0 8px 24px -4px rgba(59,130,246,0.2)",
            }}
          >
            <span className="text-white font-black text-3xl tracking-tight">N</span>
          </div>
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="text-2xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Naqla
          </span>
          <span className="text-xs font-medium text-slate-400 tracking-[0.2em] uppercase">
            AI Recruitment
          </span>
        </div>

        {/* Progress bar — smooth indeterminate fill */}
        <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
              animation: "naqlaProgress 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes naqlaProgress {
          0%   { width: 0%;   margin-left: 0%;   }
          50%  { width: 60%;  margin-left: 20%;  }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
