import React from "react";
import "@/assets/css/navbar-sidebar.css";
import "@/assets/css/all-modal.css";
import "@/assets/css/table-function.css";
import DashboardLayout from "@/Layouts/DashboardLayout/DashboardLayout";
import Preloader from "@/Components/Shared/Preloader/Preloader";

export const metadata = {
  title: "Dashboard | ABC Computers",
};

const layout = ({ children }) => {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
};

export default layout;
