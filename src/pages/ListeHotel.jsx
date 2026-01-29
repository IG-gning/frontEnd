import React, { useEffect, useState } from "react";
import API from "../api";
import AddHotelModal from "../components/AddHotelModal";

const ListeHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHotels = async () => {
    try {
      const { data } = await API.get("/hotels/listeHotel/");
      setHotels(data);
    } catch (err) {
      setError("Erreur chargement hôtels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const addHotel = (newHotel) => setHotels([newHotel, ...hotels]);

  const getImageUrl = (hotel) => {
    return hotel.image || "https://placehold.co/300x180?text=Image+introuvable";
  };

  return (
    <div className="container mt-4">
      

      <AddHotelModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAdd={addHotel}
      />

      {loading && <p>Chargement...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <img
                src={getImageUrl(hotel)}
                alt={hotel.nom}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <p className="text-danger ">{hotel.ville} <br /> <span className="fw-bold text-dark">{hotel.nom}</span></p>
                <p>{hotel.prix} XOF <span style={{fontSize:"14px"}}> par nuit</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeHotel;
