import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CTASection({ onNavigate }) {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 120% 100% at 50% 110%, #dbeafe 0%, #eff6ff 50%, #ffffff 80%)",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(to right, #2563EB 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-28 text-center">
        {/* Badge */}
        <span
          className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-8"
          style={{
            background: "#eff6ff",
            color: "#2563EB",
            border: "1px solid #bfdbfe",
          }}
        >
          Get started today
        </span>

        <h2
          className="font-black mb-6"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            color: "#0f172a",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Your next great hire{" "}
          <span style={{ color: "#2563EB" }}>starts here.</span>
        </h2>

        <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Join 3,200+ companies and 50k+ candidates using transparent AI to find perfect fits.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            id="cta-get-started-btn"
            onClick={() => onNavigate("/register")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "#2563EB",
              boxShadow: "0 4px 20px rgba(37,99,235,0.35)",
            }}
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            id="cta-login-btn"
            onClick={() => onNavigate("/login")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-700 text-sm bg-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            Sign In
          </button>
        </div>

        {/* Micro trust row */}
        <div className="flex flex-wrap justify-center gap-5 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Free for job seekers, always
          </span>
          <span className="w-px h-3 bg-slate-200 self-center" />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            No credit card
          </span>
          <span className="w-px h-3 bg-slate-200 self-center" />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            GDPR compliant
          </span>
        </div>
      </div>
    </section>
  );
}
