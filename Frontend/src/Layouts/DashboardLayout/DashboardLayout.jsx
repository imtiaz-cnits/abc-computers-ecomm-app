"use client";

import DashboardNavbar from "@/Components/Dashboard/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar/DashboardSidebar";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardLayout = ({ children }) => {
  const path = usePathname();
  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      router.push("/dashboard/login");
      setAuthorized(true);
    }

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

      // Update table and pagination after filtering
      updateTable();
      updatePagination();
    });
    // ..............Table searchbar filter End.......................//

    // ...............Filter Dropdown functionality Start...................//
    document.addEventListener("click", function (event) {
      const dropdownMenu = document.querySelector(".dropdown-menus");
      const dropdownButton = document.querySelector(".dropdown-button");

      // Check if the click is outside the dropdown menu and button
      if (dropdownMenu) {
        if (
          !event.target.closest(".dropdown-custom") &&
          !event.target.closest(".dropdown-button")
        ) {
          dropdownMenu.style.display = "none";
        }
      }
    });

    document
      ?.querySelector(".dropdown-button")
      ?.addEventListener("click", function () {
        const dropdownMenu = document.querySelector(".dropdown-menus");
        dropdownMenu.style.display =
          dropdownMenu.style.display === "block" ? "none" : "block";
      });

    // Add click event listeners to each dropdown link to close the menu
    document.querySelectorAll(".dropdown-menus a").forEach(function (link) {
      link.addEventListener("click", function () {
        const dropdownMenu = document.querySelector(".dropdown-menus");
        dropdownMenu.style.display = "none";
      });
    });

    // ...............Filter Dropdown Daynamic functionality Start...................//

    document.addEventListener("DOMContentLoaded", function () {
      const filterLinks = document.querySelectorAll(".dropdown-menus a");
      const tableRows = document.querySelectorAll("#printTable tbody tr");
      const displayInfo = document.getElementById("display-info");

      function updateTable() {
        let visibleCount = 0;

        tableRows.forEach((row) => {
          if (row.style.display !== "none") {
            visibleCount++;
          }
        });

        // Update the display-info span with the count of visible entries
        displayInfo.textContent = `Showing ${visibleCount} entries`;
      }

      filterLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const filterValue = this.getAttribute("data-filter");

          tableRows.forEach((row) => {
            const rowDate = new Date(row.getAttribute("data-date"));
            const today = new Date();
            let shouldShow = true;

            switch (filterValue) {
              case "all":
                shouldShow = true;
                break;
              case "today":
                shouldShow = rowDate.toDateString() === today.toDateString();
                break;
              case "7":
                shouldShow = (today - rowDate) / (1000 * 60 * 60 * 24) <= 7;
                break;
              case "30":
                shouldShow = (today - rowDate) / (1000 * 60 * 60 * 24) <= 30;
                break;
              case "365":
                shouldShow = (today - rowDate) / (1000 * 60 * 60 * 24) <= 365;
                break;
              default:
                shouldShow = true;
            }

            row.style.display = shouldShow ? "" : "none";
          });

          updateTable(); // Update the table view based on new filter
        });
      });

      updateTable(); // Initial call to set the correct count on page load
    });

    // ...............Filter Dropdown functionality End...................//

    // ................ Entries and Pagination Start.....................//
    document.addEventListener("DOMContentLoaded", () => {
      const table = document.querySelector("#printTable");
      const entriesSelect = document.querySelector("#entries");
      const displayInfo = document.querySelector("#display-info");
      const prevBtn = document.querySelector("#prevBtn");
      const nextBtn = document.querySelector("#nextBtn");
      const paginationContainer = document.querySelector("#pagination");

      let currentPage = 1;
      let entriesPerPage = parseInt(entriesSelect.value);
      let totalEntries = table.querySelectorAll("tbody tr").length;
      let totalPages = Math.ceil(totalEntries / entriesPerPage);
      const pageLinksToShow = 3;

      function updateTable() {
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach((row, index) => {
          row.style.display =
            index >= (currentPage - 1) * entriesPerPage &&
            index < currentPage * entriesPerPage
              ? ""
              : "none";
        });

        displayInfo.textContent = `Showing ${Math.min(
          entriesPerPage * currentPage,
          totalEntries
        )} of ${totalEntries} entries`;
      }

      function updatePagination() {
        totalPages = Math.ceil(totalEntries / entriesPerPage);
        paginationContainer.innerHTML = "";

        const startPage = Math.max(
          1,
          currentPage - Math.floor(pageLinksToShow / 2)
        );
        const endPage = Math.min(totalPages, startPage + pageLinksToShow - 1);

        if (totalPages > 1) {
          if (currentPage > 1) {
            paginationContainer.innerHTML +=
              '<button id="prevBtn" class="btn">Prev</button>';
          }

          for (let i = startPage; i <= endPage; i++) {
            paginationContainer.innerHTML += `<a href="#" class="page-link page-link--${i}">${i}</a>`;
          }

          if (currentPage < totalPages) {
            paginationContainer.innerHTML +=
              '<button id="nextBtn" class="btn">Next</button>';
          }
        }

        // Add event listeners for new pagination links
        document.querySelectorAll(".page-link").forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            currentPage = parseInt(e.target.textContent);
            updateTable();
            updatePagination();
          });
        });

        document.querySelector("#prevBtn")?.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            updateTable();
            updatePagination();
          }
        });

        document.querySelector("#nextBtn")?.addEventListener("click", () => {
          if (currentPage < totalPages) {
            currentPage++;
            updateTable();
            updatePagination();
          }
        });

        // Highlight active page link
        document.querySelectorAll(".page-link").forEach((link) => {
          link.classList.toggle(
            "active",
            parseInt(link.textContent) === currentPage
          );
        });
      }

      entriesSelect.addEventListener("change", (e) => {
        entriesPerPage = parseInt(e.target.value);
        totalEntries = table.querySelectorAll("tbody tr").length;
        currentPage = 1; // Reset to the first page
        updateTable();
        updatePagination();
      });

      // Initial setup
      updateTable();
      updatePagination();
    });
    // ................ Entries and Pagination End.....................//
  }, [path, token]);

  if (!authorized) {
    return;
  }

  return (
    <>
      <DashboardNavbar />
      <DashboardSidebar />
      {children}
    </>
  );
};

export default DashboardLayout;
