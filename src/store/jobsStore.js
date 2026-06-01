import { create } from "zustand";

export const useJobsStore = create((set) => ({
  filters: {
    status: "open",
    jobType: "",
    employmentType: "",
    experienceLevel: "",
    search: "",
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  },

  setFilter: (name, value) => set((state) => ({
    filters: {
      ...state.filters,
      [name]: value,
      // Reset page when any search/filter parameter changes
      page: name === "page" ? value : 1,
    }
  })),

  resetFilters: () => set({
    filters: {
      status: "",
      jobType: "",
      employmentType: "",
      experienceLevel: "",
      search: "",
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    }
  }),
}));
