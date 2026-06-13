import React, { useState, useEffect } from "react";
import { getCandidateInterviews } from "../services/interviewApi.js";
import { getCandidateRecommendation, regenerateRecommendation } from "../services/interviewRecommendationApi.js";
import { InterviewCard } from "../components/interviews/InterviewCard.jsx";
import { AIInterviewCoach } from "../components/interview-recommendations/AIInterviewCoach.jsx";
import { 
  Calendar, 
  History, 
  Sparkles, 
  Brain, 
  Info,
  ChevronLeft
} from "lucide-react";
import { toast } from "react-toastify";

export default function MyInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Prep Details state
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [coachData, setCoachData] = useState(null);
  const [isLoadingCoach, setIsLoadingCoach] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const fetchInterviews = async () => {
    setIsLoading(true);
    try {
      const { data } = await getCandidateInterviews();
      setInterviews(data);
    } catch (error) {
      toast.error(error.message || "Failed to load interviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleOpenCoach = async (interviewId, applicationId) => {
    setSelectedApplicationId(applicationId);
    setIsLoadingCoach(true);
    try {
      const { data } = await getCandidateRecommendation(applicationId);
      setCoachData(data.recommendations);
    } catch (error) {
      toast.error(error.message || "Failed to load preparation recommendations");
    } finally {
      setIsLoadingCoach(false);
    }
  };

  const handleRegenerateCoach = async () => {
    if (!selectedApplicationId) return;
    setIsRegenerating(true);
    try {
      const { data } = await regenerateRecommendation(selectedApplicationId);
      setCoachData(data);
      toast.success("Preparation guide regenerated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to regenerate preparation recommendations");
    } finally {
      setIsRegenerating(false);
    }
  };

  const upcoming = interviews.filter(
    (i) => i.status === "scheduled" || i.status === "rescheduled"
  );
  
  const history = interviews.filter(
    (i) => i.status === "completed" || i.status === "cancelled"
  );

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl animate-settle">
      {selectedApplicationId && coachData ? (
        // Immersive AI Coach View
        <div className="space-y-4">
          <button 
            onClick={() => {
              setSelectedApplicationId(null);
              setCoachData(null);
            }}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-700 text-sm font-semibold hover:cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Interviews
          </button>
          
          {isLoadingCoach ? (
            <div className="p-12 text-center text-slate-500">Loading AI assessment coach...</div>
          ) : (
            <AIInterviewCoach 
              recommendation={coachData} 
              onRegenerate={handleRegenerateCoach} 
              isRegenerating={isRegenerating}
            />
          )}
        </div>
      ) : (
        // Main Grid list
        <>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-brand-blue)]">My Interviews</h1>
            <p className="text-slate-500 text-sm">View and prepare for scheduled interviews, check notes, and explore the AI Interview Coach.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Section */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[var(--color-brand-blue-light)]" />
                Upcoming Interviews
              </h2>

              {isLoading ? (
                <div className="p-8 text-center text-slate-500">Loading upcoming appointments...</div>
              ) : upcoming.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-200 bg-white rounded-xl text-slate-400 space-y-2">
                  <Info className="h-6 w-6 mx-auto text-slate-300" />
                  <p className="text-sm">You have no upcoming interviews scheduled at this time.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcoming.map((interview) => (
                    <InterviewCard
                      key={interview._id}
                      interview={interview}
                      role="candidate"
                      onViewPrep={handleOpenCoach}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* History Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <History className="h-5 w-5 text-slate-500" />
                Interview History
              </h2>

              {isLoading ? (
                <div className="p-8 text-center text-slate-500">Loading history...</div>
              ) : history.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-200 bg-white rounded-xl text-slate-400 text-sm">
                  No interview history available.
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((interview) => {
                    const date = new Date(interview.interviewDate);
                    return (
                      <div 
                        key={interview._id}
                        className="bg-white border border-(--color-border) p-4 rounded-xl shadow-xs flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{interview.jobId?.title || "Role"}</h4>
                          <p className="text-slate-500 text-xs">{interview.companyId?.name || "Company"}</p>
                          <span className="text-[10px] text-slate-400 block font-medium">
                            {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>
                        <div className="text-right space-y-1">
                          <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            interview.status === "completed" 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}>
                            {interview.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
