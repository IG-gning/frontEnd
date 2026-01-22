import { useState, useRef } from "react";

const AddHotelModal = ({ show, onClose, onAdd }) => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [prix, setPrix] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numéro, setNuméro] = useState("");
  const [devise, setDevise] = useState("F XOF");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef();


  if (!show) return null;

  const handleSubmit = () => {
    if (!nom || !email ||  !prix || !devise || !adresse || !numéro) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const newHotel = {
      id: Date.now(),
      nom,
      email,
      adresse,
      numéro,
      prix,
      devise,
      image: image ? URL.createObjectURL(image) : "/images/default-hotel.jpg",
    };

    onAdd(newHotel);
    onClose();

    // Reset
    setNom("");
    setPrix("");
    setDevise("F XOF");
    setImage(null);
    setEmail("");
    setAdresse("");
    setNuméro("");
  };


  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content" style={{width:"700px", color:"#555555"}}>

          <div className="modal-header border border-bottom">
            {/* <button className="btn-close" </button> */}
            <h6 className="modal-title d-flex alignà-items-center gap-3" style={{fontFamily:"500", cursor:"pointer"}}> <span onClick={onClose} className="h4"><i class="bi bi-arrow-left"></i> </span> CREER UN NOUVEAU HOTEL</h6>   
          </div>

          <div className="modal-body d-flex gap-4" style={{width:"700px"}}>
          <div className="w-100">
             <div className="mb-3">
              <label>Nom de l'hôtel</label>
              <input className="form-control rounded-3" 
              value={nom} onChange={(e) => setNom(e.target.value)}/>
            </div>

            <div className="mb-3">
              <label>E-mail</label>
              <input className="form-control rounded-3" 
              value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="mb-3">
              <label>Prix par nuit</label>
              <input type="number" className="form-control rounded-3" 
              value={prix} onChange={(e) => setPrix(e.target.value)} />
            </div>
          </div>

          <div className="w-100">
            <div className="mb-3">
              <label>Adresse</label>
              <input className="form-control rounded-3" 
               value={adresse} onChange={(e) => setAdresse(e.target.value)}/>
            </div>

            <div className="mb-3">
              <label>Numéro de téléphone</label>
              <input className="form-control rounded-3" 
               value={numéro} onChange={(e) => setNuméro(e.target.value)}/>
            </div>

            <div className="mb-3">
              <label>Devise</label>
              <select className="form-control rounded-3"  value={devise} onChange={(e) => setDevise(e.target.value)}>
                <option>FXOF</option>
                <option>Dollar</option>
                <option>EUro</option>
                <option>FCFA</option>
              </select>
            </div>
           </div>
          </div>

            <p className="ms-3">Ajouter une photo</p>
           <div className="text-center mb-3 me-3 ms-3 rounded-3 border" >
            <img
              src={image ? URL.createObjectURL(image) : "/images/img00.png"} alt="hôtel"
              style={{
                height: "120px",
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current.click()}
            />

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none"}}
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            
          />

          <small className="text-muted d-block mt-2 ">
          Ajouter une photo
          </small>
        </div>


          <div className="modal-footer">
            
            <button className="btn text-white" style={{background:"#555555"}} onClick={handleSubmit}>Enregistrer</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddHotelModal;
