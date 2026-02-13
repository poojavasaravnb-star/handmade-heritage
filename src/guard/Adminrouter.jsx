import { Navigate, Outlet } from "react-router-dom";
import AdminFooter from "../pages/Admin/AdminFooter";
import AdminNavbar from "../pages/Admin/AdminNavbar";

const Adminrouter = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  // Not logged in OR wrong admin
  if (!admin || admin.email !== "admin@gmail.com") {
    return <Navigate to="/login-page" replace />;
  }

  return (
    <>
      <AdminNavbar />
      <Outlet />
      <AdminFooter />
    </>
  );
};

export default Adminrouter;
