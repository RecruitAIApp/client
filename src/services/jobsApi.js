import apiClient from "../config/axios.js";

export async function getJobsByCompany(companyId, params) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== '' && v != null)
  );
  const { data } = await apiClient.get(`/jobs/company/${companyId}`, { params: filteredParams });
  return data;
}

export async function getJobById(jobId) {
  const { data } = await apiClient.get(`/jobs/${jobId}`);
  return data;
}

export async function createJob(payload) {
  const { data } = await apiClient.post("/jobs", payload);
  return data;
}

export async function updateJob(jobId, payload) {
  const { data } = await apiClient.put(`/jobs/${jobId}`, payload);
  return data;
}

export async function deleteJob(jobId) {
  const { data } = await apiClient.delete(`/jobs/${jobId}`);
  return data;
}
