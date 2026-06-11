import apiClient from "../config/axios.js";

/**
 * Generate preparation guide for an application.
 * @param {string} applicationId 
 */
export async function generateRecommendation(applicationId) {
  const { data } = await apiClient.post(`/interview-recommendations/generate/${applicationId}`);
  return data;
}

/**
 * Fetch recommendation details for candidate.
 * @param {string} applicationId 
 */
export async function getCandidateRecommendation(applicationId) {
  const { data } = await apiClient.get(`/interview-recommendations/my/${applicationId}`);
  return data;
}

/**
 * Fetch recommendation details for company team.
 * @param {string} applicationId 
 */
export async function getCompanyRecommendation(applicationId) {
  const { data } = await apiClient.get(`/interview-recommendations/${applicationId}`);
  return data;
}

/**
 * Force clear cache and regenerate recommendation.
 * @param {string} applicationId 
 */
export async function regenerateRecommendation(applicationId) {
  const { data } = await apiClient.post(`/interview-recommendations/regenerate/${applicationId}`);
  return data;
}

export const recommendationService = {
  generateRecommendation,
  getCandidateRecommendation,
  getCompanyRecommendation,
  regenerateRecommendation,
};
