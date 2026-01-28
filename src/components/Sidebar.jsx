import { NavLink } from "react-router-dom";
import "../Sidebar.css";

const Sidebar = ({ show, closeSidebar }) => {
  return (
    <div className={`sidebar ${show ? "show" : ""}`}>
      <div className="d-flex gap-2 ps-3 mt-3">
        <i className="bi bi-bookmark-fill" style={{fontWeight:"700", fontSize:"20.66px", fontStyle:"bold"}}></i>
        <h5 className="logo" style={{fontWeight:"700", fontSize:"26.66px", fontStyle:"bold"}}>RED PRODUCT</h5>
      </div>
      

      <p className="section-title mt-2 ps-2" style={{fontSize:"15.8px", fontWeight:"400", fontStyle:"Regular"}}>Principal</p>

      <ul className="menu">
        <li>
          <NavLink
            to="/dashboard"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            <i className="bi bi-columns-gap"></i>
            <span className="ps-3">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/hotels"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
             <i className="bi bi-person-video3"></i>
           <span className="ps-3"> Liste des hôtels</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
