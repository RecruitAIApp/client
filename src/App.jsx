import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { router } from "./routes";
import { useAuthStore } from "./store/authStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationListener from "./components/shared/NotificationListener";
import JobChatBox from "./components/chat/JobChatBox";
import { LoadingScreen } from "./components/shared/LoadingScreen";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    queryClient.clear();
  }, [user?._id, isAuthenticated]);

  if (!isHydrated) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationListener />
      <JobChatBox />
      <ToastContainer theme="light" />
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
