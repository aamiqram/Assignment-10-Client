import React from "react";
import { Route, Routes } from "react-router-dom";

//Pages
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

//Layout Components
import MainLayout from "../components/layout/MainLayout";

const Router = () => {
  return (
    <Routes>
      {/* Routes with MainLayout (navbar & footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* 404 Routes - No Layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
