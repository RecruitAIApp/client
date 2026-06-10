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

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center space-y-6">
      <h3 className="font-bold text-sm text-slate-900 text-left">AI Match Score</h3>
      <div className="flex flex-col space-y-1.5 items-center justify-center border-t border-gray-100 pt-6">
        <AIScoreCircular score={score}/>
        <p className="text-xs text-gray-400 font-medium px-4">
          {getScoreDescription(score)}
        </p>
      </div>
    </div>
  );
}