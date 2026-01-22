import hotels from "../date/hotel";

const ListeHotel = () => {
  return (
    <div>
 

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
                <p className="card-text text-danger" style={{fontSize:"12px", fontFamily:"bold"}}> {hotel.ville}<br /></p>
                <h5 className="card-title">{hotel.nom}</h5>  
                <p className="card-text" style={{fontSize:"13px"}}> {hotel.prix} XOF par nuit </p>
  
                
                
     
              </div>

              {/* <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-sm btn-primary">Voir</button>
                <button className="btn btn-sm btn-danger">Supprimer</button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeHotel;
