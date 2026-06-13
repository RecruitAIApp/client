import { AIScoreCircular } from "../../../../components/ui/AIScoreBadge";

export default function AIMatchScoreCircle({ score }) {
  const getScoreDescription = (s) => {
    const numScore = Number(s || 0);
    if (numScore >= 85) {
      return "This candidate is an excellent match for your requirements.";
    }
    if (numScore >= 70) {
      return "This candidate is a good match for your requirements.";
    }
    if (numScore >= 50) {
      return "This candidate is a partial match for your requirements.";
    }
    return "This candidate has low alignment with your requirements.";
  };

  const getScoreTagline = (s) => {
    const numScore = Number(s || 0);
    if (numScore >= 85) return "HIGHLY RECOMMENDED • STRONG FIT";
    if (numScore >= 70) return "POTENTIAL FIT • SOLID FOUNDATION";
    if (numScore >= 50) return "MODERATE ALIGNMENT • CAPABILITY GAPS";
    return "LOW ALIGNMENT • NOT RECOMMENDED";
  };

  const getTaglineClass = (s) => {
    const numScore = Number(s || 0);
    if (numScore >= 85) return "bg-emerald-50 text-emerald-800 border-emerald-100/50";
    if (numScore >= 70) return "bg-blue-50 text-blue-800 border-blue-100/50";
    if (numScore >= 50) return "bg-amber-50 text-amber-800 border-amber-100/50";
    return "bg-rose-50 text-rose-800 border-rose-100/50";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_4px_12px_rgba(15,23,42,0.03)] text-center space-y-6">
      <h3 className="font-extrabold text-sm text-(--color-secondary-main) text-left">AI Match Score</h3>
      <div className="flex flex-col space-y-3.5 items-center justify-center border-t border-slate-100 pt-6">
        <AIScoreCircular score={score} label="Match"/>
        
        {/* Dedicated metadata tagline right under progress wheel */}
        <span className={`text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full border transition-all duration-200 ease-in-out hover:scale-105 ${getTaglineClass(score)}`}>
          {getScoreTagline(score)}
        </span>

        <p className="text-xs text-(--color-secondary-muted) font-medium px-4 leading-relaxed mt-1">
          {getScoreDescription(score)}
        </p>
      </div>
    </div>
  );
}