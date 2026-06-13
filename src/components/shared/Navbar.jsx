import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, User, Settings, LogOut, Menu, Loader2, ChevronDown, Check,
  Plus, Building, Bookmark, Briefcase, Calendar, Info, ClipboardList, X,
} from "lucide-react";
import { useSignOut } from "../../hooks/useSignOut";
import { useEmployerStore } from "../../store/employerStore";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { useNotificationStore } from "../../store/notificationStore";
import { useAuthStore } from "../../store/authStore";

/* ── Brand logo mark — consistent with landing & loader ── */
function BrandLogo({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 group focus:outline-none"
      aria-label="Naqla Homepage"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0"
        style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563EB 100%)" }}
      >
        <span className="text-white font-black text-base select-none">N</span>
      </div>
      <span
        className="font-black text-lg tracking-tight select-none"
        style={{
          background: "linear-gradient(135deg, #1e3a8a, #2563EB)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Naqla
      </span>
    </button>
  );
}

/* ── Candidate avatar ── */
function CandidateAvatar({ userName }) {
  const { profile } = useProfile();
  if (profile?.profilePicture?.url) {
    return (
      <img
        src={profile.profilePicture.url}
        alt={userName}
        className="w-8 h-8 rounded-full object-cover"
      />
    );
  }
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{ background: "linear-gradient(135deg, #1e3a8a, #2563EB)" }}
    >
      <span className="text-white text-sm font-semibold">{userName?.[0] || "U"}</span>
    </div>
  );
}

/* ── Nav link pill ── */
function NavLink({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150"
      style={{
        color: active ? "#2563EB" : "#475569",
        background: active ? "#eff6ff" : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.color = "#2563EB";
          e.currentTarget.style.background = "#f8fafc";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.color = "#475569";
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      {children}
    </button>
  );
}

export function Navbar() {
  const navigate = useNavigate();
  const { signOut, isLoading } = useSignOut();
  const { user } = useAuthStore();
  const userRole = user?.role;
  const userName = user?.fullName || user?.email;
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const { memberships, activeCompanyId, activeCompany, fetchMemberships, setActiveCompanyId } =
    useEmployerStore();
  const [showWorkspaceMenu, setShowWorkspaceMenu] = React.useState(false);

  const userMenuRef = React.useRef(null);
  const notificationsRef = React.useRef(null);
  const workspaceMenuRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target))
        setShowUserMenu(false);
      if (notificationsRef.current && !notificationsRef.current.contains(event.target))
        setShowNotifications(false);
      if (workspaceMenuRef.current && !workspaceMenuRef.current.contains(event.target))
        setShowWorkspaceMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (userRole === "employer" && user?._id) {
      fetchMemberships().catch((err) => console.error("Error loading memberships:", err));
    }
  }, [userRole, fetchMemberships, user?._id]);

  const handleSwitchCompany = (companyId) => {
    setActiveCompanyId(companyId);
    setShowWorkspaceMenu(false);
    navigate(`/employer/company/${companyId}`);
  };

  const handleSignOut = async () => {
    setShowUserMenu(false);
    setShowMobileMenu(false);
    setShowNotifications(false);
    setShowWorkspaceMenu(false);
    await signOut();
  };

  const { notifications, unreadCount, markRead } = useNotificationStore();

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #f1f5f9",
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Logo + Workspace + Nav links */}
          <div className="flex items-center gap-6">
            <BrandLogo onClick={() => navigate("/")} />

            {/* Workspace Switcher (employer only) */}
            {userRole === "employer" && memberships.length > 0 && (
              <div className="relative" ref={workspaceMenuRef}>
                <button
                  onClick={() => {
                    setShowWorkspaceMenu(!showWorkspaceMenu);
                    setShowUserMenu(false);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all max-w-[12rem]"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    color: "#334155",
                  }}
                >
                  <div className="w-5 h-5 rounded bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700 shrink-0 overflow-hidden">
                    {activeCompany?.logo ? (
                      <img src={activeCompany.logo} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Building className="w-3 h-3" />
                    )}
                  </div>
                  <span className="truncate">{activeCompany?.name || "Select Company"}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5" />
                </button>

                {showWorkspaceMenu && (
                  <div
                    className="absolute left-0 mt-2 w-64 bg-white rounded-xl py-2 z-50"
                    style={{
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Workspaces
                    </div>
                    <div className="max-h-60 overflow-y-auto py-1">
                      {memberships.map((m) => (
                        <button
                          key={m.company?._id}
                          onClick={() => handleSwitchCompany(m.company?._id)}
                          className="w-full px-4 py-2.5 text-left text-sm flex items-center justify-between gap-3 transition-colors"
                          style={{ color: "#334155" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600 shrink-0 overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
                              {m.company?.logo ? (
                                <img src={m.company.logo} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <Building className="w-4 h-4" />
                              )}
                            </div>
                            <div className="truncate text-left">
                              <p className="font-semibold text-slate-800 truncate">{m.company?.name}</p>
                              <p className="text-xs text-slate-400 capitalize">{m.role}</p>
                            </div>
                          </div>
                          {m.company?._id === activeCompanyId && (
                            <Check className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div style={{ borderTop: "1px solid #f1f5f9" }} className="my-1" />
                    <button
                      onClick={() => { setShowWorkspaceMenu(false); navigate("/employer/company-onboarding"); }}
                      className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors"
                      style={{ color: "#64748b" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Plus className="w-4 h-4 text-slate-400" /> Create Company
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Nav links by role — desktop */}
            {userRole && (
              <div className="hidden md:flex items-center gap-0.5">
                {userRole === "candidate" && (
                  <>
                    <NavLink onClick={() => navigate("/candidate/dashboard")}>Dashboard</NavLink>
                    <NavLink onClick={() => navigate("/candidate/jobs")}>Find Jobs</NavLink>
                    <NavLink onClick={() => navigate("/candidate/applications")}>My Applications</NavLink>
                    <NavLink onClick={() => navigate("/candidate/profile")}>Profile</NavLink>
                  </>
                )}
                {userRole === "employer" && (
                  <>
                    <NavLink onClick={() => navigate(activeCompanyId ? `/employer/company/${activeCompanyId}` : "/employer/dashboard")}>Dashboard</NavLink>
                    <NavLink onClick={() => navigate(activeCompanyId ? `/employer/company/${activeCompanyId}/jobs` : "/employer/jobs")}>Jobs</NavLink>
                    <NavLink onClick={() => navigate("/employer/analytics")}>Analytics</NavLink>
                  </>
                )}
                {userRole === "admin" && (
                  <>
                    <NavLink onClick={() => navigate("/admin/dashboard")}>Dashboard</NavLink>
                    <NavLink onClick={() => navigate("/admin/users")}>Users</NavLink>
                    <NavLink onClick={() => navigate("/admin/moderation")}>Moderation</NavLink>
                    <NavLink onClick={() => navigate("/admin/analytics")}>Analytics</NavLink>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {userRole && (
              <>
                {/* Notification bell */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                    className="relative p-2 rounded-lg transition-all duration-150"
                    style={{ color: "#64748b" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#0f172a"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; }}
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div
                      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl py-2 z-50"
                      style={{ border: "1px solid #e2e8f0", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
                    >
                      <div className="px-4 py-2.5 flex items-center justify-between" style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <h3 className="font-semibold text-sm text-slate-900">Notifications</h3>
                        <button
                          onClick={() => { setShowNotifications(false); navigate("/notifications"); }}
                          className="text-xs font-semibold"
                          style={{ color: "#2563EB" }}
                        >
                          See all
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-10 text-center">
                            <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                            <p className="text-sm text-slate-400">No notifications</p>
                          </div>
                        ) : (
                          notifications.slice(0, 5).map((notif) => {
                            const getIcon = (type) => {
                              switch (type) {
                                case "application": return <ClipboardList className="w-4 h-4" style={{ color: "#6366f1" }} />;
                                case "job": return <Briefcase className="w-4 h-4" style={{ color: "#2563EB" }} />;
                                case "interview": return <Calendar className="w-4 h-4" style={{ color: "#0891b2" }} />;
                                case "system": return <Settings className="w-4 h-4" style={{ color: "#64748b" }} />;
                                default: return <Info className="w-4 h-4" style={{ color: "#2563EB" }} />;
                              }
                            };
                            return (
                              <div
                                key={notif._id}
                                onClick={() => { markRead(notif._id); if (notif.link) navigate(notif.link); setShowNotifications(false); }}
                                className="px-4 py-3 cursor-pointer relative flex gap-3 transition-colors"
                                style={{
                                  background: !notif.read ? "#eff6ff" : "transparent",
                                  borderLeft: `3px solid ${!notif.read ? "#2563EB" : "transparent"}`,
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = !notif.read ? "#dbeafe" : "#f8fafc")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = !notif.read ? "#eff6ff" : "transparent")}
                              >
                                <div className="shrink-0 mt-0.5">{getIcon(notif.type)}</div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm tracking-tight ${!notif.read ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}>
                                    {notif.title}
                                  </p>
                                  <p className={`text-xs mt-0.5 line-clamp-2 ${!notif.read ? "text-slate-700" : "text-slate-400"}`}>
                                    {notif.message}
                                  </p>
                                  <p className="text-[10px] text-slate-400 mt-1">
                                    {new Date(notif.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                  </p>
                                </div>
                                {!notif.read && (
                                  <div className="absolute right-3 top-3.5 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                      {notifications.length > 5 && (
                        <div className="px-4 py-2 text-center" style={{ borderTop: "1px solid #f1f5f9" }}>
                          <button
                            onClick={() => { setShowNotifications(false); navigate("/notifications"); }}
                            className="text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors"
                          >
                            View {notifications.length - 5} more
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* User menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                    className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl transition-all duration-150"
                    style={{ border: "1px solid transparent" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
                  >
                    {userRole === "candidate" ? (
                      <CandidateAvatar userName={userName} />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg, #1e3a8a, #2563EB)" }}
                      >
                        <span className="text-white text-sm font-semibold">{userName?.[0] || "U"}</span>
                      </div>
                    )}
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {showUserMenu && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl py-2 z-50"
                      style={{ border: "1px solid #e2e8f0", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
                    >
                      <div className="px-4 py-2.5" style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <p className="font-semibold text-sm text-slate-900 truncate">{userName}</p>
                        <p className="text-xs text-slate-400 capitalize mt-0.5">{userRole}</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => { setShowUserMenu(false); navigate(`/${userRole === "employer" ? "employer" : "candidate"}/profile`); }}
                          className="w-full px-4 py-2 text-left text-sm flex items-center gap-2.5 transition-colors"
                          style={{ color: "#334155" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <User className="w-4 h-4 text-slate-400" /> Profile
                        </button>
                        {userRole === "candidate" && (
                          <button
                            onClick={() => { setShowUserMenu(false); navigate("/candidate/saved-jobs"); }}
                            className="w-full px-4 py-2 text-left text-sm flex items-center gap-2.5 transition-colors"
                            style={{ color: "#334155" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <Bookmark className="w-4 h-4 text-slate-400" /> Saved Jobs
                          </button>
                        )}
                      </div>
                      <div style={{ borderTop: "1px solid #f1f5f9" }} className="my-1" />
                      <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isLoading}
                        className="w-full px-4 py-2 text-left text-sm flex items-center gap-2.5 transition-colors disabled:opacity-50"
                        style={{ color: "#dc2626" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#fef2f2")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Guest buttons — desktop */}
            {!userRole && (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
                  style={{ color: "#475569" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#0f172a"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-px active:scale-95"
                  style={{
                    background: "#2563EB",
                    boxShadow: "0 2px 10px rgba(37,99,235,0.3)",
                  }}
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Hamburger — mobile */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden" style={{ borderTop: "1px solid #f1f5f9", background: "white" }}>
          <div className="px-4 py-3 space-y-1">
            {userRole === "candidate" && (
              <>
                {[
                  { label: "Dashboard", path: "/candidate/dashboard" },
                  { label: "Find Jobs", path: "/candidate/jobs" },
                  { label: "My Applications", path: "/candidate/applications" },
                  { label: "Profile", path: "/candidate/profile" },
                ].map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => { setShowMobileMenu(false); navigate(path); }}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </>
            )}
            {userRole === "employer" && (
              <>
                {[
                  { label: "Dashboard", path: activeCompanyId ? `/employer/company/${activeCompanyId}` : "/employer/dashboard" },
                  { label: "Jobs", path: activeCompanyId ? `/employer/company/${activeCompanyId}/jobs` : "/employer/jobs" },
                  { label: "Profile", path: "/employer/profile" },
                ].map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => { setShowMobileMenu(false); navigate(path); }}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </>
            )}
            {userRole === "admin" && (
              <>
                {[
                  { label: "Dashboard", path: "/admin/dashboard" },
                  { label: "Users", path: "/admin/users" },
                ].map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => { setShowMobileMenu(false); navigate(path); }}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </>
            )}
            {!userRole && (
              <div className="flex flex-col gap-2 pt-2 pb-1" style={{ borderTop: "1px solid #f1f5f9" }}>
                <button
                  onClick={() => { setShowMobileMenu(false); navigate("/login"); }}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  style={{ border: "1.5px solid #e2e8f0" }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setShowMobileMenu(false); navigate("/register"); }}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: "#2563EB" }}
                >
                  Get Started
                </button>
              </div>
            )}
            {userRole && (
              <div className="pt-2" style={{ borderTop: "1px solid #f1f5f9" }}>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
