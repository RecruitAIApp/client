import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function DashboardLayout() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex-1 bg-[#f8fafc] flex flex-col min-h-0">
      <main className="flex-1 min-w-0 overflow-auto flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
