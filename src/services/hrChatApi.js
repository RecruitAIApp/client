import apiClient from "../config/axios";

/**
 * Get HR Assistant chat history for a specific job
 * @param {string} jobId 
 */
export const getHrChatHistory = async (jobId) => {
  const response = await apiClient.get(`/v1/hr-chat/${jobId}`);
  return response.data.data;
};

/**
 * Send a message to HR Assistant for a specific job
 * @param {string} jobId 
 * @param {string} message 
 */
export const sendHrMessage = async (jobId, message) => {
  const response = await apiClient.post(`/v1/hr-chat/${jobId}`, { message });
  return response.data;
};

/**
 * Delete HR Assistant chat history for a specific job
 * @param {string} jobId 
 */
export const deleteHrChatHistory = async (jobId) => {
  const response = await apiClient.delete(`/v1/hr-chat/${jobId}`);
  return response.data;
};
