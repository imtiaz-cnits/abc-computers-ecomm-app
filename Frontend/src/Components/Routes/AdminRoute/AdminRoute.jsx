"use client"
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const AdminRoute = ({ children }) => {

    const router = useRouter()
    const token = localStorage.getItem("token")
    const path = usePathname()

    if (!token && (!path.startsWith("/dashboard/login"))) {
        return router.push("/dashboard/login")
    }

    return (
        <>
            {children}
        </>
    );
};

export default AdminRoute;