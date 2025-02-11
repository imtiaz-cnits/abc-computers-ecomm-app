"use client";

import DashboardNavbar from "@/Components/Dashboard/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar/DashboardSidebar";
import AdminRoute from "@/Components/Routes/AdminRoute/AdminRoute";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const path = usePathname();

  useEffect(() => {

    // ..............Table searchbar filter Start.......................//
    const searchInput = document.querySelector("#searchInput");
    searchInput?.addEventListener("input", function () {
      const filter = searchInput?.value?.toLowerCase();
      const rows = document?.querySelectorAll("#printTable tbody tr");

      rows?.forEach((row) => {
        const cells = row.querySelectorAll("td");
        let isMatch = false;

        cells.forEach((cell) => {
          if (cell.textContent.toLowerCase().includes(filter)) {
            isMatch = true;
          }
        });

        row.style.display = isMatch ? "" : "none";
      });

    });
    // ..............Table searchbar filter End.......................//
  }, [path]);

  return (
    <AdminRoute>
      <DashboardNavbar />
      <DashboardSidebar />
      {children}
    </AdminRoute>
  );
};

export default DashboardLayout;
