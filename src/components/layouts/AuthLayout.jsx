import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, Check } from "lucide-react";
import { Button } from "../ui/Button";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const marketingFeatures = [
    "AI-powered job matching",
    "Transparent screening process",
    "Real-time application tracking",
    "Bias-free candidate evaluation",
  ];

  return (
    <div className="min-h-screen bg-linear-to-tr from-brand-blue/[0.02] to-brand-teal/[0.04] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Masar Homepage"
          >
            <div className="w-9 h-9 bg-linear-to-br from-brand-blue to-brand-teal rounded-lg flex items-center justify-center shadow-md shadow-brand-blue/10 transform group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-extrabold text-lg select-none">M</span>
            </div>
            <span className="text-xl font-black bg-linear-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent tracking-tight">
              Masar
            </span>
          </button>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            {isLoginPage ? (
              <>
                <span className="text-sm text-slate-500 hidden sm:inline select-none">New to Masar?</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/register")}
                  className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                >
                  Get Started
                </Button>
              </>
            ) : (
              <>
                <span className="text-sm text-slate-500 hidden sm:inline select-none">Already have an account?</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl w-full mx-auto">
        {/* Left Side: Branding / Marketing (Desktop only) */}
        <section className="lg:col-span-5 hidden lg:flex flex-col justify-center px-12 xl:px-16 py-12 text-left border-r border-slate-100">
          <div className="space-y-8 max-w-md">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-100 rounded-full text-brand-teal text-xs font-semibold select-none w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Recruitment</span>
            </div>

            {/* Title & Desc */}
            <div className="space-y-4">
              <h1 className="text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Welcome to <span className="bg-linear-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">Masar</span>
              </h1>
              <p className="text-slate-500 text-base leading-relaxed">
                Join the future of intelligent recruitment. Find perfect matches with explainable AI.
              </p>
            </div>

            {/* Feature List */}
            <ul className="space-y-4 pt-4" aria-label="Key Platform Features">
              {marketingFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3.5 text-slate-600 text-sm font-medium">
                  <div className="w-6.5 h-6.5 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center text-brand-teal shadow-xs shrink-0 select-none">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Right Side: Form / Children Container */}
        <section className="lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12">
          {children}
        </section>
      </main>
    </div>
  );
}
