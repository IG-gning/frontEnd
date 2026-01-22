import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import AddHotelModal from "./components/AddHotelModal";
import "./loyout.css";


const Layout = ({ children }) => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false)
  
  let titleNav = "";
  let title = "";
  let description = "";

  if (location.pathname === "/dashboard") {
    titleNav = "Dashboard"
    title = "Bienvenue sur RED Produit";
    description = "Lorem ipsum dolor sit amet consecteur ";
  } else if (location.pathname === "/hotels") {
    titleNav = "liste des Hôtels"
    title = "Hôtels 8";
    
  }

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <div  
           className="bg-dark d-flex flex-column">
        <Sidebar show={showSidebar} />
      </div>

      {/* ZONE DROITE */}
      <div className="flex-grow-1 d-flex flex-column">

        {/* NAVBAR */}
        <div className="border-bottom">
          <Navbar title={titleNav} toggleSidebar={() => setShowSidebar(prev => !prev)} />
        </div>

        {/* HEADER */}
     <div className="bg-white px-4 py-3 border-bottom">
  <div className="d-flex justify-content-between align-items-center">
    
    <div>
      <span className="h4 text-dark fw-light d-block">{title}</span>
      <small className="text-muted">{description}</small>
    </div>

   {location.pathname === "/hotels" && (
  <button className="btn border-dark" onClick={() => setShowModal(true)}>
    + Créer un nouvel hôtel
  </button>
)}


  </div>
</div>


        {/* CONTENU */}
        <div className="p-4 flex-grow-1 bg-light">
          {children}
        </div>

      </div>

      <AddHotelModal show={showModal} onClose={() => setShowModal(false)} />

    </div>
  );
};

export default Layout;
