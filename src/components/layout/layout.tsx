
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarToggle={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
