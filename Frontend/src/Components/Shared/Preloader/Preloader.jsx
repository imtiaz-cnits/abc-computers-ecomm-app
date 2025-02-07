"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Preloader = () => {
  const path = usePathname();

  // Prevent Preloader from rendering on /dashboard and /dashboard/login
  if (path.startsWith("/dashboard") || path.startsWith("/dashboard/login")) {
    return null;
  }

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
