import { useState, useRef } from "react";
import API from "../api";


const AddHotelModal = ({ show, onClose, onAdd, apiUrl }) => {
  const [nom, setNom] = useState("");
  const [ville, setVille] = useState("");
  const [prix, setPrix] = useState("");
  const [adresse, setAdresse] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef();
  const API_URL = process.env.REACT_APP_API_URL || "https://projet-01-backend-1.onrender.com";

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!nom || !ville || !prix || !adresse) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);
    setError(null);

    // Crée un FormData pour l'envoi des fichiers
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("ville", ville);
    formData.append("prix", prix);
    formData.append("adresse", adresse);
    
    if (image) {
      formData.append("image", image);
    }

    try {
    const res = await API.post(
  `/hotels/addHotel/`,
  formData,
  { headers: { "Content-Type": "multipart/form-data" } }
);


      console.log("Hôtel créé:", res.data);
      onAdd(res.data); // Met à jour la liste dans React
      
      // Reset
      setNom("");
      setVille("");
      setPrix("");
      setAdresse("");
      setImage(null);
      setError(null);
      
      onClose();

    } catch (err) {
      console.error("Erreur ajout hôtel:", err);
      const errorMsg = err.response?.data?.error || 
                      err.response?.data?.message || 
                      "Erreur lors de l'ajout de l'hôtel.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError(null);
      onClose();
    }
  };

  return (
    <div 
      className="modal fade show d-block" 
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={handleClose}
    >
      <div 
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content" style={{ maxWidth: "700px", color: "#555555" }}>
          <div className="modal-header border-bottom">
            <h6 className="modal-title d-flex align-items-center gap-2">
              <span 
                onClick={handleClose} 
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
                className="text-secondary"
              >
                &larr;
              </span> 
              CRÉER UN NOUVEAU HÔTEL
            </h6>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Message d'erreur */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="row">
                {/* Colonne gauche */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Nom de l'hôtel <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text"
                      className="form-control" 
                      value={nom} 
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Ex: Hôtel Paradise"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Ville <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text"
                      className="form-control" 
                      value={ville} 
                      onChange={(e) => setVille(e.target.value)}
                      placeholder="Ex: Dakar"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Prix par nuit (XOF) <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={prix} 
                      onChange={(e) => setPrix(e.target.value)}
                      placeholder="Ex: 25000"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Colonne droite */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Adresse complète <span className="text-danger">*</span>
                    </label>
                    <textarea 
                      className="form-control" 
                      value={adresse} 
                      onChange={(e) => setAdresse(e.target.value)}
                      placeholder="Ex: Avenue Cheikh Anta Diop, Dakar"
                      rows="4"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section image */}
              <div className="mt-3">
                <label className="form-label">
                  Photo de l'hôtel
                  <small className="text-muted ms-2">(Optionnel)</small>
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
                        alt="Aperçu"
                        style={{ 
                          maxHeight: "200px", 
                          maxWidth: "100%",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />
                      <div className="mt-2">
                        <small className="text-success">✓ Image sélectionnée: {image.name}</small>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div style={{ fontSize: "3rem", color: "#dee2e6" }}>📷</div>
                      <p className="mb-0 text-muted">
                        Cliquez pour ajouter une photo
                      </p>
                      <small className="text-muted">
                        Formats acceptés: JPG, PNG, GIF
                      </small>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                type="button"
                className="btn btn-secondary" 
                onClick={handleClose}
                disabled={loading}
              >
                Annuler
              </button>
              <button 
                type="submit"
                className="btn text-white" 
                style={{ background: "#555555" }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Enregistrement...
                  </>
                ) : (
                  "Enregistrer"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHotelModal;