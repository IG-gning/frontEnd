import { useNavigate } from "react-router-dom";
import hotels from "../date/hotel";

const Navbar = ({ title, toggleSidebar }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  const hotel = hotels[0]; // on prend le premier hôtel comme avatar

  return (
    <nav className="navbar bg-white shadow-sm px-4 h-100 d-flex align-items-center">
      <button 
        className="btn d-md-none me-2"
        onClick={toggleSidebar}
      >
        <i className="bi bi-list h4"></i>
      </button>

      <span className="fw-bold ">{ title } </span>
      

      <div className="ms-auto d-flex align-items-center gap-3">
        <input className="form-control" placeholder="Recherche" />

        <span>
          <i className="bi bi-bell"></i>
        </span>

        <div className="border rounded-circle overflow-hidden" style={{ width: 60, height: 40 }}>
          <img
            src={hotel.image}
            alt={hotel.nom}
            className="w-100 h-100 object-fit-cover"
          />
        </div>

        <button className="btn btn-sm" onClick={logout}>
          <i className="bi bi-box-arrow-right h5"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
