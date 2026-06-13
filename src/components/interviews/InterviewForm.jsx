import React, { useState } from "react";
import { Input, Textarea } from "../ui/Input.jsx";
import { Button } from "../ui/Button.jsx";

const COMMON_TIMEZONES = [
  "UTC",
  "GMT+2 (Egypt/Cairo)",
  "GMT+3 (Saudi Arabia)",
  "EST (Eastern Standard Time)",
  "PST (Pacific Standard Time)",
  "CET (Central European Time)",
  "GST (Gulf Standard Time)",
];

export function InterviewForm({ initialData = {}, onSubmit, onCancel, isLoading = false }) {
  const [formData, setFormData] = useState({
    interviewDate: initialData.interviewDate 
      ? new Date(initialData.interviewDate).toISOString().slice(0, 16) 
      : "",
    duration: initialData.duration || 30,
    timezone: initialData.timezone || "GMT+2 (Egypt/Cairo)",
    interviewType: initialData.interviewType || "online",
    meetingLink: initialData.meetingLink || "",
    location: initialData.location || "",
    notes: initialData.notes || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.interviewDate) {
      newErrors.interviewDate = "Date and time are required";
    } else {
      const selectedDate = new Date(formData.interviewDate);
      if (selectedDate < new Date() && !initialData._id) {
        newErrors.interviewDate = "Interview date must be in the future";
      }
    }

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    }

    if (!formData.timezone) {
      newErrors.timezone = "Timezone is required";
    }

    if (formData.interviewType === "online" && !formData.meetingLink) {
      newErrors.meetingLink = "Meeting link is required for online interviews";
    } else if (formData.interviewType === "online" && formData.meetingLink) {
      try {
        new URL(formData.meetingLink);
      } catch (_) {
        newErrors.meetingLink = "Please enter a valid URL";
      }
    }

    if (formData.interviewType === "onsite" && !formData.location) {
      newErrors.location = "Location is required for onsite interviews";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Send ISO-formatted date to backend
    const payload = {
      ...formData,
      interviewDate: new Date(formData.interviewDate).toISOString(),
      duration: Number(formData.duration),
    };

    // Clean optional fields
    if (formData.interviewType !== "online") delete payload.meetingLink;
    if (formData.interviewType !== "onsite") delete payload.location;

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Interview Date & Time"
          type="datetime-local"
          name="interviewDate"
          value={formData.interviewDate}
          onChange={handleChange}
          error={errors.interviewDate}
          required
        />

        <div className="w-full">
          <label className="block text-sm font-medium mb-2 text-foreground">Duration (Minutes)</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-accent) transition-all"
            required
          >
            <option value={15}>15 Minutes</option>
            <option value={30}>30 Minutes</option>
            <option value={45}>45 Minutes</option>
            <option value={60}>60 Minutes</option>
            <option value={90}>90 Minutes</option>
            <option value={120}>120 Minutes</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium mb-2 text-foreground">Timezone</label>
          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-accent) transition-all"
            required
          >
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium mb-2 text-foreground">Interview Type</label>
          <select
            name="interviewType"
            value={formData.interviewType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-accent) transition-all"
            required
          >
            <option value="online">Online / Video Call</option>
            <option value="onsite">Onsite / Office Visit</option>
            <option value="phone">Phone Call</option>
          </select>
        </div>
      </div>

      {formData.interviewType === "online" && (
        <Input
          label="Meeting Link"
          type="url"
          name="meetingLink"
          placeholder="https://zoom.us/j/... or https://meet.google.com/..."
          value={formData.meetingLink}
          onChange={handleChange}
          error={errors.meetingLink}
          required
        />
      )}

      {formData.interviewType === "onsite" && (
        <Input
          label="Office Location / Room"
          type="text"
          name="location"
          placeholder="e.g. 5th Floor, Room 502, Headquarters"
          value={formData.location}
          onChange={handleChange}
          error={errors.location}
          required
        />
      )}

      <Textarea
        label="Notes / Preparation Instructions for Candidate"
        name="notes"
        rows={4}
        placeholder="Explain what the candidate should prepare, who they will meet, or system requirements..."
        value={formData.notes}
        onChange={handleChange}
        error={errors.notes}
      />

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Saving..." : initialData._id ? "Reschedule Interview" : "Schedule Interview"}
        </Button>
      </div>
    </form>
  );
}
