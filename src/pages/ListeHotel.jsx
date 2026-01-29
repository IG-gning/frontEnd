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
    if (hotel.image) return hotel.image;
    return "https://placehold.co/300x200?text=No+Image";
  };

  return (
    <div className="container">
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Ajouter un hôtel
      </button>

      <AddHotelModal show={showModal} onClose={() => setShowModal(false)} onAdd={addHotel} />

      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}

      <div className="row">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={getImageUrl(hotel)}
                alt={hotel.nom}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x200?text=No+Image";
                }}
              />
              <div className="card-body">
                <h5>{hotel.nom}</h5>
                <p>{hotel.ville}</p>
                <p className="fw-bold">{hotel.prix} XOF</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeHotel;
