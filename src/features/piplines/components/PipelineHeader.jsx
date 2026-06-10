import { Briefcase, SlidersHorizontal, Download } from 'lucide-react';

function PipelineHeader({ jobTitle = "Loading Job...", totalCandidates = 0, avgMatchScore = 0, avgTimeToHire = "14d", sortBy = "score", onSortChange, onExport }) {
  return (
    <div className="space-y-4">
      {/* Top Title & Actions Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Candidate Pipeline</h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Drag and drop candidates to move them through your hiring process</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-650 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-2xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-gray-400 font-medium">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-bold text-slate-700 cursor-pointer text-xs ml-1"
            >
              <option value="score">AI Match Score</option>
              <option value="date">Applied Date</option>
            </select>
          </div>
          <button 
            onClick={onExport}
            className="bg-white border-2 border-blue-900 text-blue-900 hover:bg-blue-50 text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ml-auto md:ml-0"
          >
            <Download className="w-3.5 h-3.5" /> Export Pipeline
          </button>
        </div>
      </div>

      {/* Info Card Row */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-50 rounded-xl text-cyan-700 shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base">{jobTitle}</h2>
            <p className="text-xs text-gray-400 font-medium">{totalCandidates} total candidates in pipeline</p>
          </div>
        </div>

        <div className="flex gap-6 sm:gap-8 items-center sm:text-right pr-0 sm:pr-4 w-full sm:w-auto justify-between sm:justify-end border-t border-gray-50 sm:border-t-0 pt-3 sm:pt-0">
          <div>
            <span className="text-2xl font-black text-gray-900">{avgMatchScore}%</span>
            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Avg AI Match</p>
          </div>
          <div className="hidden sm:block border-l border-gray-100 h-8"></div>
          <div>
            <span className="text-2xl font-black text-emerald-600">{avgTimeToHire}</span>
            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Avg Time to Hire</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PipelineHeader;
