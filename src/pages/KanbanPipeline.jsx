import React from 'react';
import PipelineHeader from '../features/piplines/components/PipelineHeader';
import KanbanColumn from '../features/piplines/components/KanbanColumn';

const mockData = {
  applied: [
    { id: '1', initials: 'SJ', name: 'Sarah Johnson', role: 'Senior Frontend Developer', email: 'sarah.j@email.com', phone: '+1 234-567-8900', appliedAt: '2 days ago', experience: 6, location: 'San Francisco', score: 95, isStarred: true },
    { id: '2', initials: 'MC', name: 'Michael Chen', role: 'Senior Frontend Developer', email: 'mchen@email.com', phone: '+1 234-567-8901', appliedAt: '3 days ago', experience: 5, location: 'Remote', score: 88 }
  ],
  shortlisted: [
    { id: '3', initials: 'DK', name: 'David Kim', role: 'Senior Frontend Developer', email: 'david.k@email.com', phone: '+1 234-567-8903', appliedAt: '5 days ago', experience: 7, location: 'Seattle', score: 91 },
    { id: '4', initials: 'LA', name: 'Lisa Anderson', role: 'Senior Frontend Developer', email: 'lisa.a@email.com', phone: '+1 234-567-8904', appliedAt: '6 days ago', experience: 5, location: 'Austin', score: 85, redFlags: 'Gap in employment' }
  ],
  interview: [
    { id: '5', initials: 'JW', name: 'James Wilson', role: 'Senior Frontend Developer', email: 'james.w@email.com', phone: '+1 234-567-8905', appliedAt: '1 week ago', experience: 6, location: 'Boston', score: 93, isStarred: true }
  ],
  offerSent: [
    { id: '6', initials: 'AM', name: 'Anna Martinez', role: 'Senior Frontend Developer', email: 'anna.m@email.com', phone: '+1 234-567-8906', appliedAt: '2 weeks ago', experience: 8, location: 'Los Angeles', score: 94 }
  ],
  hired: [],
  rejected: [
    { id: '7', initials: 'TB', name: 'Tom Brown', role: 'Senior Frontend Developer', email: 'tom.b@email.com', phone: '+1 234-567-8907', appliedAt: '1 week ago', experience: 2, location: 'Chicago', score: 45, redFlags: 'Insufficient experience, Skills mismatch' }
  ]
};

function KanbanPipeline() {
  return (
    <div className="p-6 bg-slate-50/50 min-h-screen text-gray-800 font-sans flex flex-col gap-6">
      <PipelineHeader />

      <div className="flex gap-5 overflow-x-auto pb-6 select-none flex-1 items-start">
        <KanbanColumn title="Applied" count={mockData.applied.length} candidates={mockData.applied} colorClass="border-t-blue-500" />
        <KanbanColumn title="Shortlisted" count={mockData.shortlisted.length} candidates={mockData.shortlisted} colorClass="border-t-teal-400" />
        <KanbanColumn title="Interview" count={mockData.interview.length} candidates={mockData.interview} colorClass="border-t-purple-500" />
        <KanbanColumn title="Offer Sent" count={mockData.offerSent.length} candidates={mockData.offerSent} colorClass="border-t-amber-500" />
        <KanbanColumn title="Hired" count={mockData.hired.length} candidates={mockData.hired} colorClass="border-t-emerald-500" />
        <KanbanColumn title="Rejected" count={mockData.rejected.length} candidates={mockData.rejected} colorClass="border-t-red-500" />
      </div>
    </div>
  );
}

export default KanbanPipeline;