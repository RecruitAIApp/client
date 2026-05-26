import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

/** Clears session (server + local) and redirects to login. */
export function useSignOut() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);

  const signOut = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return { signOut, isLoading };
}
