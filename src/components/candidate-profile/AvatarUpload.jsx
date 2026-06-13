import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { uploadCandidateAvatar } from "../../services/profileApi";

export default function AvatarUpload({ profile, onAvatarChange, onError }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const initials = profile?.fullName
    ? profile.fullName
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleFile = async (file) => {
    if (!file) return;
    onError?.("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      onError?.("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      onError?.("Image file must be smaller than 2MB.");
      return;
    }
    setUploading(true);
    try {
      const data = await uploadCandidateAvatar(file);
      if (data?.success) {
        onAvatarChange(data.profile);
      } else {
        onError?.(data?.message || "Failed to upload profile picture.");
      }
    } catch (err) {
      onError?.(err.message || "Failed to upload profile picture.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative group cursor-pointer"
        onClick={() => !uploading && inputRef.current?.click()}
        title="Click to upload new profile picture"
      >
        <div
          className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center text-2xl font-bold text-white shadow-md relative border border-slate-100 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, #1e3a8a, #2563EB)" }}
        >
          {profile?.profilePicture?.url ? (
            <img
              src={profile.profilePicture.url}
              alt="Avatar"
              className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-90"
            />
          ) : (
            <span className="transition-all duration-300 group-hover:scale-105">{initials}</span>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full backdrop-blur-[1px]">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>
        <button
          type="button"
          disabled={uploading}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white shadow-md hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          title="Upload Profile Picture"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          <Camera className="w-4 h-4" />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      <div className="text-center">
        <p className="font-semibold text-slate-900 text-lg">{profile?.fullName || "—"}</p>
        <p className="text-slate-500 text-sm">{profile?.basicInfo?.headline || ""}</p>
      </div>
    </div>
  );
}
