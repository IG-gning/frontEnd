import { Link } from "react-router-dom";

const Sidebar = ({ show, closeSidebar }) => {
  return (
    <div className={`sidebar ${show ? "show" : ""} text-white p-3 bg-dark`}>
      <div className="d-flex gap-3 align-items-center mb-4">
        <i class="bi bi-bookmark-fill h5"></i><h5 className="mb-4">RED PRODUCT</h5>
      </div>

      <p className="text-white">Principal</p>

      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white d-flex gap-3  sidebarListe" to="/dashboard"  onClick={closeSidebar}>
            <i class="bi bi-columns-gap"></i> <p>Dashboard</p>
          </Link>
        </li>

        <li className="nav-item ">
          <Link className="nav-link text-white d-flex gap-3 sidebarListe" to="/hotels"  onClick={closeSidebar}>
            <i class="bi bi-person-video3"></i> <p>Liste des hôtels</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};


export default Sidebar;
