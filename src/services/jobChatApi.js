import apiClient from "../config/axios";

/**
 * Get chat history for a specific job
 * @param {string} jobId 
 */
export const getChatHistory = async (jobId) => {
  const response = await apiClient.get(`/v1/job-chat/messages/${jobId}`);
  return response.data;
};

/**
 * Send a message for a specific job
 * @param {Object} data 
 * @param {string} data.jobId
 * @param {string} data.content
 */
export const sendMessage = async (data) => {
  const response = await apiClient.post("/v1/job-chat/messages", data);
  return response.data;
};

/**
 * Delete chat history for a specific job
 * @param {string} jobId 
 */
export const deleteChatHistory = async (jobId) => {
  const response = await apiClient.delete(`/v1/job-chat/${jobId}`);
  return response.data;
};
