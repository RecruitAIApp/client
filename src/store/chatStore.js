import { create } from "zustand";

export const useChatStore = create((set) => ({
  isOpen: false,
  jobId: null,
  jobTitle: null,
  companyName: null,

  openChat: (jobId, jobTitle, companyName) =>
    set({
      isOpen: true,
      jobId,
      jobTitle,
      companyName,
    }),

  closeChat: () =>
    set({
      isOpen: false,
      jobId: null,
      jobTitle: null,
      companyName: null,
    }),

  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
}));
