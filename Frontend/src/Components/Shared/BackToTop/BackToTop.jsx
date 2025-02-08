"use client"
import { usePathname } from "next/navigation";
import React from "react";
import { FaArrowUp } from "react-icons/fa6";

const BackToTop = () => {
  const path = usePathname();

  if (path.startsWith("/dashboard")) {
    return;
  }

  return (
    <>
      {/* <!-- Back to Top Button --> */}
      <div className="progress_bar_container">
        <div className="progress_bar"></div>
      </div>

      {/* <!-- progress circle --> */}
      <div className="progress_circle_container">
        <svg className="progress_circle" viewBox="0 0 100 100">
          <circle
            className="progress_background"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <circle
            className="progress_circle_bar"
            cx="50"
            cy="50"
            r="45"
          ></circle>
        </svg>
        <div className="scroll_to_top">
          <FaArrowUp className="icon" />
        </div>
      </div>
      {/* <!-- Back to Top Button --> */}
    </>
  );
};

export default BackToTop;
