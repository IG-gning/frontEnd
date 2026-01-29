import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/inscription/login/", {
        email,
        mot_de_passe: passWord
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

  return (
    <div className="login-bg d-flex flex-column">
      <div className="login-header">
        <h3>RED PRODUCT</h3>
      </div>

      <div className="login-box">
        <form onSubmit={handleLogin} className="login-form">
          <h5 className="text-center mb-4">Connectez-vous en tant qu’admin</h5>

          <input
            type="email"
            className="form-control input-dark mb-4"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control input-dark mb-4 border-bottom"
            placeholder="Mot de passe"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            required
          />

          <button className="btn w-100 text-white" style={{ background: "#555555" }}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
