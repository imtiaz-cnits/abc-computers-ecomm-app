"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Preloader = () => {
  const path = usePathname();

  if (path.startsWith("/dashboard/login")) {
    return;
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
