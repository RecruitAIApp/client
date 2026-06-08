import apiClient from "../config/axios.js";

export async function onboardOwnerCompany(payload) {
  const { data } = await apiClient.post("/auth/employer/onboard-company", payload);
  return data;
}

export async function getMemberships() {
  const { data } = await apiClient.get("/employer/memberships");
  return data;
}

export async function getCompanyDashboard(companyId) {
  const { data } = await apiClient.get(`/employer/active-company/${companyId}/dashboard`);
  return data;
}

export async function getCompanyTeam(companyId) {
  const { data } = await apiClient.get(`/employer/company/${companyId}/team`);
  return data;
}

export async function inviteHR(companyId, email) {
  const { data } = await apiClient.post(`/employer/company/${companyId}/invite-hr`, { email });
  return data;
}

export async function removeHR(companyId, hrId) {
  const { data } = await apiClient.delete(`/companies/${companyId}/hrs/${hrId}`);
  return data;
}

export async function uploadCompanyLicense(companyId, file, onUploadProgress) {
  const formData = new FormData();
  formData.append("license", file);
  const { data } = await apiClient.put(`/companies/${companyId}/licenses`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (onUploadProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onUploadProgress(percentCompleted);
      }
    },
  });
  return data;
}
