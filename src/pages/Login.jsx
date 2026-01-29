import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // axios instance
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  // State unique pour tous les champs
  const [activeForm, setActiveForm] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    passWord: "",
    nameSignup: "",
    emailSignup: "",
    passwordSignup: "",
  });

  // Gestion des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -------- LOGIN --------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/inscription/login/", {
        email: formData.email,
        mot_de_passe: formData.passWord,
      });

      localStorage.setItem("isAuth", "true");
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      alert(data.message);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 401) alert("Email ou mot de passe incorrect");
      else alert("Erreur serveur, réessaie plus tard");
      console.error(err);
    }
  };

  // -------- SIGNUP --------
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/inscription/register/", {
        nom: formData.nameSignup,
        email: formData.emailSignup,
        mot_de_passe: formData.passwordSignup,
      });

      alert("Compte créé avec succès !");
      setActiveForm("login");
      setFormData({
        email: "",
        passWord: "",
        nameSignup: "",
        emailSignup: "",
        passwordSignup: "",
      });
    } catch (err) {
      console.error(err);
      alert(
        "Erreur inscription : " +
          (err.response?.data?.detail || "Vérifie tes informations")
      );
    }
  };

  // -------- FORGOT PASSWORD --------
  const handleForgot = (e) => {
    e.preventDefault();
    alert("Un email de réinitialisation a été envoyé !");
    setActiveForm("login");
  };

  // Gestion du submit selon le formulaire actif
  const handleSubmit = (e) => {
    if (activeForm === "login") handleLogin(e);
    else if (activeForm === "signup") handleSignup(e);
    else if (activeForm === "forgot") handleForgot(e);
  };

  // Inputs selon le formulaire actif
  const renderFormInputs = () => {
    switch (activeForm) {
      case "login":
        return (
          <>
            <input
              type="email"
              name="email"
              className="form-control input-dark mb-4"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="passWord"
              className="form-control input-dark mb-4 border-bottom"
              placeholder="Mot de passe"
              value={formData.passWord}
              onChange={handleChange}
              required
            />
            <p className="d-flex align-items-center h6 gap-2">
              <input type="checkbox" /> Gardez-moi connecté
            </p>
            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ background: "#555555" }}
            >
              Se connecter
            </button>
          </>
        );
      case "signup":
        return (
          <>
            <input
              type="text"
              name="nameSignup"
              className="form-control input-dark mb-3 pb-3"
              placeholder="Nom"
              value={formData.nameSignup}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="emailSignup"
              className="form-control input-dark mb-3 pb-3"
              placeholder="E-mail"
              value={formData.emailSignup}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="passwordSignup"
              className="form-control input-dark mb-4 pb-3"
              placeholder="Mot de passe"
              value={formData.passwordSignup}
              onChange={handleChange}
              required
            />
            <p className="d-flex align-items-center h6 gap-2">
              <input type="checkbox" /> Accepter les termes et la politique
            </p>
            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ background: "#555555" }}
            >
              S’inscrire
            </button>
          </>
        );
      case "forgot":
        return (
          <>
            <p>
              Entrez votre adresse email ci-dessous et nous vous enverrons des
              instructions.
            </p>
            <input
              type="email"
              name="email"
              className="form-control input-dark mb-4"
              placeholder="Votre e-mail"
              required
            />
            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ background: "#555555" }}
            >
              Envoyer
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="login-bg d-flex flex-column">
      <div className="login-header">
        <h3>RED PRODUCT</h3>
      </div>

      <div className="login-box">
        <form onSubmit={handleSubmit} className="login-form">
          {activeForm === "login" && (
            <h5 className="text-center mb-4">Connectez-vous en tant qu’admin</h5>
          )}
          {activeForm === "signup" && (
            <h5 className="text-center mb-4">Créer un compte</h5>
          )}
          {activeForm === "forgot" && (
            <h5 className="text-center mb-4">Mot de passe oublié?</h5>
          )}
          {renderFormInputs()}
        </form>
      </div>

      {/* Liens pour changer de formulaire */}
      <div className="text-center mt-3 text-white">
        {activeForm === "login" && (
          <>
            <p className="link mb-2" onClick={() => setActiveForm("forgot")}>
              Mot de passe oublié ?
            </p>
            <p>
              Vous n'avez pas de compte ?
              <span className="link ms-1" onClick={() => setActiveForm("signup")}>
                S'inscrire
              </span>
            </p>
          </>
        )}
        {activeForm === "signup" && (
          <p>
            Vous avez déjà un compte ?
            <span className="link ms-1" onClick={() => setActiveForm("login")}>
              Se connecter
            </span>
          </p>
        )}
        {activeForm === "forgot" && (
          <>
            <p>
              Vous n'avez pas de compte ?
              <span className="link ms-1" onClick={() => setActiveForm("signup")}>
                S'inscrire
              </span>
            </p>
            <p>
              Revenir à la
              <span className="link ms-1" onClick={() => setActiveForm("login")}>
                connexion
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
