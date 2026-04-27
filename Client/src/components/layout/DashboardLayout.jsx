import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        <Topbar />

        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;