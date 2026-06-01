import { create } from "zustand";
import { getMemberships } from "../services/employerApi";

export const useEmployerStore = create((set, get) => ({
  memberships: [],
  activeCompanyId: localStorage.getItem("activeCompanyId") || null,
  activeCompany: null,
  isLoading: false,
  error: null,

  setMemberships: (memberships) => {
    const activeCompanyId = get().activeCompanyId;
    let nextActiveCompanyId = activeCompanyId;
    
    // Default to first company if activeCompanyId is invalid/missing
    const hasActiveCompany = memberships.some(m => m.company?._id === activeCompanyId);
    if (!hasActiveCompany && memberships.length > 0) {
      nextActiveCompanyId = memberships[0].company?._id;
      localStorage.setItem("activeCompanyId", nextActiveCompanyId);
    }
    
    const activeCompany = memberships.find(m => m.company?._id === nextActiveCompanyId)?.company || null;
    
    set({
      memberships,
      activeCompanyId: nextActiveCompanyId,
      activeCompany,
    });
  },

  setActiveCompanyId: (companyId) => {
    localStorage.setItem("activeCompanyId", companyId);
    const activeCompany = get().memberships.find(m => m.company?._id === companyId)?.company || null;
    set({
      activeCompanyId: companyId,
      activeCompany,
    });
  },

  fetchMemberships: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getMemberships();
      if (data.success) {
        get().setMemberships(data.data);
      }
      return data;
    } catch (err) {
      set({ error: err.message || "Failed to fetch memberships" });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },
}));
