import { Briefcase, GraduationCap } from "lucide-react";
import ResumeSection from "./ResumeSection";

export default function ProfileViewMode({
  profile,
  basic,
  skills,
  experience,
  education,
  uploading,
  uploadProgress,
  onCVUpload,
}) {
  const location = basic?.location ?? {};

  return (
    <>
      {/* About */}
      {basic.bio && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h2 className="font-semibold text-slate-800 text-lg mb-3">About</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{basic.bio}</p>
        </div>
      )}

      {/* Skills */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
        <h2 className="font-semibold text-slate-800 text-lg mb-3">Skills</h2>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No skills listed.</p>
        )}
      </div>

      {/* Work Experience */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h2 className="font-semibold text-slate-800 text-lg mb-4">Work Experience</h2>
        {experience?.length > 0 ? (
          <div className="space-y-5">
            {experience.map((exp, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{exp.title}</p>
                  <p className="text-sm text-slate-600">{exp.company}</p>
                  {(exp.startDate || exp.endDate) && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      {exp.startDate ? new Date(exp.startDate).getFullYear() : ""}
                      {" – "}
                      {exp.currentlyWorking
                        ? "Present"
                        : exp.endDate
                        ? new Date(exp.endDate).getFullYear()
                        : ""}
                      {location.city || location.country
                        ? ` • ${[location.city, location.country].filter(Boolean).join(", ")}`
                        : ""}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No experience listed.</p>
        )}
      </div>

      {/* Education */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
        <h2 className="font-semibold text-slate-800 text-lg mb-4">Education</h2>
        {education?.length > 0 ? (
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </p>
                  <p className="text-sm text-slate-600">{edu.institution}</p>
                  {(edu.startYear || edu.endYear) && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      Graduated {edu.endYear || edu.startYear}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No education listed.</p>
        )}
      </div>

      {/* Resume */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <h2 className="font-semibold text-slate-800 text-lg mb-4">Resume</h2>
        <ResumeSection
          profile={profile}
          onUpload={onCVUpload}
          uploading={uploading}
          uploadProgress={uploadProgress}
        />
        {profile?.resume?.parsedData?.summary && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl">
            <p className="text-xs font-medium text-slate-600 mb-1">AI Parsed Summary</p>
            <p className="text-sm text-slate-700">{profile.resume.parsedData.summary}</p>
          </div>
        )}
      </div>
    </>
  );
}
