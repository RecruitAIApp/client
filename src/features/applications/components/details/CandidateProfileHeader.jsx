import { useState } from 'react';
import { Mail, Phone, MapPin, Briefcase, Star, CheckCircle2, Calendar, XCircle } from 'lucide-react';
import { Button } from '../../../../components/ui/Button.jsx';
import { useApplicationStore } from '../../../../store/applicationStore.js';
import { toast } from 'react-toastify';
import { createInterview } from '../../../../services/interviewApi.js';
import { InterviewModal } from '../../../../components/interviews/InterviewModal.jsx';

export default function CandidateProfileHeader({ candidate = {}, hideActions = false }) {
  const { id, name, role, email, phone, skills, location, experienceYears, isStarred, initials } = candidate || {};
  const { updateApplicationStage, addApplicationNote } = useApplicationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleScheduleSubmit = async (payload) => {
    setIsSaving(true);
    try {
      await createInterview({ ...payload, applicationId: id });
      toast.success("Interview scheduled successfully!");
      setIsModalOpen(false);
      // reload details
      window.location.reload();
    } catch (err) {
      toast.error(err.message || "Failed to schedule interview");
    } finally {
      setIsSaving(false);
    }
  };

  const handleStages = async (stageKey) => {
    try {
      await updateApplicationStage(id, {
        stage: { key: stageKey },
      });
    } catch (error) {
      console.error("Failed :", error);
    }
  };

  const handleToggleStar = async () => {
    try {
      const newRating = isStarred ? 1 : 5;
      await addApplicationNote(id, {
        content: isStarred ? "Removed star rating" : "Starred candidate",
        ratingScore: newRating
      });
    } catch (err) {
      toast.error("Failed to update candidate star status. Please check your connection.");
      console.error("Failed to toggle star:", err);
    }
  };

  const currentStatus = candidate?.meta?.status || "applied";

  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6'>
        <div className='w-16 h-16 rounded-full bg-linear-to-br from-(--color-brand-blue) to-(--color-brand-teal) text-white font-bold text-2xl shrink-0 flex items-center justify-center'>
          {initials}
        </div>
        <div className='space-y-1 flex-1 min-w-0 w-full'>
          <div className='flex justify-between items-center'>
            <h1 className="text-2xl font-bold text-slate-900 truncate">{name}</h1>
            {!hideActions && (
              <Star 
                onClick={handleToggleStar}
                className={`w-5 h-5 cursor-pointer shrink-0 ml-2 transition-all hover:scale-110 ${isStarred ? 'fill-amber-400 text-amber-400' : 'text-gray-300 hover:text-amber-400 hover:fill-amber-400/50'}`} 
              />
            )}
          </div>
          <p className='text-sm font-medium text-gray-500 truncate'>{role}</p>

          <div className='flex flex-wrap gap-x-4 gap-y-1.5 pt-2 text-xs text-gray-500 font-medium'>
            <span className='flex items-center gap-1.5'><Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {email}</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {phone}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {location}</span>
            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {experienceYears}</span>
          </div>

          <div className='flex gap-1.5 flex-wrap mt-4'>
            {skills && skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-600 border border-blue-500 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {!hideActions && (
        <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3  border-t border-gray-100 pt-4'>
          {currentStatus === 'interview' ? (
            <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Stage: Interview
            </div>
          ) : (
            <Button 
              onClick={() => handleStages('interview')}
              className="hover:bg-brand-light transition-colors w-full"
            >
              <CheckCircle2 className="w-4 h-4" /> Move to Interview
            </Button>
          )}
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="hover:bg-brand hover:text-white hover:border-brand transition-colors w-full" 
            variant='outline'
          >
            <Calendar className="w-4 h-4" /> Schedule Interview
          </Button>
          
          {currentStatus === 'rejected' ? (
            <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 cursor-not-allowed">
              <XCircle className="w-4 h-4 text-rose-600" /> Rejected
            </div>
          ) : (
            <Button
              onClick={() => handleStages('rejected')}
              variant="destructive" 
              className="w-full font-bold hover:bg-red-700 transition-colors"
            >
              <XCircle className="w-4 h-4" /> Reject
            </Button>
          )}
        </div>
      )}

      {isModalOpen && (
        <InterviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleScheduleSubmit}
          isLoading={isSaving}
        />
      )}
    </div>
  );
}