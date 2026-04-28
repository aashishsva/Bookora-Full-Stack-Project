import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#050816] text-white flex overflow-x-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-hidden">
        <Topbar setSidebarOpen={setSidebarOpen} />

        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;