import { Loader2 } from "lucide-react";
import { Input, Textarea } from "../ui/Input";
import SkillsTagInput from "../../features/profile/components/SkillsTagInput";
import ExperienceEducationEditor from "../../features/profile/components/ExperienceEducationEditor";

export default function ProfileEditForm({
  form,
  skills,
  setSkills,
  experience,
  setExperience,
  education,
  setEducation,
  editorErrors,
  setEditorErrors,
  saving,
  onCancel,
  onSave,
}) {
  return (
    <form onSubmit={onSave}>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 space-y-6 animate-slide-up">
        <h2 className="font-semibold text-slate-800 text-xl">Edit Profile</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            {...form.register("firstName")}
            error={form.formState.errors.firstName?.message}
          />
          <Input
            label="Last Name"
            {...form.register("lastName")}
            error={form.formState.errors.lastName?.message}
          />
        </div>

        <Input
          label="Job Title"
          {...form.register("headline")}
          error={form.formState.errors.headline?.message}
        />
        <Input
          label="Phone"
          {...form.register("phone")}
          error={form.formState.errors.phone?.message}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="City" {...form.register("city")} />
          <Input label="Country" {...form.register("country")} />
        </div>

        <Textarea label="About" rows={4} {...form.register("bio")} />

        <div className="grid sm:grid-cols-3 gap-4">
          <Input
            label="LinkedIn URL"
            {...form.register("linkedin")}
            error={form.formState.errors.linkedin?.message}
          />
          <Input
            label="GitHub URL"
            {...form.register("github")}
            error={form.formState.errors.github?.message}
          />
          <Input
            label="Portfolio URL"
            {...form.register("portfolio")}
            error={form.formState.errors.portfolio?.message}
          />
        </div>

        <div className="pt-2">
          <p className="text-sm font-medium text-slate-700 mb-2">Skills</p>
          <SkillsTagInput value={skills} onChange={setSkills} />
        </div>

        <div className="pt-2">
          <p className="text-sm font-medium text-slate-700 mb-2">Experience &amp; Education</p>
          <ExperienceEducationEditor
            experience={experience}
            education={education}
            onExperienceChange={setExperience}
            onEducationChange={setEducation}
            errors={editorErrors}
            setErrors={setEditorErrors}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200 hover:-translate-y-px"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 text-sm font-semibold text-white rounded-xl disabled:opacity-60 inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:scale-95"
            style={{ background: "linear-gradient(135deg, #1e3a8a, #2563EB)" }}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}
