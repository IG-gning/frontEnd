import { useState, useRef } from "react";
import API from "../api";

const AddHotelModal = ({ show, onClose, onAdd }) => {
  const [nom, setNom] = useState("");
  const [ville, setVille] = useState("");
  const [prix, setPrix] = useState("");
  const [adresse, setAdresse] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef();

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !ville || !prix || !adresse) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("ville", ville);
    formData.append("prix", prix);
    formData.append("adresse", adresse);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const res = await API.post("/hotels/addHotel/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      onAdd(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'ajout de l'hôtel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <input className="form-control mb-2" placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} />
              <input className="form-control mb-2" placeholder="Ville" value={ville} onChange={e => setVille(e.target.value)} />
              <input className="form-control mb-2" placeholder="Prix" value={prix} onChange={e => setPrix(e.target.value)} />
              <textarea className="form-control mb-2" placeholder="Adresse" value={adresse} onChange={e => setAdresse(e.target.value)} />

              <input type="file" ref={fileInputRef} onChange={e => setImage(e.target.files[0])} />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHotelModal;
