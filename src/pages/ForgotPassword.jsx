import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Loader2, ArrowLeft, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { forgotPassword } from "../services/authApi";
import AuthLayout from "../components/layouts/AuthLayout";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email Address is required")
    .email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");
  const [successEmail, setSuccessEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    setAuthError("");
    setSuccessEmail("");
    try {
      await forgotPassword(data.email);
      setSuccessEmail(data.email);
    } catch (err) {
      setAuthError(err.message || "Failed to send password reset email. Please try again.");
    }
  };

  const handleResend = async () => {
    const email = getValues("email") || successEmail;
    if (!email) return;

    setAuthError("");
    setIsResending(true);
    try {
      await forgotPassword(email);
    } catch (err) {
      setAuthError(err.message || "Resend failed. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout>
      {successEmail ? (
        /* SUCCESS STATE: EMAIL SENT SUCCESS SCREEN */
        <Card className="w-full max-w-lg border border-slate-100 shadow-xl shadow-slate-100/40 p-6 sm:p-8 rounded-2xl bg-white text-center">
          <CardContent className="space-y-6 flex flex-col items-center">
            {/* Illustrative Check Icon */}
            <div className="w-16 h-16 bg-teal-50 border border-teal-100 text-brand-teal rounded-full flex items-center justify-center shadow-xs select-none animate-bounce">
              <CheckCircle className="w-8 h-8 stroke-[1.8]" />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Check your email</h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                We sent a password reset link to <span className="font-semibold text-slate-800">{successEmail}</span>. Click the link inside the email to reset your password.
              </p>
            </div>

            {/* Error Banner if Resend fails */}
            {authError && (
              <div
                className="w-full flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="w-full space-y-4 pt-2">
              <Button
                onClick={() => navigate("/login")}
                className="w-full py-3.5 rounded-xl font-bold tracking-wide"
              >
                Return to Sign In
              </Button>

              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="flex items-center justify-center gap-1.5 text-sm font-bold text-brand-blue-light hover:text-brand-blue disabled:opacity-50 transition-colors mx-auto select-none focus:outline-none"
              >
                <RefreshCw className={`w-4 h-4 stroke-[2.2] ${isResending ? "animate-spin" : ""}`} />
                <span>{isResending ? "Resending reset link..." : "Didn't receive email? Resend"}</span>
              </button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* STANDARD STATE: INPUT FORM */
        <Card className="w-full max-w-lg border border-slate-100 shadow-xl shadow-slate-100/40 p-2 sm:p-4 rounded-2xl bg-white">
          <CardContent className="space-y-6">
            {/* Back Arrow & Header */}
            <div className="space-y-4">
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-wider select-none"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Back to Login</span>
              </Link>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Forgot Password</h2>
                <p className="text-sm text-slate-500 font-medium">
                  Enter your email address and we'll send you a password reset link.
                </p>
              </div>
            </div>

            {/* Error Banner */}
            {authError && (
              <div
                className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm animate-fadeIn"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="w-4.5 h-4.5 text-slate-400 stroke-[2]" />}
                error={errors.email?.message}
                disabled={isSubmitting}
                {...register("email")}
              />

              <Button
                type="submit"
                className="w-full py-3.5 rounded-xl shadow-lg shadow-brand-blue/10 flex items-center justify-center font-bold tracking-wide animate-pulse"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </AuthLayout>
  );
}
