import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User, Settings, LogOut, Menu, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useSignOut } from "../../hooks/useSignOut";

export function Navbar({ userRole, userName }) {
  const navigate = useNavigate();
  const { signOut, isLoading } = useSignOut();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const handleSignOut = async () => {
    setShowUserMenu(false);
    setShowMobileMenu(false);
    setShowNotifications(false);
    await signOut();
  };

  const notifications = [];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <nav className="bg-white border-b border-(--color-border) sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Nav links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-linear-to-br from-(--color-brand-blue) to-(--color-brand-teal) rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-(--color-brand-blue) to-(--color-brand-teal) bg-clip-text text-transparent">
                Masar
              </span>
            </button>

            {/* Nav links by role */}
            {userRole && (
              <div className="hidden md:flex items-center gap-1">
                {userRole === "candidate" && (
                  <>
                    <button
                      onClick={() => navigate("/candidate/dashboard")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => navigate("/candidate/jobs")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Find Jobs
                    </button>
                    <button
                      onClick={() => navigate("/candidate/applications")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      My Applications
                    </button>
                    <button
                      onClick={() => navigate("/candidate/profile")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Profile
                    </button>
                  </>
                )}

                {userRole === "employer" && (
                  <>
                    <button
                      onClick={() => navigate("/employer/dashboard")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => navigate("/employer/jobs")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Jobs
                    </button>
                    <button
                      onClick={() => navigate("/employer/pipeline")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Pipeline
                    </button>
                    <button
                      onClick={() => navigate("/employer/analytics")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Analytics
                    </button>
                  </>
                )}

                {userRole === "admin" && (
                  <>
                    <button
                      onClick={() => navigate("/admin/dashboard")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => navigate("/admin/users")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Users
                    </button>
                    <button
                      onClick={() => navigate("/admin/moderation")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Moderation
                    </button>
                    <button
                      onClick={() => navigate("/admin/analytics")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-(--color-brand-blue) hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Analytics
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right — Notifications + User menu */}
          <div className="flex items-center gap-4">
            {userRole && (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowUserMenu(false);
                    }}
                    className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-(--color-border) py-2 z-50">
                      <div className="px-4 py-2 border-b border-(--color-border)">
                        <h3 className="font-semibold text-sm">Notifications</h3>
                      </div>
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${notif.unread ? "border-(--color-brand-teal) bg-blue-50/30" : "border-transparent"}`}
                        >
                          <p className="text-sm">{notif.text}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowUserMenu(!showUserMenu);
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-linear-to-br from-(--color-brand-blue) to-(--color-brand-teal) rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {userName?.[0] || "U"}
                      </span>
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-(--color-border) py-2 z-50">
                      <div className="px-4 py-2 border-b border-(--color-border)">
                        <p className="font-semibold text-sm">{userName}</p>
                        <p className="text-xs text-gray-500 capitalize">
                          {userRole}
                        </p>
                      </div>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                        <User className="w-4 h-4" /> Profile
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                        <Settings className="w-4 h-4" /> Settings
                      </button>
                      <div className="border-t border-(--color-border) my-2"></div>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isLoading}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <LogOut className="w-4 h-4" />
                        )}
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Guest buttons */}
            {!userRole && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button variant="primary" onClick={() => navigate("/register")}>
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-(--color-border) bg-white">
          <div className="px-4 py-2 space-y-1">
            {userRole === "candidate" && (
              <>
                <button
                  onClick={() => navigate("/candidate/dashboard")}
                  className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-50 rounded-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate("/candidate/jobs")}
                  className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-50 rounded-lg"
                >
                  Find Jobs
                </button>
                <button
                  onClick={() => navigate("/candidate/applications")}
                  className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-50 rounded-lg"
                >
                  My Applications
                </button>
              </>
            )}
            {userRole === "employer" && (
              <>
                <button
                  onClick={() => navigate("/employer/dashboard")}
                  className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-50 rounded-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate("/employer/jobs")}
                  className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-50 rounded-lg"
                >
                  Jobs
                </button>
              </>
            )}
            {userRole === "admin" && (
              <>
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-50 rounded-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate("/admin/users")}
                  className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-50 rounded-lg"
                >
                  Users
                </button>
              </>
            )}
            <div className="border-t border-(--color-border) my-2 pt-2">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isLoading}
                className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
