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

  const fileInputRef = useRef(null); // ✅ Ajout du ref

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

      // Reset
      setNom(""); setVille(""); setPrix(""); setAdresse(""); setNumero(""); setImage(null);
      setError(null);
    } catch (err) {
      setError("Erreur ajout hôtel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>CREER UN NOUVEAU HOTEL</h5>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              X
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="d-flex gap-2">
            <div className="flex-grow-1">
              <input
                className="form-control mb-2"
                placeholder="Nom de l'hôtel"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
              <input
                className="form-control mb-2"
                placeholder="E-mail"
                // tu n'avais pas de state email, tu peux ajouter si besoin
              />
              <input
                className="form-control mb-2"
                placeholder="Prix"
                type="number"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
                required
              />
            </div>

            <div className="flex-grow-1">
              <input
                className="form-control mb-2"
                placeholder="Adresse"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                required
              />
              <input
                className="form-control mb-2"
                placeholder="Numéro de téléphone"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
              <input
                className="form-control mb-2"
                placeholder="Ville"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                required
              />
            </div>
          </form>

          {/* Section image cliquable */}
          <div className="text-center mb-3">
            <img
              src={image ? URL.createObjectURL(image) : "/images/upload.png"}
              alt="Choisir une image"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "50%",
                cursor: "pointer",
                border: "2px dashed #ccc",
                padding: "5px"
              }}
              onClick={() => fileInputRef.current.click()}
            />

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*" // ✅ corrigé pour toutes les images
              onChange={(e) => setImage(e.target.files[0])}
            />

            <small className="text-muted d-block mt-2">
              Cliquez sur l’image pour choisir une photo de l’hôtel
            </small>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="submit"
              className="btn text-white"
              style={{ background: "rgba(0,0,0,0.5)" }}
              disabled={loading}
            >
              {loading ? "Envoi..." : "Enregistrer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelModal;
