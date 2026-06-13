import React from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Phone, 
  ExternalLink, 
  FileText, 
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { InterviewStatusBadge } from "./InterviewStatusBadge.jsx";
import { Button } from "../ui/Button.jsx";

export function InterviewCard({ 
  interview, 
  role = "candidate", 
  onReschedule, 
  onCancel, 
  onComplete,
  onViewPrep 
}) {
  const {
    _id,
    jobId,
    companyId,
    interviewType,
    interviewDate,
    duration,
    timezone,
    meetingLink,
    location,
    notes,
    status
  } = interview;

  const dateObj = new Date(interviewDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getIcon = () => {
    switch (interviewType?.toLowerCase()) {
      case "online":
        return <Video className="h-5 w-5 text-indigo-500" />;
      case "onsite":
        return <MapPin className="h-5 w-5 text-emerald-500" />;
      case "phone":
        return <Phone className="h-5 w-5 text-sky-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  const isScheduled = status === "scheduled" || status === "rescheduled";

  return (
    <div className="bg-white border border-(--color-border) rounded-xl shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] flex flex-col h-full">
      {/* Top Section */}
      <div className="p-5 flex-1 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-slate-800 line-clamp-1">
              {jobId?.title || "Position Title"}
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              {companyId?.name || "Company Name"}
            </p>
          </div>
          <InterviewStatusBadge status={status} />
        </div>

        {/* Date Time info */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-3 text-slate-600 text-sm">
            <Calendar className="h-4.5 w-4.5 text-slate-400 shrink-0" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 text-sm">
            <Clock className="h-4.5 w-4.5 text-slate-400 shrink-0" />
            <span>
              <strong className="text-slate-700">{formattedTime}</strong> ({timezone}) &bull; <span className="text-slate-500">{duration} mins</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-600 text-sm">
            <div className="shrink-0">{getIcon()}</div>
            <span className="capitalize font-medium text-slate-700">{interviewType} Interview</span>
          </div>
        </div>

        {/* Location or Meeting Link */}
        {isScheduled && (
          <div className="pt-1">
            {interviewType === "online" && meetingLink && (
              <a 
                href={meetingLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-all w-full justify-center"
              >
                <Video className="h-4 w-4" />
                Join Video Call
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            
            {interviewType === "onsite" && location && (
              <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 text-emerald-800 p-2.5 rounded-lg text-sm">
                <MapPin className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Office Location:</span>
                  <span className="text-slate-600 text-xs">{location}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        {notes && (
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-slate-500" />
              Preparation Notes:
            </span>
            <p className="line-clamp-3 leading-relaxed whitespace-pre-line">{notes}</p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-2 justify-between items-center">
        {onViewPrep && (
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={() => onViewPrep(_id, interview.applicationId)}
            className="flex-1 min-w-[120px] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 font-semibold"
          >
            <CheckCircle className="h-4 w-4" />
            Prep Coach
          </Button>
        )}

        {role === "employer" && isScheduled && (
          <div className="flex gap-2 w-full mt-2 sm:mt-0 sm:w-auto">
            {onComplete && (
              <button 
                onClick={() => onComplete(_id)}
                title="Mark Completed"
                className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all border border-emerald-200 bg-white"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
            )}
            {onReschedule && (
              <Button size="sm" variant="outline" onClick={() => onReschedule(interview)}>
                Edit
              </Button>
            )}
            {onCancel && (
              <button 
                onClick={() => onCancel(_id)}
                title="Cancel Interview"
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all border border-red-200 bg-white"
              >
                <AlertTriangle className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {role === "candidate" && isScheduled && onCancel && (
          <Button size="sm" variant="destructive" onClick={() => onCancel(_id)}>
            Request Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
