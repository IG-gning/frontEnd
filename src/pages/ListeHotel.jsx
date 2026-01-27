import React, { useEffect, useState } from "react";
import axios from "axios";
import AddHotelModal from "../components/AddHotelModal";

const ListeHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/hotels/listeHotel/")
      .then(res => setHotels(res.data))
      .catch(err => console.log(err));
  }, []);

  const addHotel = (newHotel) => {
    setHotels([...hotels, newHotel]);
  };

  return (
    <div>

      <AddHotelModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAdd={addHotel}
      />

      <div className="row">
        {hotels.map((hotel) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={hotel.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={hotel.image}
                className="card-img-top"
                alt={hotel.nom}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <p className="card-text text-danger" style={{ fontSize: "12px" }}>
                  {hotel.ville}
                </p>
                <h5 className="card-title">{hotel.nom}</h5>
                <p className="card-text" style={{ fontSize: "13px" }}>
                  {hotel.prix} XOF par nuit
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeHotel;
