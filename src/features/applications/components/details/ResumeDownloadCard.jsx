import { FileText, Download } from 'lucide-react';

export default function ResumeDownloadCard({ resumeName, uploadedTime, resumeUrl }) {
  const handleDownload = () => {
    if (!resumeUrl) {
      alert("No resume URL available for download.");
      return;
    }
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
      <h3 className="font-bold text-sm text-slate-900 border-b border-gray-50 pb-2">Resume</h3>
      <div className="border border-dashed border-gray-200 rounded-xl p-4 text-center space-y-3 bg-slate-50/50">
        <FileText className="w-8 h-8 text-gray-400 mx-auto" />
        <div>
          <p className="text-xs font-bold text-slate-800 max-w-[180px] mx-auto truncate">{resumeName || "resume.pdf"}</p>
          <p className="text-[10px] text-gray-400 font-medium">{uploadedTime}</p>
        </div>
        <button 
          onClick={handleDownload}
          className="w-full border-2 border-blue-900 text-blue-900 font-bold text-xs py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5 bg-white cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" /> Download Resume
        </button>
      </div>
    </div>
  );
}