import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const AuthLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-242px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
