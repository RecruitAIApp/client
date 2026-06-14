import { Brain, Target, BarChart3, Shield, Zap, Users, ChevronRight, Sparkles } from "lucide-react";

/* ── Split value prop section ── */
function ValuePropSection() {
  return (
    <div
      id="how-it-works"
      className="py-24"
      style={{ background: "#fafafa", borderTop: "1px solid #f1f5f9" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
          style={{ color: "#2563EB" }}
        >
          How it works
        </p>
        <h2
          className="font-black text-4xl lg:text-5xl mb-16 max-w-xl"
          style={{ color: "#0f172a", letterSpacing: "-0.03em" }}
        >
          AI that explains itself.
        </h2>

        {/* Asymmetric 2-col grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left large card */}
          <div
            className="lg:col-span-3 rounded-3xl p-8 flex flex-col justify-between min-h-[360px] relative overflow-hidden"
            style={{ background: "#eff6ff", border: "1px solid #dbeafe" }}
          >
            {/* Content */}
            <div>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "#2563EB" }}
              >
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3
                className="font-bold text-2xl mb-3"
                style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
              >
                Transparent AI scoring
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                Every match comes with a breakdown. Understand exactly why a candidate scores
                high — skills overlap, experience depth, culture signals — not just a number.
              </p>
            </div>

            {/* Mini score preview */}
            <div className="mt-8">
              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3" style={{ border: "1px solid #dbeafe" }}>
                {[
                  { label: "Technical Skills", pct: 97, color: "#2563EB" },
                  { label: "Team Fit", pct: 91, color: "#7c3aed" },
                  { label: "Industry Knowledge", pct: 84, color: "#0891b2" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 font-medium">{item.label}</span>
                      <span className="font-bold text-slate-800">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.pct}%`, background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative blob */}
            <div
              className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #2563EB, transparent)" }}
            />
          </div>

          {/* Right stack */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Card A */}
            <div
              className="rounded-3xl p-7 flex-1 flex flex-col justify-between"
              style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "#10b981" }}
              >
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3
                  className="font-bold text-xl mb-2"
                  style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
                >
                  Smart matching
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Multi-signal AI considers 40+ dimensions beyond keywords — culture, trajectory,
                  soft skills.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={{ color: "#10b981" }}>
                Learn more <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card B */}
            <div
              className="rounded-3xl p-7 flex-1 flex flex-col justify-between"
              style={{ background: "#fdf4ff", border: "1px solid #e9d5ff" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "#7c3aed" }}
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3
                  className="font-bold text-xl mb-2"
                  style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
                >
                  Analytics dashboard
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Real-time funnel metrics, time-to-hire tracking, and diversity insights in one
                  clear view.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={{ color: "#7c3aed" }}>
                Learn more <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 3-column secondary features strip ── */
const secondaryFeatures = [
  {
    icon: Shield,
    title: "Bias-free by design",
    desc: "Structured scoring removes names, photos, and demographic signals from initial ranking.",
    accent: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
  },
  {
    icon: Zap,
    title: "50% faster hires",
    desc: "Automated first-pass screening and ranked shortlists get you to offer stage in days, not weeks.",
    accent: "#2563EB",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  {
    icon: Users,
    title: "Candidate experience",
    desc: "Job seekers get transparent match feedback, not silence. Apply once, match everywhere.",
    accent: "#10b981",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
];

function SecondaryFeaturesStrip() {
  return (
    <div id="features" className="py-20" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {secondaryFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-7"
              style={{ background: f.bg, border: `1px solid ${f.border}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: f.accent }}
              >
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
              >
                {f.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Testimonials / social proof ── */
const testimonials = [
  {
    quote:
      "We cut our time-to-hire from 6 weeks to 12 days. The AI explanations make it easy to defend every shortlisting decision to the team.",
    name: "Rania Hassan",
    title: "Head of People, Breadfast",
    initials: "RH",
    color: "#2563EB",
  },
  {
    quote:
      "I finally got callbacks. Naqla showed me exactly where my profile was weak and helped me fix it. Three interviews in two weeks.",
    name: "Karim Soliman",
    title: "Software Engineer",
    initials: "KS",
    color: "#7c3aed",
  },
  {
    quote:
      "The match scores are genuinely useful — not just a black box. We use them as conversation starters in interviews.",
    name: "Sara Abdel-Fattah",
    title: "Talent Acquisition Lead, Paymob",
    initials: "SA",
    color: "#10b981",
  },
];

function TestimonialsSection() {
  return (
    <div
      id="testimonials"
      className="py-24"
      style={{ background: "#fafafa", borderTop: "1px solid #f1f5f9" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#2563EB" }}
          >
            Social proof
          </p>
          <h2
            className="font-black text-4xl"
            style={{ color: "#0f172a", letterSpacing: "-0.03em" }}
          >
            Trusted by teams that{" "}
            <span style={{ color: "#2563EB" }}>hire well.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl p-7 bg-white flex flex-col justify-between"
              style={{ border: "1px solid #f1f5f9", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
            >
              {/* Quote mark */}
              <div>
                <span
                  className="text-5xl font-black leading-none"
                  style={{ color: t.color, opacity: 0.2 }}
                >
                  "
                </span>
                <p className="text-slate-700 text-sm leading-relaxed -mt-3">{t.quote}</p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-5" style={{ borderTop: "1px solid #f1f5f9" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main export: assembles all sub-sections ── */
export default function FeaturesSection() {
  return (
    <>
      <ValuePropSection />
      <SecondaryFeaturesStrip />
      <TestimonialsSection />
    </>
  );
}
