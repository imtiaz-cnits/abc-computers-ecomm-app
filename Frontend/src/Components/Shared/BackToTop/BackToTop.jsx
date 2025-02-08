"use client"
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

const BackToTop = () => {
  const path = usePathname();

  if (path.startsWith("/dashboard")) {
    return;
  }

  useEffect(() => {
    // Back to top button Start....................
    function updateProgressBar() {
      const progressBar = document.querySelector(".progress_bar");
      const progressBarContainer = document.querySelector(
        ".progress_bar_container"
      );
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;

      progressBar.style.width = progress + "%";

      if (window.pageYOffset > 100) {
        progressBarContainer.classList.add("visible");
      } else {
        progressBarContainer.classList.remove("visible");
      }
    }

    // Function to update the progress circle
    function updateProgressCircle() {
      const progressElement = document.querySelector(".progress_circle_bar");
      const scrollToTopElement = document.querySelector(".scroll_to_top");
      const progressCircleContainer = document.querySelector(
        ".progress_circle_container"
      );
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      let progress = (window.pageYOffset / totalHeight) * 283;
      progress = Math.min(progress, 283);
      progressElement.style.strokeDashoffset = 283 - progress;

      // Show or hide the progress circle container based on scroll position
      if (window.pageYOffset > 100) {
        progressCircleContainer.classList.add("visible");
      } else {
        progressCircleContainer.classList.remove("visible");
      }

      // Show or hide the "Back to Top" button
      if (window.pageYOffset > 100) {
        scrollToTopElement.style.display = "flex";
      } else {
        scrollToTopElement.style.display = "none";
      }
    }

    // Function to scroll to the top of the page
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Select the "Back to Top" button element
    const scrollToTopElement = document.querySelector(".scroll_to_top");
    scrollToTopElement.addEventListener("click", scrollToTop);

    updateProgressBar();
    updateProgressCircle();

    // Add event listeners for scroll and resize
    window.addEventListener("scroll", () => {
      updateProgressBar();
      updateProgressCircle();
    });
    window.addEventListener("resize", () => {
      updateProgressBar();
      updateProgressCircle();
    });

    // Back to top button End.........
  }, [])

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
