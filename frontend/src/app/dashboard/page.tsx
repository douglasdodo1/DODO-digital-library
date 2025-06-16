"use client";

import DashboardComponent from "@/components/dashboard-component";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) return null;

  return isAuthenticated ? <DashboardComponent /> : null;
}
