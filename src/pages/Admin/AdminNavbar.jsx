import { NavLink, useNavigate } from "react-router-dom";
import "./adminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login-page");
  };

  return (
    <nav className="nav">
      <div className="logo-text">
  Handmade Heritage
</div>

      <ul className="menu">
        <li>
          <NavLink to="/admin" className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className="nav-link">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className="nav-link">
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="nav-link">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className="nav-link">
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/contacts" className="nav-link">
            Contacts
          </NavLink>
        </li>
      </ul>

      <div className="right-section">
        <span> Admin</span>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
