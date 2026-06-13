import React, { useState, useEffect } from "react";
import { 
  getCompanyInterviews, 
  updateInterview, 
  cancelInterview, 
  completeInterview 
} from "../services/interviewApi.js";
import { getCompanyRecommendation } from "../services/interviewRecommendationApi.js";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "../components/ui/Table.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Input } from "../components/ui/Input.jsx";
import { InterviewStatusBadge } from "../components/interviews/InterviewStatusBadge.jsx";
import { InterviewModal } from "../components/interviews/InterviewModal.jsx";
import { AIInterviewCoach } from "../components/interview-recommendations/AIInterviewCoach.jsx";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "../components/ui/Modal.jsx";
import { 
  Search, 
  Filter, 
  Calendar, 
  Video, 
  MapPin, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  XCircle,
  HelpCircle,
  Eye
} from "lucide-react";
import { toast } from "react-toastify";

export default function CompanyInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [coachData, setCoachData] = useState(null);
  const [isLoadingCoach, setIsLoadingCoach] = useState(false);

  const fetchInterviews = async (page = 1) => {
    setIsLoading(true);
    try {
      const { data } = await getCompanyInterviews({
        page,
        limit: 10,
        search,
        status,
      });
      setInterviews(data.interviews);
      setPagination(data.pagination);
    } catch (error) {
      toast.error(error.message || "Failed to load interviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews(1);
  }, [status]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchInterviews(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchInterviews(newPage);
    }
  };

  const handleReschedule = (interview) => {
    setSelectedInterview(interview);
    setIsEditModalOpen(true);
  };

  const handleRescheduleSubmit = async (formData) => {
    setIsSaving(true);
    try {
      await updateInterview(selectedInterview._id, formData);
      toast.success("Interview rescheduled successfully");
      setIsEditModalOpen(false);
      fetchInterviews(pagination.page);
    } catch (error) {
      toast.error(error.message || "Failed to reschedule interview");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelClick = async (id) => {
    const reason = window.prompt("Enter cancellation notes/reason for the candidate:");
    if (reason === null) return; // cancelled prompt

    try {
      await cancelInterview(id, { notes: reason });
      toast.success("Interview cancelled successfully");
      fetchInterviews(pagination.page);
    } catch (error) {
      toast.error(error.message || "Failed to cancel interview");
    }
  };

  const handleCompleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to mark this interview as completed?")) return;

    try {
      await completeInterview(id);
      toast.success("Interview marked as completed");
      fetchInterviews(pagination.page);
    } catch (error) {
      toast.error(error.message || "Failed to complete interview");
    }
  };

  const handleViewCoach = async (interviewId, applicationId) => {
    setIsLoadingCoach(true);
    setIsCoachModalOpen(true);
    try {
      const { data } = await getCompanyRecommendation(applicationId);
      setCoachData(data.recommendations);
    } catch (error) {
      toast.error(error.message || "Preparation guide is still generating or failed to load");
      setIsCoachModalOpen(false);
    } finally {
      setIsLoadingCoach(false);
    }
  };

  const getInterviewTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "online":
        return <Video className="h-4 w-4 text-indigo-500" />;
      case "onsite":
        return <MapPin className="h-4 w-4 text-emerald-500" />;
      case "phone":
        return <Phone className="h-4 w-4 text-sky-500" />;
      default:
        return <Calendar className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl animate-settle">
      {/* Upper Info Grid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-brand-blue)]">Company Interviews</h1>
          <p className="text-slate-500 text-sm">Review, reschedule, and manage scheduled interviews for your company applications.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-(--color-border) shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 max-w-md">
          <Input
            placeholder="Search by notes or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
            icon={<Search className="h-4 w-4 text-slate-400" />}
          />
          <Button type="submit" variant="primary" size="sm">
            Search
          </Button>
        </form>

        <div className="flex items-center gap-2">
          <Filter className="h-4.5 w-4.5 text-slate-400" />
          <span className="text-sm font-medium text-slate-600">Status:</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 bg-white border border-(--color-border) rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
          >
            <option value="">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="rescheduled">Rescheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-(--color-border) shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading scheduled interviews...</div>
        ) : interviews.length === 0 ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center space-y-2">
            <Calendar className="h-10 w-10 text-slate-300" />
            <h3 className="font-bold text-slate-600">No interviews found</h3>
            <p className="text-xs">Adjust your search or filter settings.</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Role Title</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviews.map((interview) => {
                  const date = new Date(interview.interviewDate);
                  const isScheduled = interview.status === "scheduled" || interview.status === "rescheduled";

                  return (
                    <TableRow key={interview._id}>
                      <TableCell>
                        <div className="font-semibold text-slate-800">
                          {interview.candidateId?.fullName || interview.candidateId?.name || "Unknown Candidate"}
                        </div>
                        <div className="text-xs text-slate-500">{interview.candidateId?.email}</div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-700">
                        {interview.jobId?.title || "Role"}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-slate-800">
                          {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </div>
                        <div className="text-xs text-slate-500">
                          {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} ({interview.timezone})
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 capitalize text-slate-700 text-sm font-medium">
                          {getInterviewTypeIcon(interview.interviewType)}
                          {interview.interviewType}
                        </div>
                      </TableCell>
                      <TableCell>
                        <InterviewStatusBadge status={interview.status} />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleViewCoach(interview._id, interview.applicationId)}
                          className="bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 inline-flex items-center gap-1.5"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Coach
                        </Button>
                        
                        {isScheduled && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReschedule(interview)}
                            >
                              Edit
                            </Button>
                            <button
                              onClick={() => handleCompleteClick(interview._id)}
                              title="Mark as Completed"
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg border border-emerald-200 inline-flex items-center justify-center bg-white cursor-pointer"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleCancelClick(interview._id)}
                              title="Cancel Interview"
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 inline-flex items-center justify-center bg-white cursor-pointer"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="p-2 border border-slate-200 rounded-lg disabled:opacity-50 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="p-2 border border-slate-200 rounded-lg disabled:opacity-50 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Rescheduling Modal */}
      {isEditModalOpen && selectedInterview && (
        <InterviewModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={selectedInterview}
          onSubmit={handleRescheduleSubmit}
          isLoading={isSaving}
        />
      )}

      {/* AI Coach Modal */}
      {isCoachModalOpen && (
        <Modal open={isCoachModalOpen} onOpenChange={(open) => !open && setIsCoachModalOpen(false)}>
          <ModalContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
            <ModalHeader>
              <ModalTitle className="text-xl font-bold text-[var(--color-brand-blue)] flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-500" />
                AI Interview Coach Assessment
              </ModalTitle>
            </ModalHeader>
            <div className="mt-4">
              {isLoadingCoach ? (
                <div className="p-12 text-center text-slate-500">Evaluating candidate skills and rendering preparation tips...</div>
              ) : (
                <AIInterviewCoach recommendation={coachData} />
              )}
            </div>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
