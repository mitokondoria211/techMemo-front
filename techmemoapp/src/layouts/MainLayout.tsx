import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Box, Toolbar } from "@mui/material";
import { useAuth } from "../features/auth/useAuth";
import { useState } from "react";

const MainLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <div className="flex flex-col h-screen">
      <Header user={user} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 min-h-0">
        {user && sidebarOpen && <Sidebar />}
        <Box
          className={`flex flex-1 flex-col min-w-0 min-h-0 overflow-auto ${
            user && sidebarOpen ? "ml-60" : ""
          }`}
        >
          <Toolbar />
          <div className="flex-1 min-h-0 px-4 py-3">
            {/* ← Outletをラップ */}
            <Outlet />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default MainLayout;
