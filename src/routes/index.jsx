/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate, Outlet, useMatches } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuthStore } from "../store/authStore";
import { appRoutes } from "./appRoutes";
import { authRoutes } from "./authRoutes";

const LandingPage = lazy(() => import("../pages/LandingPage"));

const ProtectedLayout = () => {
  const { isAuthenticated, user, isHydrated } = useAuthStore();
  const matches = useMatches();

  if (!isHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Optional role based access check
  const currentMatch = matches[matches.length - 1];
  const allowedRoles =
    currentMatch?.handle?.allowedRoles ??
    matches
      .map((m) => m.handle?.allowedRoles)
      .filter(Boolean)
      .flat()
      .at(-1);

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // return <Navigate to="/" replace />;
    return <Navigate to="/unauthorized" replace />;

  }

  return <Outlet />;
};

const PublicLayout = () => {
  const { isAuthenticated, isHydrated } = useAuthStore();

  if (!isHydrated) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const router = createBrowserRouter([
  // Public landing page
  {
    path: "/",
    element: (
      <Suspense fallback={null}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    element: <ProtectedLayout />,
    children: appRoutes,
  },
  {
    element: <PublicLayout />,
    children: authRoutes,
  },
  {
    path: "*",
    element: (
      <div className="text-center p-10 font-bold">404 - Page Not Found</div>
    ),
  },
]);
