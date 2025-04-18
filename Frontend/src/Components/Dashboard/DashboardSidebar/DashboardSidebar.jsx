"use client";

import { useEffect, useState } from "react";
import logo from "@/assets/img/abc-logo-icon.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardActiveLink from "../DashboardActiveLink/DashboardActiveLink";
import DashboardSubmenu from "../DashboardSubmenu/DashboardSubmenu";
import Navigate from "@/Components/Shared/Navigate/Navigate";

const DashboardSidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const [isSidebarEnabled, setIsSidebarEnabled] = useState(false);



  useEffect(() => {
    // Ensure code runs only in the browser
    if (typeof window === "undefined" || typeof document === "undefined") return;
  }, []);


  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Make a POST request to the logout endpoint
      const response = await fetch("https://api.abcpabnabd.com/api/v1/Logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request to maintain session
      });

      // Check if the request was successful
      if (response.ok) {
        // Clear the client-side authentication token (if it's stored in localStorage)
        localStorage.removeItem("token"); // Clear any stored token from localStorage

        // Optionally, also clear sessionStorage if used
        sessionStorage.removeItem("token"); // Clear session storage if token is stored there

        // Redirect the user to the login page after successful logout
        router.push("/dashboard/login"); // Redirect to login
      } else {
        // Handle errors if the response is not OK (e.g., display a message to the user)
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error during logout:", error);
    }
  };

  // Hide the sidebar if the user is on the login page
  if (path.startsWith("/dashboard/login")) {
    return null;
  }

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    if (typeof document === "undefined" || typeof window === "undefined") return;
  
    const currentSize = document.body.getAttribute("data-sidebar-size");
  
    document.body.classList.toggle("sidebar-enable");
  
    if (window.innerWidth >= 992) {
      document.body.setAttribute(
        "data-sidebar-size",
        currentSize === "sm" ? "lg" : "sm"
      );
    }
  
    setIsSidebarEnabled((prevState) => !prevState);
  };


  const handleSubmenuToggle = (item) => {
    if (typeof document === "undefined") return;
  
    const currentActive = item?.classList?.contains("active");
  
    if (currentActive) {
      item?.classList?.remove("active");
      return;
    }
  
    const activeSubmenu = document.querySelector(".vertical-menu .submenu-active.active");
  
    if (activeSubmenu) {
      activeSubmenu?.classList?.remove("active");
    }
  
    item?.classList?.add("active");
  };

  return (
    <div className="vertical-menu">
      <button
        type="button"
        className="btn btn-sm px-3 font-size-24 header-item waves-effect vertical-menu-btn"
        onClick={() => toggleSidebar(!isSidebarEnabled)}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="#EEEEEE" />
          <path
            d="M9.5 9.5V30.5M30.5 20H14.1667M14.1667 20L22.3333 28.1667M14.1667 20L22.3333 11.8333"
            stroke="#171717"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* <!-- LOGO Box --> */}
      <div className="navbar-brand-box">
        <Link href="/dashboard" className="logo logo-dark">
          <span className="logo-sm">
            <svg
              width="52"
              height="53"
              viewBox="0 0 52 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.2051 35.4792V14.3447H21.5219V20.7907C22.8582 20.0059 23.9075 19.5898 26.2534 19.5898C28.2403 19.5898 29.884 20.5005 31.1847 21.8557C32.4854 23.2012 33.1357 25.1378 33.1357 27.6655C33.1357 30.2797 32.47 32.2932 31.1386 33.706C29.8175 35.1188 28.2096 35.592 26.3149 35.592C25.3829 35.592 24.4612 35.609 23.5497 35.1765C22.6484 34.7344 21.8701 34.0856 21.2146 33.2303V35.4792H17.2051ZM21.4911 27.4925C21.4911 29.0783 21.7574 30.2509 22.29 31.0101C23.0376 32.0866 24.031 32.6248 25.2702 32.6248C26.2227 32.6248 27.0318 32.2451 27.6975 31.4859C28.3734 30.717 28.7114 29.5108 28.7114 27.8673C28.7114 26.1182 28.3734 24.8591 27.6975 24.0902C27.0215 23.3118 26.1561 22.9225 25.1013 22.9225C24.0669 22.9225 23.2066 23.3021 22.5204 24.0614C21.8342 24.8111 21.4911 25.9548 21.4911 27.4925Z"
                fill="url(#paint0_linear_2019_70)"
              />
              <path
                d="M10.7068 24.8169L6.59549 24.1501C7.05767 22.662 7.85306 21.5604 8.98165 20.8453C10.1102 20.1302 11.787 19.7727 14.0119 19.7727C16.0327 19.7727 17.5375 19.9901 18.5263 20.425C19.5152 20.8502 20.2084 21.3961 20.6061 22.0629C21.0146 22.72 21.2188 23.9327 21.2188 25.7011L21.1704 30.4554C21.1704 31.8082 21.4735 32.5752 21.6132 33.2227C21.7637 33.8604 24.2679 34.7797 24.6656 35.5141L17.7202 35.3975C17.6019 35.1269 17.4568 34.8425 17.2849 34.311C17.2096 34.0694 17.5056 34.4929 17.4734 34.4156C16.6995 35.0921 15.8719 35.133 14.9905 35.4712C14.1091 35.8095 12.8189 35.862 11.8193 35.862C10.0565 35.862 8.66457 35.432 7.64347 34.5719C6.63311 33.7119 6.12793 32.6248 6.12793 31.3106C6.12793 30.4409 6.35902 29.6678 6.82121 28.9914C7.28339 28.3053 7.9283 27.7835 8.75594 27.426C9.59432 27.0588 10.7981 26.7399 12.3674 26.4693C14.4849 26.1118 15.952 25.7784 16.7689 25.4692V25.0633C16.7689 24.2806 16.554 23.725 16.124 23.3964C15.6941 23.0582 14.8826 22.8891 13.6895 22.8891C12.8834 22.8891 12.2546 23.034 11.8031 23.3239C11.3517 23.6042 10.9862 24.1018 10.7068 24.8169ZM16.7689 28.1217C16.1885 28.2957 15.2695 28.5034 14.0119 28.745C12.7544 28.9866 11.9321 29.2233 11.5452 29.4553C10.954 29.8321 10.6584 30.3105 10.6584 30.8902C10.6584 31.4604 10.8949 31.9532 11.3678 32.3687C11.8408 32.7842 12.4427 32.992 13.1736 32.992C13.9904 32.992 14.7697 32.7504 15.5114 32.2673C16.0595 31.9001 16.4196 31.4507 16.5916 30.9192C16.7098 30.5714 16.7689 29.9094 16.7689 28.9334V28.1217Z"
                fill="url(#paint1_linear_2019_70)"
              />
              <path
                d="M45.5514 24.672L41.2647 25.3967C41.1203 24.5947 40.7901 23.9907 40.2743 23.5848C39.7688 23.179 39.1085 22.9761 38.2934 22.9761C37.2102 22.9761 36.3435 23.3288 35.6936 24.0342C35.0539 24.7299 34.7341 25.8992 34.7341 27.5419C34.7341 29.3683 35.0591 30.6583 35.709 31.4121C36.3693 32.1658 37.2514 32.5427 38.3553 32.5427C39.1807 32.5427 39.8564 32.3252 40.3826 31.8904C40.9088 31.4459 41.2802 30.6873 41.4968 29.6147L45.768 30.296C45.3244 32.132 44.4733 33.5186 43.2146 34.456C41.9559 35.3933 40.2691 35.862 38.1542 35.862C35.7503 35.862 33.8314 35.1517 32.3973 33.7312C30.9736 32.3107 30.2617 30.3443 30.2617 27.8318C30.2617 25.2904 30.9787 23.3143 32.4128 21.9034C33.8468 20.483 35.7864 19.7727 38.2315 19.7727C40.233 19.7727 41.8218 20.1786 42.9979 20.9903C44.1844 21.7923 45.0355 23.0195 45.5514 24.672Z"
                fill="url(#paint2_linear_2019_70)"
              />
              <circle
                cx="26"
                cy="26.2988"
                r="25.5517"
                stroke="black"
                strokeWidth="0.896552"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2019_70"
                  x1="25.1704"
                  y1="14.3447"
                  x2="25.1704"
                  y2="35.5921"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4CB050" />
                  <stop offset="1" stopColor="#337836" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_2019_70"
                  x1="15.3967"
                  y1="19.7727"
                  x2="15.3967"
                  y2="35.862"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4CB050" />
                  <stop offset="1" stopColor="#337836" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_2019_70"
                  x1="38.0149"
                  y1="19.7727"
                  x2="38.0149"
                  y2="35.862"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4CB050" />
                  <stop offset="1" stopColor="#337836" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="logo-sm2">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.2051 35.1804V14.0459H21.5219V20.4919C22.8582 19.707 23.9075 19.291 26.2534 19.291C28.2403 19.291 29.884 20.2017 31.1847 21.5569C32.4854 22.9024 33.1357 24.839 33.1357 27.3667C33.1357 29.9809 32.47 31.9944 31.1386 33.4072C29.8175 34.82 28.2096 35.2932 26.3149 35.2932C25.3829 35.2932 24.4612 35.3101 23.5497 34.8777C22.6484 34.4355 21.8701 33.7868 21.2146 32.9314V35.1804H17.2051ZM21.4911 27.1937C21.4911 28.7795 21.7574 29.952 22.29 30.7113C23.0376 31.7877 24.031 32.3259 25.2702 32.3259C26.2227 32.3259 27.0318 31.9463 27.6975 31.187C28.3734 30.4182 28.7114 29.212 28.7114 27.5685C28.7114 25.8193 28.3734 24.5603 27.6975 23.7914C27.0215 23.0129 26.1561 22.6237 25.1013 22.6237C24.0669 22.6237 23.2066 23.0033 22.5204 23.7626C21.8342 24.5122 21.4911 25.6559 21.4911 27.1937Z"
                fill="url(#paint0_linear_2019_72)"
              />
              <path
                d="M10.7068 24.5181L6.59549 23.8513C7.05767 22.3632 7.85306 21.2616 8.98165 20.5465C10.1102 19.8314 11.787 19.4739 14.0119 19.4739C16.0327 19.4739 17.5374 19.6913 18.5263 20.1261C19.5152 20.5513 20.2084 21.0973 20.6061 21.7641C21.0146 22.4212 21.2188 23.6339 21.2188 25.4023L21.1704 30.1566C21.1704 31.5094 21.4735 32.2764 21.6132 32.9238C21.7637 33.5616 24.2679 34.4809 24.6656 35.2153L17.7202 35.0987C17.6019 34.8281 17.4568 34.5437 17.2849 34.0122C17.2096 33.7706 17.5056 34.1941 17.4734 34.1168C16.6995 34.7932 15.8719 34.8342 14.9905 35.1724C14.1091 35.5106 12.8189 35.5631 11.8193 35.5631C10.0565 35.5631 8.66457 35.1331 7.64347 34.2731C6.63311 33.4131 6.12793 32.326 6.12793 31.0118C6.12793 30.1421 6.35902 29.369 6.82121 28.6926C7.28339 28.0065 7.9283 27.4847 8.75594 27.1272C9.59432 26.7599 10.7981 26.4411 12.3674 26.1705C14.4849 25.813 15.952 25.4796 16.7689 25.1703V24.7645C16.7689 23.9818 16.554 23.4261 16.124 23.0976C15.6941 22.7594 14.8826 22.5903 13.6895 22.5903C12.8834 22.5903 12.2546 22.7352 11.8031 23.0251C11.3517 23.3053 10.9862 23.803 10.7068 24.5181ZM16.7689 27.8229C16.1885 27.9968 15.2695 28.2046 14.0119 28.4462C12.7544 28.6878 11.9321 28.9245 11.5452 29.1564C10.954 29.5333 10.6584 30.0116 10.6584 30.5914C10.6584 31.1615 10.8949 31.6544 11.3678 32.0699C11.8408 32.4854 12.4427 32.6932 13.1736 32.6932C13.9904 32.6932 14.7697 32.4516 15.5114 31.9684C16.0595 31.6012 16.4196 31.1519 16.5916 30.6204C16.7098 30.2725 16.7689 29.6106 16.7689 28.6346V27.8229Z"
                fill="url(#paint1_linear_2019_72)"
              />
              <path
                d="M45.5514 24.3731L41.2647 25.0979C41.1203 24.2958 40.7901 23.6919 40.2743 23.286C39.7688 22.8802 39.1085 22.6772 38.2934 22.6772C37.2102 22.6772 36.3435 23.0299 35.6936 23.7354C35.0539 24.4311 34.7341 25.6004 34.7341 27.2431C34.7341 29.0695 35.0591 30.3595 35.7091 31.1132C36.3693 31.867 37.2514 32.2438 38.3553 32.2438C39.1807 32.2438 39.8565 32.0264 40.3826 31.5916C40.9088 31.1471 41.2802 30.3885 41.4968 29.3159L45.768 29.9971C45.3244 31.8331 44.4733 33.2198 43.2146 34.1571C41.9559 35.0945 40.2691 35.5631 38.1542 35.5631C35.7503 35.5631 33.8314 34.8529 32.3973 33.4324C30.9736 32.0119 30.2617 30.0454 30.2617 27.533C30.2617 24.9916 30.9787 23.0154 32.4128 21.6046C33.8468 20.1841 35.7864 19.4739 38.2315 19.4739C40.233 19.4739 41.8218 19.8797 42.998 20.6914C44.1844 21.4935 45.0355 22.7207 45.5514 24.3731Z"
                fill="url(#paint2_linear_2019_72)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 51.1034C39.8643 51.1034 51.1034 39.8643 51.1034 26C51.1034 12.1357 39.8643 0.896552 26 0.896552C12.1357 0.896552 0.896552 12.1357 0.896552 26C0.896552 39.8643 12.1357 51.1034 26 51.1034ZM26 52C40.3594 52 52 40.3594 52 26C52 11.6406 40.3594 0 26 0C11.6406 0 0 11.6406 0 26C0 40.3594 11.6406 52 26 52Z"
                fill="black"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2019_72"
                  x1="25.1704"
                  y1="14.0459"
                  x2="25.1704"
                  y2="35.2933"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4CB050" />
                  <stop offset="1" stopColor="#337836" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_2019_72"
                  x1="15.3967"
                  y1="19.4739"
                  x2="15.3967"
                  y2="35.5631"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4CB050" />
                  <stop offset="1" stopColor="#337836" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_2019_72"
                  x1="38.0149"
                  y1="19.4739"
                  x2="38.0149"
                  y2="35.5631"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4CB050" />
                  <stop offset="1" stopColor="#337836" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="logo-lg">
            <img src={logo.src} width={40} height={40} alt="" />

            <span className="brand-name">
              <svg
                width="175"
                height="22"
                viewBox="0 0 175 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3638 17H12.7818L11.3579 13.2956H4.83907L3.49303 17H0L6.35197 0.691778H9.83388L16.3638 17ZM10.3011 10.5479L8.05399 4.49629L5.85138 10.5479H10.3011ZM18.1326 0.691778H24.6514C25.9419 0.691778 26.9023 0.747399 27.5326 0.858642C28.1704 0.962469 28.7378 1.18496 29.2347 1.5261C29.739 1.86725 30.158 2.32334 30.4917 2.89439C30.8254 3.45802 30.9923 4.09211 30.9923 4.79664C30.9923 5.56051 30.7846 6.26134 30.3693 6.89914C29.9614 7.53693 29.4052 8.01527 28.7007 8.33417C29.6945 8.6234 30.4583 9.11658 30.9923 9.8137C31.5263 10.5108 31.7932 11.3303 31.7932 12.2722C31.7932 13.0138 31.619 13.7369 31.2704 14.4414C30.9293 15.1385 30.4583 15.6985 29.8576 16.1212C29.2643 16.5365 28.5301 16.7923 27.655 16.8888C27.1062 16.9481 25.7824 16.9852 23.6836 17H18.1326V0.691778ZM21.4254 3.40611V7.17724H23.5835C24.8665 7.17724 25.6638 7.1587 25.9752 7.12162C26.5389 7.05488 26.9801 6.86206 27.299 6.54316C27.6253 6.21685 27.7885 5.79041 27.7885 5.26386C27.7885 4.75956 27.6476 4.35167 27.3658 4.04019C27.0914 3.7213 26.6798 3.52847 26.131 3.46173C25.8047 3.42465 24.8665 3.40611 23.3165 3.40611H21.4254ZM21.4254 9.89157V14.2523H24.4735C25.66 14.2523 26.4128 14.2189 26.7317 14.1522C27.2212 14.0632 27.6179 13.8481 27.922 13.507C28.2335 13.1584 28.3892 12.6949 28.3892 12.1164C28.3892 11.627 28.2706 11.2117 28.0332 10.8705C27.7959 10.5294 27.4511 10.2809 26.9987 10.1252C26.5537 9.96944 25.5822 9.89157 24.0841 9.89157H21.4254ZM45.02 11.004L48.2127 12.0163C47.7232 13.7962 46.9075 15.12 45.7654 15.9877C44.6307 16.848 43.1882 17.2781 41.438 17.2781C39.2725 17.2781 37.4926 16.5402 36.0984 15.0644C34.7041 13.5811 34.007 11.5565 34.007 8.9905C34.007 6.27618 34.7078 4.16998 36.1095 2.6719C37.5111 1.16641 39.3541 0.41367 41.6383 0.41367C43.6332 0.41367 45.2536 1.00326 46.4996 2.18243C47.2412 2.87956 47.7974 3.88074 48.1682 5.18599L44.9088 5.9647C44.716 5.11925 44.3118 4.45179 43.6962 3.96232C43.0881 3.47285 42.3465 3.22812 41.4714 3.22812C40.2625 3.22812 39.2799 3.66197 38.5234 4.52966C37.7744 5.39736 37.3999 6.80273 37.3999 8.74577C37.3999 10.8075 37.7707 12.2759 38.5123 13.151C39.2539 14.0261 40.218 14.4637 41.4046 14.4637C42.2798 14.4637 43.0325 14.1856 43.6629 13.6293C44.2933 13.0731 44.7456 12.198 45.02 11.004Z"
                  fill="#4CB050"
                />
                <path
                  d="M67.8249 11.004L71.0175 12.0163C70.5281 13.7962 69.7123 15.12 68.5702 15.9877C67.4355 16.848 65.9931 17.2781 64.2428 17.2781C62.0773 17.2781 60.2974 16.5402 58.9032 15.0644C57.5089 13.5811 56.8118 11.5565 56.8118 8.9905C56.8118 6.27618 57.5126 4.16998 58.9143 2.6719C60.3159 1.16641 62.1589 0.41367 64.4431 0.41367C66.438 0.41367 68.0585 1.00326 69.3044 2.18243C70.046 2.87956 70.6022 3.88074 70.973 5.18599L67.7136 5.9647C67.5208 5.11925 67.1166 4.45179 66.5011 3.96232C65.8929 3.47285 65.1513 3.22812 64.2762 3.22812C63.0674 3.22812 62.0847 3.66197 61.3283 4.52966C60.5792 5.39736 60.2047 6.80273 60.2047 8.74577C60.2047 10.8075 60.5755 12.2759 61.3171 13.151C62.0588 14.0261 63.0229 14.4637 64.2095 14.4637C65.0846 14.4637 65.8373 14.1856 66.4677 13.6293C67.0981 13.0731 67.5505 12.198 67.8249 11.004ZM73.1089 10.9261C73.1089 9.88786 73.3648 8.88297 73.8765 7.91145C74.3882 6.93993 75.1113 6.19831 76.0457 5.68659C76.9876 5.17487 78.037 4.91901 79.1939 4.91901C80.9812 4.91901 82.4459 5.50118 83.588 6.66553C84.7301 7.82245 85.3011 9.28715 85.3011 11.0596C85.3011 12.8469 84.7227 14.3302 83.5657 15.5093C82.4162 16.6811 80.9664 17.267 79.2161 17.267C78.1334 17.267 77.0988 17.0222 76.1125 16.5328C75.1335 16.0433 74.3882 15.3276 73.8765 14.3858C73.3648 13.4365 73.1089 12.2833 73.1089 10.9261ZM76.3127 11.093C76.3127 12.2648 76.5908 13.1621 77.147 13.7851C77.7032 14.408 78.3892 14.7195 79.205 14.7195C80.0208 14.7195 80.7031 14.408 81.2519 13.7851C81.8081 13.1621 82.0862 12.2573 82.0862 11.0707C82.0862 9.91382 81.8081 9.02388 81.2519 8.40092C80.7031 7.77796 80.0208 7.46648 79.205 7.46648C78.3892 7.46648 77.7032 7.77796 77.147 8.40092C76.5908 9.02388 76.3127 9.92124 76.3127 11.093ZM87.526 5.18599H90.4072V6.79902C91.438 5.54568 92.6654 4.91901 94.0893 4.91901C94.8458 4.91901 95.5021 5.07475 96.0583 5.38623C96.6145 5.69771 97.0706 6.16864 97.4266 6.79902C97.9457 6.16864 98.5057 5.69771 99.1064 5.38623C99.7071 5.07475 100.349 4.91901 101.031 4.91901C101.899 4.91901 102.633 5.097 103.233 5.45298C103.834 5.80154 104.283 6.31696 104.58 6.99926C104.795 7.50356 104.902 8.31934 104.902 9.4466V17H101.776V10.2476C101.776 9.07579 101.669 8.31934 101.454 7.97819C101.164 7.53322 100.719 7.31074 100.119 7.31074C99.6811 7.31074 99.2695 7.44423 98.8839 7.71121C98.4982 7.97819 98.2201 8.37125 98.0496 8.89039C97.879 9.4021 97.7937 10.2142 97.7937 11.3266V17H94.6678V10.5257C94.6678 9.37615 94.6122 8.63453 94.5009 8.3008C94.3897 7.96707 94.2154 7.71863 93.9781 7.55547C93.7482 7.39231 93.433 7.31074 93.0325 7.31074C92.5505 7.31074 92.1166 7.44052 91.731 7.70009C91.3453 7.95965 91.0672 8.33417 90.8966 8.82364C90.7335 9.31311 90.6519 10.1252 90.6519 11.2599V17H87.526V5.18599ZM107.939 5.18599H110.854V6.92139C111.232 6.32809 111.744 5.84604 112.389 5.47523C113.034 5.10442 113.75 4.91901 114.536 4.91901C115.908 4.91901 117.072 5.45669 118.029 6.53203C118.985 7.60738 119.464 9.10546 119.464 11.0263C119.464 12.999 118.982 14.5341 118.018 15.6317C117.054 16.7219 115.886 17.267 114.514 17.267C113.861 17.267 113.268 17.1372 112.734 16.8776C112.207 16.6181 111.651 16.1731 111.065 15.5427V21.4942H107.939V5.18599ZM111.032 10.8928C111.032 12.2203 111.295 13.2029 111.821 13.8407C112.348 14.4711 112.99 14.7863 113.746 14.7863C114.473 14.7863 115.077 14.497 115.559 13.9186C116.041 13.3327 116.282 12.376 116.282 11.0485C116.282 9.80999 116.034 8.89039 115.537 8.28967C115.04 7.68896 114.425 7.38861 113.69 7.38861C112.926 7.38861 112.292 7.68525 111.788 8.27855C111.284 8.86443 111.032 9.73583 111.032 10.8928ZM129.732 17V15.2312C129.301 15.8616 128.734 16.3585 128.03 16.7219C127.332 17.0853 126.595 17.267 125.816 17.267C125.022 17.267 124.31 17.0927 123.68 16.7441C123.05 16.3956 122.593 15.9061 122.312 15.2757C122.03 14.6454 121.889 13.774 121.889 12.6615V5.18599H125.015V10.6147C125.015 12.2759 125.07 13.2956 125.182 13.6738C125.3 14.0446 125.512 14.3413 125.816 14.5638C126.12 14.7788 126.506 14.8864 126.973 14.8864C127.507 14.8864 127.985 14.7418 128.408 14.4525C128.831 14.1559 129.12 13.7925 129.275 13.3624C129.431 12.9248 129.509 11.8606 129.509 10.1697V5.18599H132.635V17H129.732ZM141.301 5.18599V7.67784H139.165V12.439C139.165 13.4031 139.184 13.9668 139.221 14.1299C139.265 14.2857 139.358 14.4155 139.499 14.5193C139.647 14.6231 139.825 14.675 140.033 14.675C140.322 14.675 140.741 14.5749 141.29 14.3747L141.557 16.7998C140.83 17.1112 140.007 17.267 139.087 17.267C138.523 17.267 138.015 17.1743 137.563 16.9889C137.111 16.7961 136.777 16.5513 136.562 16.2547C136.354 15.9506 136.21 15.5427 136.128 15.031C136.061 14.6676 136.028 13.9334 136.028 12.8284V7.67784H134.593V5.18599H136.028V2.83877L139.165 1.01438V5.18599H141.301ZM150.312 13.24L153.426 13.7628C153.026 14.9049 152.392 15.7763 151.524 16.377C150.664 16.9703 149.585 17.267 148.287 17.267C146.233 17.267 144.712 16.5958 143.726 15.2535C142.947 14.1781 142.558 12.821 142.558 11.182C142.558 9.22412 143.07 7.69267 144.093 6.58766C145.116 5.47523 146.411 4.91901 147.975 4.91901C149.733 4.91901 151.12 5.50118 152.136 6.66553C153.152 7.82245 153.638 9.59863 153.593 11.9941H145.762C145.784 12.9211 146.036 13.6442 146.518 14.1633C147 14.675 147.601 14.9309 148.32 14.9309C148.81 14.9309 149.221 14.7974 149.555 14.5304C149.889 14.2634 150.141 13.8333 150.312 13.24ZM150.49 10.0807C150.467 9.17591 150.234 8.48991 149.789 8.02269C149.344 7.54805 148.802 7.31074 148.165 7.31074C147.482 7.31074 146.919 7.55918 146.474 8.05606C146.029 8.55295 145.81 9.22782 145.817 10.0807H150.49ZM159.144 17H156.018V5.18599H158.922V6.86576C159.419 6.07223 159.864 5.54939 160.257 5.29724C160.657 5.04509 161.11 4.91901 161.614 4.91901C162.326 4.91901 163.012 5.11554 163.672 5.5086L162.704 8.23405C162.177 7.89291 161.688 7.72233 161.236 7.72233C160.798 7.72233 160.427 7.8447 160.123 8.08944C159.819 8.32675 159.578 8.7606 159.4 9.39098C159.23 10.0214 159.144 11.3414 159.144 13.3512V17ZM163.928 13.6293L167.065 13.151C167.198 13.7591 167.469 14.2226 167.877 14.5415C168.285 14.853 168.856 15.0088 169.59 15.0088C170.398 15.0088 171.006 14.8604 171.414 14.5638C171.689 14.3561 171.826 14.078 171.826 13.7295C171.826 13.4921 171.752 13.2956 171.603 13.1399C171.448 12.9915 171.099 12.8543 170.558 12.7283C168.036 12.1721 166.438 11.664 165.763 11.2042C164.829 10.5664 164.362 9.68021 164.362 8.54553C164.362 7.5221 164.766 6.66182 165.574 5.9647C166.382 5.26757 167.636 4.91901 169.334 4.91901C170.951 4.91901 172.152 5.18229 172.938 5.70884C173.724 6.23539 174.266 7.01409 174.563 8.04494L171.615 8.59003C171.488 8.13023 171.247 7.77796 170.891 7.53322C170.543 7.28849 170.042 7.16612 169.39 7.16612C168.567 7.16612 167.977 7.28107 167.621 7.51097C167.384 7.67413 167.265 7.88549 167.265 8.14506C167.265 8.36754 167.369 8.55666 167.576 8.7124C167.858 8.92005 168.83 9.21299 170.491 9.59122C172.16 9.96944 173.324 10.433 173.984 10.9818C174.637 11.538 174.963 12.313 174.963 13.3067C174.963 14.3895 174.511 15.3202 173.606 16.0989C172.701 16.8776 171.362 17.267 169.59 17.267C167.981 17.267 166.705 16.9407 165.763 16.288C164.829 15.6354 164.217 14.7492 163.928 13.6293Z"
                  fill="#DC143B"
                />
              </svg>
            </span>
          </span>
        </Link>
      </div>
      {/* <!-- Logo Box End --> */}

      {/* <!--- Side Menu --> */}
      <div data-simplebar className="sidebar-menu-scroll">
        <div id="sidebar-menu">
          {/* <!-- Left Menu Start --> */}
          <div className="nav">
            <div className="menu">
              <ul>
                <DashboardActiveLink href={"/dashboard"}>
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="44" height="44" rx="6" fill="#F4FFF2" />
                    <path
                      d="M18.5 16.1667H13.3667C12.7133 16.1667 12.3866 16.1667 12.137 16.2938C11.9175 16.4057 11.739 16.5842 11.6272 16.8037C11.5 17.0532 11.5 17.3799 11.5 18.0333V30.6333C11.5 31.2867 11.5 31.6134 11.6272 31.863C11.739 32.0825 11.9175 32.261 12.137 32.3728C12.3866 32.5 12.7133 32.5 13.3667 32.5H18.5M18.5 32.5H25.5M18.5 32.5L18.5 13.3667C18.5 12.7133 18.5 12.3866 18.6272 12.137C18.739 11.9175 18.9175 11.739 19.137 11.6272C19.3866 11.5 19.7133 11.5 20.3667 11.5L23.6333 11.5C24.2867 11.5 24.6134 11.5 24.863 11.6272C25.0825 11.739 25.261 11.9175 25.3728 12.137C25.5 12.3866 25.5 12.7133 25.5 13.3667V32.5M25.5 20.8333H30.6333C31.2867 20.8333 31.6134 20.8333 31.863 20.9605C32.0825 21.0723 32.261 21.2508 32.3728 21.4703C32.5 21.7199 32.5 22.0466 32.5 22.7V30.6333C32.5 31.2867 32.5 31.6134 32.3728 31.863C32.261 32.0825 32.0825 32.261 31.863 32.3728C31.6134 32.5 31.2867 32.5 30.6333 32.5H25.5"
                      stroke="#5AA469"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="text">DASHBOARD</span>
                </DashboardActiveLink>

                <DashboardSubmenu
                  handleSubmenuToggle={handleSubmenuToggle}
                  submenuItems={[
                    { title: "PRODUCTS", href: "/dashboard/products" },
                    { title: "BRANDS", href: "/dashboard/brands" },
                    { title: "CATEGORY", href: "/dashboard/category" },
                    { title: "SUB CATEGORY", href: "/dashboard/sub-category" },
                  ]}
                  submenuTitle={"PRODUCTS"}
                  icon={
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="44" height="44" rx="6" fill="#F4FFF2" />
                      <path
                        d="M16.7497 20.8333H13.3663C12.7129 20.8333 12.3862 20.8333 12.1367 20.9605C11.9172 21.0723 11.7387 21.2508 11.6268 21.4703C11.4997 21.7199 11.4997 22.0466 11.4997 22.7V32.5M27.2497 20.8333H30.633C31.2864 20.8333 31.6131 20.8333 31.8627 20.9605C32.0822 21.0723 32.2607 21.2508 32.3725 21.4703C32.4997 21.7199 32.4997 22.0466 32.4997 22.7V32.5M27.2497 32.5V15.2333C27.2497 13.9265 27.2497 13.2731 26.9954 12.774C26.7717 12.335 26.4147 11.978 25.9757 11.7543C25.4765 11.5 24.8231 11.5 23.5163 11.5H20.483C19.1762 11.5 18.5228 11.5 18.0237 11.7543C17.5847 11.978 17.2277 12.335 17.004 12.774C16.7497 13.2731 16.7497 13.9265 16.7497 15.2333V32.5M33.6663 32.5H10.333M20.833 16.1667H23.1663M20.833 20.8333H23.1663M20.833 25.5H23.1663"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />

                <DashboardSubmenu
                  handleSubmenuToggle={handleSubmenuToggle}
                  submenuItems={[
                    { title: "ORDERS", href: "/dashboard/orders" },
                    { title: "INVOICES", href: "/dashboard/invoices" },
                  ]}
                  submenuTitle={"ORDERS"}
                  icon={
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="44" height="44" rx="6" fill="#F4FFF2" />
                      <path
                        d="M16.7497 20.8333H13.3663C12.7129 20.8333 12.3862 20.8333 12.1367 20.9605C11.9172 21.0723 11.7387 21.2508 11.6268 21.4703C11.4997 21.7199 11.4997 22.0466 11.4997 22.7V32.5M27.2497 20.8333H30.633C31.2864 20.8333 31.6131 20.8333 31.8627 20.9605C32.0822 21.0723 32.2607 21.2508 32.3725 21.4703C32.4997 21.7199 32.4997 22.0466 32.4997 22.7V32.5M27.2497 32.5V15.2333C27.2497 13.9265 27.2497 13.2731 26.9954 12.774C26.7717 12.335 26.4147 11.978 25.9757 11.7543C25.4765 11.5 24.8231 11.5 23.5163 11.5H20.483C19.1762 11.5 18.5228 11.5 18.0237 11.7543C17.5847 11.978 17.2277 12.335 17.004 12.774C16.7497 13.2731 16.7497 13.9265 16.7497 15.2333V32.5M33.6663 32.5H10.333M20.833 16.1667H23.1663M20.833 20.8333H23.1663M20.833 25.5H23.1663"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />

                <DashboardSubmenu
                  handleSubmenuToggle={handleSubmenuToggle}
                  submenuItems={[
                    { title: "HERO SLIDER", href: "/dashboard/hero-slider" },
                  ]}
                  submenuTitle={"SLIDERS"}
                  icon={
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="44" height="44" rx="6" fill="#F4FFF2" />
                      <path
                        d="M16.7497 20.8333H13.3663C12.7129 20.8333 12.3862 20.8333 12.1367 20.9605C11.9172 21.0723 11.7387 21.2508 11.6268 21.4703C11.4997 21.7199 11.4997 22.0466 11.4997 22.7V32.5M27.2497 20.8333H30.633C31.2864 20.8333 31.6131 20.8333 31.8627 20.9605C32.0822 21.0723 32.2607 21.2508 32.3725 21.4703C32.4997 21.7199 32.4997 22.0466 32.4997 22.7V32.5M27.2497 32.5V15.2333C27.2497 13.9265 27.2497 13.2731 26.9954 12.774C26.7717 12.335 26.4147 11.978 25.9757 11.7543C25.4765 11.5 24.8231 11.5 23.5163 11.5H20.483C19.1762 11.5 18.5228 11.5 18.0237 11.7543C17.5847 11.978 17.2277 12.335 17.004 12.774C16.7497 13.2731 16.7497 13.9265 16.7497 15.2333V32.5M33.6663 32.5H10.333M20.833 16.1667H23.1663M20.833 20.8333H23.1663M20.833 25.5H23.1663"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />

                {/* <DashboardSubmenu
                  handleSubmenuToggle={handleSubmenuToggle}
                  submenuItems={[
                    { title: "REPORTS", href: "/dashboard/reports" },
                  ]}
                  submenuTitle={"REPORTS"}
                  icon={
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="44" height="44" rx="6" fill="#F4FFF2" />
                      <path
                        d="M16.7497 20.8333H13.3663C12.7129 20.8333 12.3862 20.8333 12.1367 20.9605C11.9172 21.0723 11.7387 21.2508 11.6268 21.4703C11.4997 21.7199 11.4997 22.0466 11.4997 22.7V32.5M27.2497 20.8333H30.633C31.2864 20.8333 31.6131 20.8333 31.8627 20.9605C32.0822 21.0723 32.2607 21.2508 32.3725 21.4703C32.4997 21.7199 32.4997 22.0466 32.4997 22.7V32.5M27.2497 32.5V15.2333C27.2497 13.9265 27.2497 13.2731 26.9954 12.774C26.7717 12.335 26.4147 11.978 25.9757 11.7543C25.4765 11.5 24.8231 11.5 23.5163 11.5H20.483C19.1762 11.5 18.5228 11.5 18.0237 11.7543C17.5847 11.978 17.2277 12.335 17.004 12.774C16.7497 13.2731 16.7497 13.9265 16.7497 15.2333V32.5M33.6663 32.5H10.333M20.833 16.1667H23.1663M20.833 20.8333H23.1663M20.833 25.5H23.1663"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                /> */}

                <DashboardActiveLink href={"/dashboard/reports"}>
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="44" height="44" rx="6" fill="#F4FFF2" />
                    <path
                      d="M18.5 16.1667H13.3667C12.7133 16.1667 12.3866 16.1667 12.137 16.2938C11.9175 16.4057 11.739 16.5842 11.6272 16.8037C11.5 17.0532 11.5 17.3799 11.5 18.0333V30.6333C11.5 31.2867 11.5 31.6134 11.6272 31.863C11.739 32.0825 11.9175 32.261 12.137 32.3728C12.3866 32.5 12.7133 32.5 13.3667 32.5H18.5M18.5 32.5H25.5M18.5 32.5L18.5 13.3667C18.5 12.7133 18.5 12.3866 18.6272 12.137C18.739 11.9175 18.9175 11.739 19.137 11.6272C19.3866 11.5 19.7133 11.5 20.3667 11.5L23.6333 11.5C24.2867 11.5 24.6134 11.5 24.863 11.6272C25.0825 11.739 25.261 11.9175 25.3728 12.137C25.5 12.3866 25.5 12.7133 25.5 13.3667V32.5M25.5 20.8333H30.6333C31.2867 20.8333 31.6134 20.8333 31.863 20.9605C32.0825 21.0723 32.261 21.2508 32.3728 21.4703C32.5 21.7199 32.5 22.0466 32.5 22.7V30.6333C32.5 31.2867 32.5 31.6134 32.3728 31.863C32.261 32.0825 32.0825 32.261 31.863 32.3728C31.6134 32.5 31.2867 32.5 30.6333 32.5H25.5"
                      stroke="#5AA469"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="text">REPORTS</span>
                </DashboardActiveLink>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- Sidebar --> */}
      </div>

      <li className="log-out">
        <button onClick={handleLogout}>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.0556 2.76261H23.2222C24.7564 2.76261 26 3.96443 26 5.44695V6.78912M19.0556 24.2374H23.2222C24.7564 24.2374 26 23.0356 26 21.553V20.2108M2.97958 23.4691L11.3129 25.885C13.0951 26.4018 14.8889 25.1121 14.8889 23.3138V3.6861C14.8889 1.88797 13.0951 0.598274 11.3129 1.11497L2.97958 3.53088C1.80464 3.87151 1 4.91658 1 6.10201V20.8979C1 22.0834 1.80464 23.1285 2.97958 23.4691Z"
              stroke="#008AEE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.33431 13.5H9.33331"
              stroke="#008AEE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.0555 13.5H26M26 13.5L23.2222 10.8156M26 13.5L23.2222 16.1843"
              stroke="#008AEE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text">Log Out</span>
        </button>
      </li>
    </div>
  );
};

export default DashboardSidebar;
