import apiClient from "../config/axios.js";

/**
 * Schedule a new interview.
 * @param {object} payload - { applicationId, interviewDate, duration, timezone, interviewType, meetingLink, location, notes }
 */
export async function createInterview(payload) {
  const { data } = await apiClient.post("/interviews", payload);
  return data;
}

/**
 * Get interviews scheduled for the logged-in candidate.
 */
export async function getCandidateInterviews() {
  const { data } = await apiClient.get("/interviews/my");
  return data;
}

/**
 * Get interviews scheduled by the company (supports pagination, filtering, search).
 * @param {object} params - { page, limit, status, type, search, sortBy, sortOrder }
 */
export async function getCompanyInterviews(params = {}) {
  const { data } = await apiClient.get("/interviews/company", { params });
  return data;
}

/**
 * Get specific interview details.
 * @param {string} id 
 */
export async function getInterviewDetails(id) {
  const { data } = await apiClient.get(`/interviews/${id}`);
  return data;
}

/**
 * Reschedule/update an interview.
 * @param {string} id 
 * @param {object} payload - { interviewDate, duration, timezone, interviewType, meetingLink, location, notes }
 */
export async function updateInterview(id, payload) {
  const { data } = await apiClient.patch(`/interviews/${id}`, payload);
  return data;
}

/**
 * Cancel an interview.
 * @param {string} id 
 * @param {object} payload - { notes }
 */
export async function cancelInterview(id, payload = {}) {
  const { data } = await apiClient.patch(`/interviews/${id}/cancel`, payload);
  return data;
}

/**
 * Complete an interview.
 * @param {string} id 
 */
export async function completeInterview(id) {
  const { data } = await apiClient.patch(`/interviews/${id}/complete`);
  return data;
}

export const interviewService = {
  createInterview,
  getCandidateInterviews,
  getCompanyInterviews,
  getInterviewDetails,
  updateInterview,
  cancelInterview,
  completeInterview,
};
