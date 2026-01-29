import { useRef, useState } from "react";
import API from "../api";

const AddHotelModal = ({ show, onClose, onAdd }) => {
  const [nom, setNom] = useState("");
  const [ville, setVille] = useState("");
  const [prix, setPrix] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numero, setNumero] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom || !ville || !prix || !adresse || !numero) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("ville", ville);
    formData.append("prix", prix);
    formData.append("adresse", adresse);
    formData.append("numero", numero);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const res = await API.post("/hotels/addHotel/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onAdd(res.data);
      onClose();
      setNom(""); setVille(""); setPrix(""); setAdresse(""); setNumero(""); setImage(null); setError(null);
    } catch (err) {
      setError("Erreur ajout hôtel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>CRÉER UN NOUVEAU HÔTEL</h5>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              X
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="d-flex gap-2 flex-wrap">
            <div className="flex-grow-1">
              <input className="form-control mb-2" placeholder="Nom de l'hôtel" value={nom} onChange={(e) => setNom(e.target.value)} required />
              <input className="form-control mb-2" placeholder="Prix" type="number" value={prix} onChange={(e) => setPrix(e.target.value)} required />
            </div>
            <div className="flex-grow-1">
              <input className="form-control mb-2" placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
              <input className="form-control mb-2" placeholder="Numéro de téléphone" value={numero} onChange={(e) => setNumero(e.target.value)} required />
              <input className="form-control mb-2" placeholder="Ville" value={ville} onChange={(e) => setVille(e.target.value)} required />
            </div>
          </form>

          <div className="mt-3">
            <label className="form-label">
              Photo de l'hôtel <small className="text-muted ms-2">(Optionnel)</small>
            </label>
            <div
              className="text-center border rounded-3 p-3"
              style={{ cursor: "pointer", background: "#f8f9fa" }}
              onClick={() => fileInputRef.current.click()}
            >
              {image ? (
                <div className="position-relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    style={{ maxHeight: "200px", maxWidth: "100%", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div className="mt-2">
                    <small className="text-success">✓ Image sélectionnée: {image.name}</small>
                  </div>
                </div>
              ) : (
                <div className="py-4">
                  <div style={{ fontSize: "3rem", color: "#dee2e6" }}>📷</div>
                  <p className="mb-0 text-muted">Cliquez pour ajouter une photo</p>
                  <small className="text-muted">Formats acceptés: JPG, PNG, GIF</small>
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <button type="submit" className="btn text-white" style={{ background: "rgba(0,0,0,0.5)" }} disabled={loading}>
              {loading ? "Envoi..." : "Enregistrer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelModal;
