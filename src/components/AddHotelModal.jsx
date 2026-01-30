import { useState, useRef } from "react";
import API from "../api";

const AddHotelModal = ({ show, onClose, onAdd }) => {
  const [nom, setNom] = useState("");
  const [ville, setVille] = useState("");
  const [prix, setPrix] = useState("");
  const [adresse, setAdresse] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  if (!show) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("ville", ville);
    formData.append("prix", prix);
    formData.append("adresse", adresse);
    if (image) formData.append("image", image);

    try {
      setLoading(true);

      const res = await API.post("/hotels/addHotel/", formData);

      console.log("HOTEL CRÉÉ :", res.data);

      // 🔥 ajout immédiat dans la liste
      onAdd(res.data);

      // fermeture du modal
      onClose();

      // reset formulaire
      setNom("");
      setVille("");
      setPrix("");
      setAdresse("");
      setImage(null);
      setPreview(null);

    } catch (err) {
      console.error("ERREUR AXIOS :", err);

      if (err.response && err.response.status >= 400) {
        setError("Erreur ajout hôtel");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Ajouter un hôtel</h5>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />

            <input
              className="form-control mb-2"
              placeholder="Ville"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              required
            />

            <input
              className="form-control mb-2"
              placeholder="Prix"
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              required
            />

            <input
              className="form-control mb-2"
              placeholder="Adresse"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />

            {/* input file caché */}
            <input
              type="file"
              ref={fileInputRef}
              className="d-none"
              accept="image/*"
              onChange={handleImageChange}
            />

            {/* zone image */}
            <div
              className="border rounded p-3 text-center mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "150px" }}
                />
              ) : (
                <>
                  <i className="bi bi-image fs-1 text-secondary"></i>
                  <p className="text-muted mb-0">
                    Cliquer pour ajouter une image
                  </p>
                </>
              )}
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Annuler
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Envoi..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHotelModal;
