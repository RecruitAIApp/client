import { create } from "zustand";
import { AUTH_API_URL } from "../config/api.config.js";
import { useEmployerStore } from "./employerStore.js";

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function persistTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
}

function clearStoredTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("pendingOwnerEmail");
}

async function parseAuthResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || "Request failed.";
    const error = new Error(message);
    error.status = response.status;
    error.payload = data;
    throw error;
  }
  return data;
}

async function authFetch(path, { method = "GET", body, headers = {} } = {}) {
  const token = localStorage.getItem("accessToken");
  const requestHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const isCredentialsEndpoint = path === "/refresh" || path === "/logout";

  const response = await fetch(`${AUTH_API_URL}${path}`, {
    method,
    headers: requestHeaders,
    ...(isCredentialsEndpoint ? { credentials: "include" } : {}),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  return parseAuthResponse(response);
}

function applySession(set, get, { user, accessToken, refreshToken, membership }) {
  persistTokens({ accessToken, refreshToken });

  const storedAccessToken = localStorage.getItem("accessToken");
  const nextUser = user ?? get().user;

  set({
    user: nextUser,
    accessToken: storedAccessToken,
    membership: membership ?? get().membership ?? null,
    isAuthenticated: Boolean(nextUser && storedAccessToken),
    error: null,
  });
}

function clearSession(set) {
  clearStoredTokens();
  try {
    useEmployerStore.getState().reset();
  } catch (e) {
    console.error("Failed to reset employer store on clearSession:", e);
  }

  set({
    user: null,
    accessToken: null,
    membership: null,
    isAuthenticated: false,
    error: null,
  });
}

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  membership: null,
  isAuthenticated: false,
  isHydrated: false,
  isLoading: false,
  error: null,

  setUser: (user) => {
    const accessToken = localStorage.getItem("accessToken");
    set({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      error: null,
    });
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authFetch("/login", {
        method: "POST",
        body: { email, password },
      });

      if (!data.success) {
        throw new Error(data.message || "Login failed.");
      }

      applySession(set, get, {
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        membership: data.membership ?? null,
      });

      return data;
    } catch (err) {
      clearSession(set);
      set({ error: err.message || "Login failed." });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (
    email,
    password,
    role = "candidate",
    fullName,
    employerType,
  ) => {
    set({ isLoading: true, error: null });
    try {
      const body = { email, password, role };
      if (fullName?.trim()) {
        body.fullName = fullName.trim();
      }
      if (role === "employer" && employerType) {
        body.employerType = employerType;
      }

      const data = await authFetch("/register", {
        method: "POST",
        body,
      });

      if (!data.success) {
        throw new Error(data.message || "Registration failed.");
      }

      if (!data.accessToken) {
        clearStoredTokens();
        set({
          user: data.user ?? null,
          accessToken: null,
          membership: data.membership ?? null,
          isAuthenticated: false,
          error: null,
        });
        return data;
      }

      applySession(set, get, {
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        membership: data.membership ?? null,
      });

      return data;
    } catch (err) {
      clearSession(set);
      set({ error: err.message || "Registration failed." });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  refreshToken: async ({ silent = false } = {}) => {
    if (!silent) {
      set({ isLoading: true, error: null });
    }

    try {
      const storedRefresh = localStorage.getItem("refreshToken");
      if (!storedRefresh) {
        throw new Error("Session expired, please login again.");
      }

      const data = await authFetch("/refresh", {
        method: "POST",
        body: { refreshToken: storedRefresh },
      });

      if (!data.success) {
        throw new Error(data.message || "Session expired, please login again.");
      }

      applySession(set, get, {
        user: data.user,
        accessToken: data.accessToken,
        membership: data.membership ?? null,
      });

      return data;
    } catch (err) {
      clearSession(set);
      set({ error: err.message || "Session expired, please login again." });
      return null;
    } finally {
      if (!silent) {
        set({ isLoading: false });
      }
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      if (localStorage.getItem("accessToken")) {
        await authFetch("/logout", { method: "POST" });
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      clearSession(set);
      set({ isLoading: false });
    }
  },

  restoreSession: async () => {
    const accessToken = localStorage.getItem("accessToken");

    set({
      accessToken,
      isLoading: true,
      error: null,
    });

    try {
      let data;

      if (accessToken) {
        try {
          data = await authFetch("/me");
        } catch (err) {
          if (err.status !== 401) {
            throw err;
          }

          const refreshed = await get().refreshToken({ silent: true });
          if (!refreshed?.accessToken) {
            return false;
          }

          data = await authFetch("/me");
        }
      } else {
        // Attempt proactive refresh to check for active secure cookie
        const refreshed = await get().refreshToken({ silent: true });
        if (!refreshed?.accessToken) {
          return false;
        }

        data = await authFetch("/me");
      }

      if (!data?.success) {
        throw new Error(data?.message || "Failed to restore session.");
      }

      applySession(set, get, {
        user: data.user,
        membership: data.membership ?? null,
      });
      return true;
    } catch (err) {
      clearSession(set);
      set({ error: err.message || "Failed to restore session." });
      return false;
    } finally {
      set({ isLoading: false, isHydrated: true });
    }
  },
}));
