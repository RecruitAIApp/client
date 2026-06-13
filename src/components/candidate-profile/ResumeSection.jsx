import { useRef, useState } from "react";
import { FileText, Loader2, Upload, AlertCircle } from "lucide-react";

export default function ResumeSection({ profile, onUpload, uploading, uploadProgress }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState("");

  const hasResume = !!(profile?.resume?.url || profile?.resume?.fileName);
  const parseStatus = profile?.resume?.parseStatus ?? "none";
  const fileName = profile?.resume?.fileName;

  const validateAndUpload = async (file) => {
    setLocalError("");
    if (!file) return;
    if (file.type !== "application/pdf") {
      setLocalError("Only PDF files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLocalError("File must be smaller than 5MB.");
      return;
    }
    await onUpload(file);
  };

  if (hasResume) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{fileName || "resume.pdf"}</p>
            <p className="text-xs text-slate-400 capitalize">
              {parseStatus === "done" ? "Parsed ✓" : parseStatus}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {profile?.resume?.url && (
              <button
                type="button"
                onClick={() => window.open(profile.resume.url, "_blank", "noopener")}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                View
              </button>
            )}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs text-slate-500 hover:text-slate-700 font-medium border border-slate-200 rounded-lg px-2 py-1 hover:bg-slate-50"
              disabled={uploading}
            >
              Replace
            </button>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={(e) => validateAndUpload(e.target.files?.[0])}
        />

        {uploading && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Loader2 className="w-3 h-3 animate-spin" /> Uploading… {uploadProgress}%
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 transition-all" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        )}

        {(parseStatus === "pending" || parseStatus === "processing") && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
            <Loader2 className="w-4 h-4 animate-spin" /> Parsing with AI…
          </div>
        )}
        {parseStatus === "failed" && (
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-xs text-red-700">
            <AlertCircle className="w-4 h-4" /> {profile?.resume?.parseError || "Parsing failed."}
          </div>
        )}

        {localError && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {localError}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); validateAndUpload(e.dataTransfer.files?.[0]); }}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter") inputRef.current?.click(); }}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${
          dragOver ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:border-blue-300 bg-slate-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={(e) => validateAndUpload(e.target.files?.[0])}
        />
        <Upload className="w-10 h-10 mx-auto text-slate-400 mb-3" />
        <p className="text-sm font-semibold text-slate-700">Upload your resume</p>
        <p className="text-xs text-slate-400 mt-1">PDF up to 5MB</p>
        <button
          type="button"
          className="mt-4 px-5 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
        >
          Choose File
        </button>
      </div>
      {localError && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {localError}
        </p>
      )}
      {uploading && (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Loader2 className="w-3 h-3 animate-spin" /> Uploading… {uploadProgress}%
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all" style={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
