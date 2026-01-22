import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [nameSignup, setNameSignup] = useState("");
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [activeForm, setActiveForm] = useState("login");

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8000/inscription/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        mot_de_passe: passWord,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("isAuth", "true");
      alert(data.message); // Optional: message succès
      navigate("/dashboard");
    } else if (response.status === 401) {
      alert("Email ou mot de passe incorrect");
    } else {
      alert("Erreur serveur, réessaie plus tard");
    }
  } catch (error) {
    console.error(error);
    alert("Erreur réseau, réessaie plus tard");
  }
};



  const handleForgot = (e) => {
    e.preventDefault();
    alert("Un email de réinitialisation a été envoyé !");
    setActiveForm("login");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/inscription/ins/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nameSignup,
            email: emailSignup,
            mot_de_passe: passwordSignup,
          }),
        }
      );

      if (response.ok) {
        // Inscription réussie
        alert("Compte créé avec succès !");
        setActiveForm("login");
      } else {
        const errorData = await response.json();
        alert(
          "Erreur lors de l'inscription: " +
            (errorData.detail || "Vérifie tes informations")
        );
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau, réessaie plus tard.");
    }
  };

  return (
    <div className="login-bg d-flex flex-column">
      <div className="login-header">
        <h3>RED PRODUCT</h3>
      </div>

      <div className="login-box">
        {activeForm === "login" && (
          <form onSubmit={handleSubmit} className="login-form">
            <h5 className="text-center mb-4">
              Connectez-vous en tant qu’admin
            </h5>
            <input
              type="email"
              className="form-control input-dark mb-4"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control input-dark mb-4 border-bottom"
              placeholder="Mot de passe"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
            />
            <p className="d-flex align-items-center h6 gap-2">
              <input type="checkbox" /> Gardez-moi connecté
            </p>
            <button
              className="btn w-100 text-white"
              style={{ background: "#555555" }}
            >
              Se connecter
            </button>
          </form>
        )}

        {activeForm === "forgot" && (
          <form onSubmit={handleForgot} className="login-form">
            <h5 className="text-center mb-4">Mot de passe oublié?</h5>
            <p>
              Entrez votre adresse email ci-dessous et nous vous enverrons des
              instructions.
            </p>
            <input
              type="email"
              className="form-control input-dark mb-4"
              placeholder="Votre e-mail"
            />
            <button
              className="btn w-100 text-white"
              style={{ background: "#555555" }}
            >
              Envoyer
            </button>
          </form>
        )}

        {activeForm === "signup" && (
          <form onSubmit={handleSignup} className="login-form">
            <h5 className="text-center mb-4">Créer un compte</h5>

            <input
              type="text"
              className="form-control input-dark mb-3 pb-3"
              placeholder="Nom"
              value={nameSignup}
              onChange={(e) => setNameSignup(e.target.value)}
              required
            />

            <input
              type="email"
              className="form-control input-dark mb-3 pb-3"
              placeholder="E-mail"
              value={emailSignup}
              onChange={(e) => setEmailSignup(e.target.value)}
              required
            />

            <input
              type="password"
              className="form-control input-dark mb-4 pb-3"
              placeholder="Mot de passe"
              value={passwordSignup}
              onChange={(e) => setPasswordSignup(e.target.value)}
              required
            />

            <p className="d-flex align-items-center h6 gap-2">
              <input type="checkbox" /> Accepter les termes et la politique
            </p>

            <button
              className="btn w-100 text-white"
              style={{ background: "#555555" }}
            >
              S’inscrire
            </button>
          </form>
        )}
      </div>
     {/* Liens pour LOGIN */}
{activeForm === "login" && (
  <div className="text-center mt-3 text-white">
    <p className="link mb-2" onClick={() => setActiveForm("forgot")}>
      Mot de passe oublié ?
    </p>
    <p>
      Vous n'avez pas de compte ?
      <span className="link ms-1" onClick={() => setActiveForm("signup")}>
        S'inscrire
      </span>
    </p>
  </div>
)}

{/* Liens pour SIGNUP */}
{activeForm === "signup" && (
  <div className="text-center mt-3 text-white">
    <p>
      Vous avez déjà un compte ?
      <span className="link ms-1" onClick={() => setActiveForm("login")}>
        Se connecter
      </span>
    </p>
  </div>
)}

{/* Liens pour FORGOT */}
{activeForm === "forgot" && (
  <div className="text-center mt-3 text-white">
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
  </div>
)}



    </div>

  );
};

export default Login;
