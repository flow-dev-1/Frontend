import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common-pages/navbar/Navbar";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Navbar />
      <Outlet />
    </div>
  );
}
