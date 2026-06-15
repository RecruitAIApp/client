import { useEffect, useRef } from "react";
import { ArrowRight, Building2, CheckCircle2, Sparkles, ChevronRight } from "lucide-react";

/* ── Animated AI Match card – the "platform peek" UI preview ── */
const bars = [
  { label: "Skills Match", pct: 95, color: "#2563EB" },
  { label: "Experience", pct: 88, color: "#1e3a8a" },
  { label: "Culture Fit", pct: 92, color: "#7c3aed" },
  { label: "Education", pct: 85, color: "#0891b2" },
];

function AIMatchCard() {
  const barRefs = useRef([]);
  useEffect(() => {
    const t = setTimeout(() => {
      barRefs.current.forEach((el, i) => {
        if (el) el.style.width = `${bars[i].pct}%`;
      });
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative">
      {/* Browser chrome */}
      <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid #dbeafe" }}>
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "#f0f6ff", borderBottom: "1px solid #dbeafe" }}
        >
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <span
            className="flex-1 text-xs text-center font-medium mx-8 rounded-md px-3 py-1"
            style={{ background: "white", color: "#64748b" }}
          >
            Naqla.app — AI Match Analysis
          </span>
        </div>

        {/* Card body */}
        <div className="bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Live Analysis
              </p>
              <h3 className="text-slate-900 font-bold text-lg leading-tight">
                Senior Frontend Engineer
              </h3>
              <p className="text-sm text-slate-500">Acme Corp · Cairo, EG</p>
            </div>
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0 group">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-100" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="url(#blue-gradient)"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="175.9"
                  strokeDashoffset="17.6"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out drop-shadow-sm group-hover:drop-shadow-[0_0_6px_rgba(37,99,235,0.5)]"
                />
                <defs>
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex flex-col items-center justify-center z-10">
                <span className="text-[19px] font-black text-slate-900 tracking-tighter leading-none">
                  90<span className="text-[10px] font-bold text-slate-400 ml-0.5">%</span>
                </span>
                <span className="text-[8px] font-extrabold text-blue-600 uppercase tracking-widest mt-0.5">Match</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            {bars.map((bar, i) => (
              <div key={bar.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500 font-medium">{bar.label}</span>
                  <span className="text-xs font-bold text-slate-700">{bar.pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    ref={(el) => (barRefs.current[i] = el)}
                    className="h-full rounded-full transition-all duration-[1200ms] ease-out"
                    style={{ width: "0%", backgroundColor: bar.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center gap-2 p-3 rounded-xl text-xs font-medium"
            style={{ background: "#eff6ff", color: "#1d4ed8" }}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            Strong match — apply now to get ahead of 47 other applicants
          </div>
        </div>
      </div>

      {/* Floating stat chips */}
      <div
        className="absolute -left-6 top-16 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
        style={{ border: "1px solid #dbeafe" }}
      >
        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm bg-green-50">✅</span>
        <div>
          <p className="text-xs font-bold text-slate-800">12k+</p>
          <p className="text-[10px] text-slate-400">Placements</p>
        </div>
      </div>
      <div
        className="absolute -right-6 bottom-20 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
        style={{ border: "1px solid #dbeafe" }}
      >
        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm bg-blue-50">⚡</span>
        <div>
          <p className="text-xs font-bold text-slate-800">3× faster</p>
          <p className="text-[10px] text-slate-400">Time-to-hire</p>
        </div>
      </div>
    </div>
  );
}

/* ── Stats row ── */
const stats = [
  { value: "50k+", label: "Candidates placed" },
  { value: "3,200+", label: "Hiring companies" },
  { value: "3×", label: "Faster hiring" },
  { value: "94%", label: "Match accuracy" },
];

export default function HeroSection({ onNavigate }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 100% 80% at 50% -10%, #dbeafe 0%, #eff6ff 40%, #ffffff 75%)",
      }}
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 -z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(to right, #1e3a8a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-0 lg:pt-40">
        {/* Centered top badge */}
        <div className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full"
            style={{
              background: "#eff6ff",
              color: "#1d4ed8",
              border: "1px solid #bfdbfe",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Powered by Explainable AI · Now in Beta
          </span>
        </div>

        {/* Centered headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1
            className="font-black leading-[1.08] mb-6"
            style={{
              fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
              color: "#0f172a",
              letterSpacing: "-0.03em",
            }}
          >
            Talent, not{" "}
            <span style={{ color: "#2563EB" }}>guesswork.</span>
          </h1>
          <p
            className="text-lg mx-auto max-w-2xl leading-relaxed"
            style={{ color: "#475569" }}
          >
            Naqla matches the right candidates to the right roles using transparent AI —
            so every hire makes sense. Built for both job seekers and modern hiring teams.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            id="hero-find-job-btn"
            onClick={() => onNavigate("/register")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "#2563EB",
              boxShadow: "0 4px 20px rgba(37,99,235,0.35)",
            }}
          >
            Find Your Dream Job
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            id="hero-hire-talent-btn"
            onClick={() => onNavigate("/register")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 bg-white"
            style={{
              color: "#0f172a",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <Building2 className="w-4 h-4" />
            Hire Top Talent
          </button>
        </div>

        {/* Trust micro-copy */}
        <div className="flex flex-wrap justify-center items-center gap-5 mb-16 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Free for candidates
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            No credit card required
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Setup in 5 minutes
          </span>
        </div>

        {/* Product mockup — peeking from bottom */}
        <div className="max-w-xl mx-auto relative">
          <AIMatchCard />
          {/* Bottom fade-into-next-section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #ffffff)",
            }}
          />
        </div>
      </div>

      {/* Stats strip */}
      <div
        className="relative z-10 mt-0"
        style={{ background: "#ffffff", borderTop: "1px solid #f1f5f9" }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="font-black text-3xl mb-1"
                  style={{ color: "#2563EB", letterSpacing: "-0.03em" }}
                >
                  {s.value}
                </p>
                <p className="text-sm text-slate-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
