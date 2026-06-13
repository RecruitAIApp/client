import React from "react";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "../ui/Modal.jsx";
import { InterviewForm } from "./InterviewForm.jsx";

export function InterviewModal({ isOpen, onClose, initialData = {}, onSubmit, isLoading = false }) {
  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ModalContent className="max-w-xl">
        <ModalHeader>
          <ModalTitle className="text-xl font-bold text-[var(--color-brand-blue)]">
            {initialData._id ? "Reschedule Interview" : "Schedule Interview"}
          </ModalTitle>
        </ModalHeader>
        <div className="mt-2">
          <InterviewForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </ModalContent>
    </Modal>
  );
}
