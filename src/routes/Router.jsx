import React from "react";
import { Route, Routes } from "react-router-dom";

//Layout Components
import MainLayout from "../components/layout/MainLayout";

//Pages
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import TermsPage from "../pages/TermsPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AddTransaction from "../pages/AddTransactions";
import MyTransactions from "../pages/MyTransactions";
import Profile from "../pages/Profile";
import Reports from "../pages/Reports";
import TransactionDetail from "../pages/TransactionDetail";
import UpdateTransaction from "../pages/UpdateTransaction";

const Router = () => {
  return (
    <Routes>
      {/* Routes with MainLayout (navbar & footer) */}
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Private Routes */}
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/my-transactions" element={<MyTransactions />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
        <Route path="/transaction/update/:id" element={<UpdateTransaction />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reports" element={<Reports />} />
      </Route>

      {/* 404 Routes - No Layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
