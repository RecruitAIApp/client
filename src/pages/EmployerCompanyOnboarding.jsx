import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Building, 
  Loader2, 
  AlertCircle, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Trash2, 
  ArrowRight,
  ShieldCheck 
} from "lucide-react";
import { Input, Textarea } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { onboardOwnerCompany, uploadCompanyLicense } from "../services/employerApi.js";
import { useAuthStore } from "../store/authStore";

const step1Schema = z.object({
  name: z.string().min(2, "Company name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  industry: z.string().min(2, "Industry is required"),
  location: z.string().optional(),
});

export default function EmployerCompanyOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [createdCompany, setCreatedCompany] = useState(null);
  const [error, setError] = useState("");

  // Step 2 states
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: "",
      description: "",
      industry: "",
      location: "",
    },
  });

  const onStep1Submit = async (data) => {
    setError("");
    try {
      const result = await onboardOwnerCompany({
        name: data.name,
        description: data.description,
        industry: data.industry,
        location: data.location || undefined,
      });

      // Save user & membership context, but don't navigate yet
      if (result.membership) {
        useAuthStore.setState({
          user: result.user,
          membership: result.membership,
        });
      }

      setCreatedCompany(result.company);
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to submit company.");
    }
  };

  const handleFileChange = (e) => {
    setFileError("");
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate size (5MB = 5 * 1024 * 1024 bytes)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File size must be under 5MB.");
      return;
    }

    // Validate type
    const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      setFileError("Invalid file type. Only PDF and Images (PNG/JPEG) are allowed.");
      return;
    }

    setFile(selectedFile);
    setUploadProgress(0);
    setUploadedUrl("");

    // Create preview URL if it's an image
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null); // PDF / other
    }
  };

  const handleUpload = async () => {
    if (!file || !createdCompany?._id) return;
    setUploading(true);
    setFileError("");

    try {
      const response = await uploadCompanyLicense(
        createdCompany._id,
        file,
        (progress) => setUploadProgress(progress)
      );

      if (response.success) {
        setUploadedUrl(response.data?.licenses?.secure_url || response.company?.licenses?.secure_url || "uploaded");
        // Refetch / update authStore membership context to make sure the app updates
        const nextUser = { ...useAuthStore.getState().user, status: "pending_approval" };
        const nextMembership = {
          ...useAuthStore.getState().membership,
          pendingApproval: true,
          needsCompanyOnboarding: false,
        };
        useAuthStore.setState({ user: nextUser, membership: nextMembership });
      } else {
        throw new Error(response.message || "Upload failed");
      }
    } catch (err) {
      setFileError(err.message || "Upload failed. Please try again.");
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setUploadedUrl("");
    setFileError("");
  };

  const handleComplete = () => {
    navigate("/employer/pending-approval", { replace: true });
  };

  return (
    <div className="py-10 px-4 max-w-lg mx-auto">
      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-8 px-6">
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
            step >= 1 ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-400"
          }`}>
            1
          </div>
          <span className="text-xs font-semibold mt-2 text-slate-600">Company Info</span>
        </div>
        <div className={`flex-1 h-0.5 mx-4 transition-all ${step >= 2 ? "bg-brand-blue" : "bg-slate-100"}`}></div>
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
            step >= 2 ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-400"
          }`}>
            2
          </div>
          <span className="text-xs font-semibold mt-2 text-slate-600">Verification License</span>
        </div>
      </div>

      <Card className="border border-slate-100 shadow-xl rounded-2xl bg-white overflow-hidden">
        <CardContent className="space-y-6 p-6 sm:p-8">
          {step === 1 ? (
            <>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Company Onboarding</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Register your company details to set up your owner workspace.
                </p>
              </div>

              {error && (
                <div className="flex gap-2 p-3 bg-red-50 text-red-700 text-sm rounded-lg animate-shake" role="alert">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onStep1Submit)} className="space-y-4">
                <Input
                  label="Company name"
                  icon={<Building className="w-4 h-4 text-slate-400" />}
                  error={errors.name?.message}
                  disabled={isSubmitting}
                  {...register("name")}
                />
                <Textarea
                  label="Description"
                  rows={3}
                  error={errors.description?.message}
                  disabled={isSubmitting}
                  {...register("description")}
                />
                <Input
                  label="Industry"
                  error={errors.industry?.message}
                  disabled={isSubmitting}
                  {...register("industry")}
                />
                <Input
                  label="Location (optional)"
                  disabled={isSubmitting}
                  {...register("location")}
                />
                <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-1" />
                      Saving…
                    </>
                  ) : (
                    <>
                      Next Step <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Upload Legal Document</h2>
                <p className="text-sm text-slate-500">
                  Please upload your company legal license (PDF or Image) to verify your company workspace.
                </p>
              </div>

              {fileError && (
                <div className="flex gap-2 p-3 bg-red-50 text-red-700 text-sm rounded-lg" role="alert">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}

              {/* Upload area */}
              {!file ? (
                <label className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-brand-blue/50 hover:bg-slate-50/50 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4 group-hover:scale-105 transition-transform group-hover:text-brand-blue group-hover:bg-blue-50">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Click to upload license</span>
                  <span className="text-xs text-slate-400 mt-1">PDF, PNG, JPG, or JPEG (Max 5MB)</span>
                  <input
                    type="file"
                    accept=".pdf,image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-10 h-10 object-cover rounded border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-brand-blue">
                          <FileText className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">{file.name}</p>
                        <p className="text-xs text-slate-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                    {!uploading && !uploadedUrl && (
                      <button
                        onClick={handleRemoveFile}
                        className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Progress indicator */}
                  {uploading && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-500">
                        <span>Uploading document...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-brand-blue h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Success State */}
                  {uploadedUrl && (
                    <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Document uploaded successfully!</span>
                    </div>
                  )}

                  {/* Upload Trigger Button */}
                  {!uploadedUrl && !uploading && (
                    <Button onClick={handleUpload} className="w-full" variant="primary">
                      Confirm & Upload Document
                    </Button>
                  )}
                </div>
              )}

              {/* Complete Onboarding controls */}
              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  disabled={uploading}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={uploading || !uploadedUrl}
                  className="flex-1"
                  variant="primary"
                >
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  Complete Setup
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
