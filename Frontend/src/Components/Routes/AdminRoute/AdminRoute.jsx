"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const AdminRoute = ({ children }) => {
  const router = useRouter();
  const path = usePathname();
  let token;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  if (!token && !path.startsWith("/dashboard/login")) {
    return router.push("/dashboard/login");
  }

  return <>{children}</>;
};

export default AdminRoute;
