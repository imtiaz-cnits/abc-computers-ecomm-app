"use client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminRoute = ({ children }) => {
  const router = useRouter();
  const path = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5070/api/v1/dashboard",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const result = await response?.data;

        if (result?.status === "success") {
          setIsAdmin(true);
          setIsLoading(false);
          toast.success(result?.message);
          return;
        } else {
          setIsAdmin(false);
          setIsLoading(false);
          toast.error(result?.message);
          return;
        }
      } catch (error) {
        setIsAdmin(false);
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchAdmin();
  }, [path]);

  if (isLoading) {
    return <></>;
  }

  if (!isAdmin && !isLoading && !path.startsWith("/dashboard/login")) {
    return router.push("/dashboard/login");
  }

  return <>{children}</>;
};

export default AdminRoute;
