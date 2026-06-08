import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEmployerStore } from "../store/employerStore";
import { queryClient } from "../App";

/** Clears session (server + local) and redirects to login. */
export function useSignOut() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);

  const signOut = async () => {
    try {
      useEmployerStore.getState().reset();
    } catch (e) {
      console.error(e);
    }
    try {
      queryClient.clear();
    } catch (e) {
      console.error(e);
    }
    await logout();
    navigate("/login", { replace: true });
  };

  return { signOut, isLoading };
}
