import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 via-base-100 to-base-200 text-base-content">
      <Navbar />
      <main className="min-h-screen page-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
