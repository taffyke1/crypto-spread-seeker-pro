
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  // Handle sidebar state based on screen size
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      // Try to restore sidebar state from localStorage
      const savedState = localStorage.getItem("sidebarOpen");
      if (savedState) {
        setSidebarOpen(savedState === "true");
      }
    }
  }, [isMobile]);
  
  // Persist sidebar state
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem("sidebarOpen", String(sidebarOpen));
    }
  }, [sidebarOpen, isMobile]);
  
  // Load and apply theme from localStorage on mount
  useEffect(() => {
    // Force dark theme to match arbitragescanner.io
    setTheme("dark");
  }, [setTheme]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <div className={`${sidebarOpen ? "block" : "hidden"} md:block transition-all duration-300`}>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarToggle={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gradient-to-b from-background to-background/80">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
