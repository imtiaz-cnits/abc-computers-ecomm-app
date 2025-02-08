"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Preloader = () => {
  const path = usePathname();

  // Prevent Preloader from rendering on /dashboard and /dashboard/login
  if (path.startsWith("/dashboard")) {
    return null;
  }

  useEffect(() => {
    setTimeout(() => {
      document.body.style.visibility = "visible";
      document.body.classList.add("fade-in");
      document.querySelector(".preloader_wrapper").style.display = "none";
    }, 2000);
  }, []);

  return (
    <div className="preloader_wrapper">
      <div className="pl">
        <div className="pl__bar"></div>
        <div className="pl__bar"></div>
        <div className="pl__bar"></div>
        <div className="pl__bar"></div>
        <div className="pl__bar"></div>
      </div>
    </div>
  );
};

export default Preloader;
