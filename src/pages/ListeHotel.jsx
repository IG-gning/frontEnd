import React, { useEffect, useState } from "react";
import API from "../api";

import AddHotelModal from "../components/AddHotelModal";

const ListeHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL de base
  const API_URL = process.env.REACT_APP_API_URL || "https://projet-01-backend-1.onrender.com";

  // Récupération des hôtels depuis Django
  useEffect(() => {
    fetchHotels();
  }, []);

 const fetchHotels = () => {
  setLoading(true);
  API.get(`/hotels/listeHotel/`)
    .then((res) => {
      setHotels(res.data);
      setError(null);
    })
    .catch((err) => {
      console.error("Erreur récupération hôtels :", err);
      setError("Impossible de charger les hôtels.");
    })
    .finally(() => setLoading(false));
};

  // Ajout d'un hôtel après création
  const addHotel = (newHotel) => {
    setHotels([newHotel, ...hotels]);
  };

const getImageUrl = (hotel) => {
    return hotel.image || "https://placehold.co/300x180/e0e0e0/666666?text=Pas+d'image";
  };


  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Liste des Hôtels</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          ➕ Ajouter un hôtel
        </button>
      </div>

      <AddHotelModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAdd={addHotel}
        apiUrl={API_URL}
      />

      {/* État de chargement */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}

      {/* Erreur */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={fetchHotels}
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Liste des hôtels */}
      {!loading && !error && (
        <div className="row">
          {hotels.length === 0 && (
            <div className="col-12">
              <div className="alert alert-info text-center" role="alert">
                <p className="mb-0">Aucun hôtel disponible pour le moment.</p>
                <button 
                  className="btn btn-primary mt-2"
                  onClick={() => setShowModal(true)}
                >
                  Ajouter le premier hôtel
                </button>
              </div>
            </div>
          )}

          {hotels.map((hotel) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={hotel.id}
            >
              <div className="card h-100 shadow-sm hover-card">
                <img
                  src="https://res.cloudinary.com/dtsfv5tfm/image/upload/v1769567959/hotels/c0e5spkpvzjhos960tk1.jpg"
                  className="card-img-top"
                  alt={hotel.nom}
                  style={{ height: "180px", objectFit: "cover" }}
                  onError={(e) => {
                    console.error("Erreur chargement image pour:", hotel.nom, "URL:", e.target.src);
                    e.target.onerror = null; // Éviter les boucles infinies
                    e.target.src = "https://placehold.co/300x180/f0f0f0/666666?text=Image+introuvable";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <div className="mb-2">
                    <span className="badge bg-danger">
                      📍 {hotel.ville}
                    </span>
                  </div>
                  <h5 className="card-title">{hotel.nom}</h5>
                  <p className="card-text text-muted small mb-2">
                    {hotel.adresse}
                  </p>
                  <div className="mt-auto">
                    <p className="card-text fw-bold text-primary mb-0">
                      {Number(hotel.prix).toLocaleString()} XOF
                      <span className="text-muted small"> / nuit</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListeHotel;