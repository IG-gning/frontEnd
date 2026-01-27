import { useState, useRef } from "react";
import axios from "axios";

const AddHotelModal = ({ show, onClose, onAdd }) => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [prix, setPrix] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numero, setNumero] = useState("");
  const [devise, setDevise] = useState("FXOF");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef();

  if (!show) return null;

  const handleSubmit = async () => {
    if (!nom || !email || !prix || !adresse || !numero || !devise) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    // Crée un FormData pour l'envoi des fichiers
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("email", email);
    formData.append("prix", prix);
    formData.append("adresse", adresse);
    formData.append("numero", numero); // ⚠️ pas d'accent
    formData.append("devise", devise);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/hotels/addHotel/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Hôtel ajouté avec succès !");
      onAdd(res.data); // Met à jour la liste dans React
      onClose();

      // Reset
      setNom("");
      setEmail("");
      setPrix("");
      setAdresse("");
      setNumero("");
      setDevise("FXOF");
      setImage(null);

    } catch (err) {
      console.log(err.response?.data || err);
      alert("Erreur lors de l'ajout de l'hôtel.");
    }
  };

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ width: "700px", color: "#555555" }}>
          <div className="modal-header border-bottom">
            <h6 className="modal-title">
              <span onClick={onClose} style={{ cursor: "pointer" }}>&larr;</span> CREER UN NOUVEAU HOTEL
            </h6>
          </div>

          <div className="modal-body d-flex gap-4" style={{ width: "700px" }}>
            <div className="w-100">
              <div className="mb-3">
                <label>Nom de l'hôtel</label>
                <input className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>E-mail</label>
                <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>Prix par nuit</label>
                <input type="number" className="form-control" value={prix} onChange={(e) => setPrix(e.target.value)} />
              </div>
            </div>

            <div className="w-100">
              <div className="mb-3">
                <label>Adresse</label>
                <input className="form-control" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>Numéro de téléphone</label>
                <input className="form-control" value={numero} onChange={(e) => setNumero(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>Devise</label>
                <select className="form-control" value={devise} onChange={(e) => setDevise(e.target.value)}>
                  <option>FXOF</option>
                  <option>Dollar</option>
                  <option>Euro</option>
                  <option>FCFA</option>
                </select>
              </div>
            </div>
          </div>

          <p className="ms-3">Ajouter une photo</p>
          <div className="text-center mb-3 me-3 ms-3 border rounded-3">
            <img
              src={image ? URL.createObjectURL(image) : "/images/img00.png"}
              alt="hôtel"
              style={{ height: "120px", padding: "10px", cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="modal-footer">
            <button className="btn text-white" style={{ background: "#555555" }} onClick={handleSubmit}>
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelModal;
