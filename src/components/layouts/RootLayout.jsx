import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/Navbar";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col relative">
        <Outlet />
      </div>
    </div>
  );
}
