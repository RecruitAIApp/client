import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEmployerStore } from "../store/employerStore";
import { useSignOut } from "../hooks/useSignOut";
import { Card, CardContent} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Building, ArrowRight, ShieldAlert, LogOut, Check } from "lucide-react";

export default function EmployerHrDashboard() {
  const user = useAuthStore((s) => s.user);
  const { memberships, setActiveCompanyId, activeCompanyId } = useEmployerStore();
  const { signOut, isLoading: isSigningOut } = useSignOut();
  const navigate = useNavigate();

  const handleSelectCompany = (companyId) => {
    setActiveCompanyId(companyId);
    navigate(`/employer/company/${companyId}`);
  };

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          HR Recruiter Portal
        </h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Welcome back, {user?.fullName || user?.email}. Manage and access your workspace assignments below.
        </p>
      </div>

      {memberships.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-800">Select Your Company Workspace</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memberships.map((m) => {
              const comp = m.company;
              const isActive = comp?._id === activeCompanyId;
              return (
                <Card 
                  key={comp?._id} 
                  className={`border hover:shadow-md transition-all duration-300 rounded-2xl bg-white overflow-hidden cursor-pointer group ${
                    isActive ? "border-brand-blue ring-1 ring-brand-blue" : "border-slate-100"
                  }`}
                  onClick={() => handleSelectCompany(comp?._id)}
                >
                  <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 overflow-hidden border border-slate-200 group-hover:scale-105 transition-transform">
                        {comp?.logo ? (
                          <img src={comp.logo} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Building className="w-6 h-6" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-855 truncate group-hover:text-brand-blue transition-colors">
                            {comp?.name}
                          </h3>
                          {isActive && (
                            <span className="bg-blue-50 text-brand-blue text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                              <Check className="w-3 h-3" /> Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 font-medium capitalize">
                          Role: {m.role}
                        </p>
                        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                          {comp?.description || "No description provided."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <span className="text-xs text-slate-400 font-medium">
                        {comp?.industry} {comp?.location ? `• ${comp.location}` : ""}
                      </span>
                      <Button 
                        variant={isActive ? "primary" : "ghost"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectCompany(comp?._id);
                        }}
                        className="group-hover:translate-x-1 transition-transform"
                      >
                        Enter Workspace <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <Card className="border border-slate-100 shadow-xl rounded-2xl bg-white text-center p-8 max-w-lg mx-auto">
          <CardContent className="space-y-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 border border-blue-100 text-brand-blue rounded-full flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Workspace Unlinked
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                You are registered as an HR Recruiter, but you are not linked to any company workspace yet.
              </p>
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl inline-block mt-2">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Your Registered Email</p>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">{user?.email}</p>
              </div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed mt-2">
                Please request your company owner or administrator to invite you via this email address. Once invited, you can accept the invitation to access the company's job postings and pipeline.
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-50 w-full flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={signOut} disabled={isSigningOut} variant="outline" className="w-full sm:w-auto">
                <LogOut className="w-4 h-4 mr-1.5" />
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
