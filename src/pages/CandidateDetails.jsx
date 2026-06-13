import { useEffect, useState } from "react";
import CandidateProfileHeader from "../features/applications/components/details/CandidateProfileHeader";
import AIScreeningSummary from "../features/applications/components/details/AIScreeningSummary";
import WorkExperienceTimeline from "../features/applications/components/details/WorkExperienceTimeline";
import EducationSection from "../features/applications/components/details/EducationSection";
import InternalNotesSection from "../features/applications/components/details/InternalNotesSection";
import ResumeDownloadCard from "../features/applications/components/details/ResumeDownloadCard";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
} from "lucide-react";
import AIMatchScoreCircle from "../features/applications/components/details/AIMatchScoreCircle";
import ApplicationDetails from "../features/applications/components/details/ApplicationDetails";
import AIRecommendation from "../features/applications/components/details/AIRecommendation";
import CandidateDetailsSkeleton from "../features/applications/components/details/CandidateDetailsSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { useApplicationStore } from "../store/applicationStore";
import { useAuthStore } from "../store/authStore";
import {
  getCandidateRecommendation,
  getCompanyRecommendation,
} from "../services/interviewRecommendationApi.js";
import { AIInterviewCoach } from "../components/interview-recommendations/AIInterviewCoach.jsx";

export default function CandidateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentApplication, fetchApplicationDetails, loading } =
    useApplicationStore();
  const user = useAuthStore((s) => s.user);
  const isHR = user?.role === "employer";

  const [recommendation, setRecommendation] = useState(null);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);

  useEffect(() => {
    if (id) {
      fetchApplicationDetails(id);
    }
  }, [id, fetchApplicationDetails]);

  useEffect(() => {
    if (id && user) {
      const loadRecommendation = async () => {
        setLoadingRecommendation(true);
        try {
          const apiCall = isHR
            ? getCompanyRecommendation
            : getCandidateRecommendation;
          const { data } = await apiCall(id);
          if (data && data.recommendations) {
            setRecommendation(data.recommendations);
          }
        } catch (err) {
          console.log("No recommendation found or not ready yet.");
        } finally {
          setLoadingRecommendation(false);
        }
      };
      loadRecommendation();
    }
  }, [id, isHR, user]);

  if (loading || !currentApplication) {
    return <CandidateDetailsSkeleton />;
  }

  const candidate = {
    id: currentApplication._id,
    initials: currentApplication.candidateId?.fullName
      ? currentApplication.candidateId.fullName
          .split(" ")
          .filter(Boolean)
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "CN",
    name: currentApplication.candidateId?.fullName || "Candidate Name",
    role:
      currentApplication.candidateId?.profile?.basicInfo?.headline ||
      "Applicant",
    email: currentApplication.candidateId?.email || "",
    phone: currentApplication.candidateId?.profile?.basicInfo?.phone || "",
    location: currentApplication.candidateId?.profile?.basicInfo?.location
      ? `${currentApplication.candidateId.profile.basicInfo.location.city || ""}, ${currentApplication.candidateId.profile.basicInfo.location.country || ""}`.replace(
          /^,\s*|,\s*$/,
          "",
        )
      : "",
    experienceYears: currentApplication.candidateId?.profile?.resume?.parsedData
      ?.experienceYears
      ? `${currentApplication.candidateId.profile.resume.parsedData.experienceYears} years experience`
      : "Experience not specified",
    skills:
      currentApplication.aiScreening?.matchedSkills ||
      currentApplication.candidateId?.profile?.skills ||
      [],
    overallScore: currentApplication.aiScreening?.overallScore || 0,
    screeningSummary: [
      {
        label: "Skills Match",
        percentage: currentApplication.aiScreening?.skillsMatchScore || 0,
        desc:
          currentApplication.aiScreening?.skillsAnalysis ||
          "Skills matching analysis",
      },
      {
        label: "Experience",
        percentage: currentApplication.aiScreening?.experienceMatchScore || 0,
        desc:
          currentApplication.aiScreening?.experienceAnalysis ||
          "Experience matching analysis",
      },
      {
        label: "Culture Fit",
        percentage: currentApplication.aiScreening?.cultureFitScore || 0,
        desc:
          currentApplication.aiScreening?.cultureFitAnalysis ||
          "Culture fit matching analysis",
      },
      {
        label: "Education",
        percentage: currentApplication.aiScreening?.educationMatchScore || 0,
        desc:
          currentApplication.aiScreening?.educationAnalysis ||
          "Education matching analysis",
      },
    ],
    strengths: currentApplication.aiScreening?.strengths || [],
    experience: (currentApplication.candidateId?.profile?.experience || []).map(
      (exp) => ({
        role: exp.title,
        company: exp.company,
        period: `${exp.startDate ? new Date(exp.startDate).getFullYear() : ""} - ${exp.endDate ? new Date(exp.endDate).getFullYear() : exp.current ? "Present" : ""}`,
        desc: exp.description,
      }),
    ),
    education: currentApplication.candidateId?.profile?.education?.[0]
      ? {
          degree: currentApplication.candidateId.profile.education[0].degree,
          university:
            currentApplication.candidateId.profile.education[0].school,
          meta: `${currentApplication.candidateId.profile.education[0].fieldOfStudy || ""} • ${currentApplication.candidateId.profile.education[0].startDate ? new Date(currentApplication.candidateId.profile.education[0].startDate).getFullYear() : ""} - ${currentApplication.candidateId.profile.education[0].endDate ? new Date(currentApplication.candidateId.profile.education[0].endDate).getFullYear() : ""}`,
        }
      : { degree: "Not specified", university: "", meta: "" },
    meta: {
      appliedDate: new Date(currentApplication.createdAt).toLocaleDateString(),
      status: currentApplication.stage?.key || "applied",
      resumeName: currentApplication.resumeUrl
        ? currentApplication.resumeUrl.split("/").pop()
        : "resume.pdf",
      uploadedTime: "Uploaded at applying time",
    },
  };

  const latestInterview =
    currentApplication?.interviewIds?.length > 0
      ? currentApplication.interviewIds[
          currentApplication.interviewIds.length - 1
        ]
      : null;

  return (
    <div className="bg-slate-50/50 min-h-screen text-slate-800 font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-blue-950 mb-6 transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" />{" "}
          {isHR ? "Back to Pipeline" : "Back to Applications"}
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <CandidateProfileHeader candidate={candidate} hideActions={!isHR} />
            {isHR && (
              <AIScreeningSummary
                summary={candidate.screeningSummary}
                strengths={candidate.strengths}
              />
            )}
            <WorkExperienceTimeline experience={candidate.experience} />
            <EducationSection education={candidate.education} />
            {isHR && <InternalNotesSection applicationId={candidate.id} />}

            {recommendation && (
              <div className="pt-6 border-t border-gray-200">
                <AIInterviewCoach recommendation={recommendation} />
              </div>
            )}
          </div>
          <div className="space-y-6">
            {isHR && <AIMatchScoreCircle score={candidate.overallScore} />}
            <ApplicationDetails meta={candidate.meta} />

            {latestInterview && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Calendar className="h-4.5 w-4.5 text-indigo-500" />
                  Interview Details
                </h3>
                <div className="space-y-3.5">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block mb-1">
                      Status
                    </span>
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        latestInterview.status === "scheduled" ||
                        latestInterview.status === "rescheduled"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : latestInterview.status === "completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                      {latestInterview.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block mb-1">
                      Date & Time
                    </span>
                    <span className="text-slate-800 font-bold text-sm block">
                      {new Date(
                        latestInterview.interviewDate,
                      ).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-slate-500 text-xs block">
                      {new Date(
                        latestInterview.interviewDate,
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      ({latestInterview.timezone})
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block mb-1">
                      Type
                    </span>
                    <span className="text-slate-700 font-semibold text-sm capitalize">
                      {latestInterview.interviewType} Interview
                    </span>
                  </div>

                  {latestInterview.interviewType === "online" &&
                    latestInterview.meetingLink && (
                      <div>
                        <span className="text-xs text-slate-400 font-semibold block mb-1">
                          Meeting Link
                        </span>
                        <a
                          href={latestInterview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold underline flex items-center gap-1">
                          Join Video Call <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}

                  {latestInterview.interviewType === "onsite" &&
                    latestInterview.location && (
                      <div>
                        <span className="text-xs text-slate-400 font-semibold block mb-1">
                          Location
                        </span>
                        <span className="text-slate-700 text-xs font-medium">
                          {latestInterview.location}
                        </span>
                      </div>
                    )}

                  {latestInterview.notes && (
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Instructions
                      </span>
                      <p className="text-slate-600 text-xs whitespace-pre-line leading-relaxed">
                        {latestInterview.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <ResumeDownloadCard
              resumeName={candidate.meta.resumeName}
              uploadedTime={candidate.meta.uploadedTime}
              resumeUrl={currentApplication?.resumeUrl}
            />
            {isHR && <AIRecommendation />}
          </div>
        </div>
      </div>
    </div>
  );
}
