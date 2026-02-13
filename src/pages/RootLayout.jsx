import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const location = useLocation();
  const user = localStorage.getItem("logindata");

  const [redirect, setRedirect] = useState(false);

  const protectedRoutes = ["/Contact", "/Cart"];

  const isProtected = protectedRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  useEffect(() => {
    if (isProtected && !user) {
      alert("Please login first");
      setRedirect(true);
    }
  }, [isProtected, user]);

  if (redirect) {
    return <Navigate to="/login-page" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
