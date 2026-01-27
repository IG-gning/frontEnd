import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/dashboard/")

      .then(res => {
        const data = res.data;
        setStats([
          { title: "Formulaires", value: data.formulaires, icon: <i className="bi bi-envelope"></i>, color: "stat-info" },
          { title: "Messages", value: data.messages, icon: <i className="bi bi-chat-dots"></i>, color: "stat-success" },
          { title: "Utilisateurs", value: data.utilisateurs, icon: <i className="bi bi-people-fill"></i>, color: "stat-warning" },
          { title: "Emails", value: data.emails, icon: <i className="bi bi-envelope"></i>, color: "stat-danger" },
          { title: "Hôtels", value: data.hotels, icon: <i className="bi bi-building"></i>, color: "stat-primary" },
          { title: "Entrées", value: data.entrees, icon: <i className="bi bi-people-fill"></i>, color: "stat-secondary" },
        ]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {stats.map((item, index) => (
          <div className="col-12 col-sm-6 col-md-4 mb-3" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex align-items-center gap-3">
                <div className={`stat-icon ${item.color}`}>
                  {item.icon}
                </div>
                <div className=" align-items-center text-secondary">
                  <p className="mb-0 text-secondary"><span className="h3">{item.value}</span> {item.title}</p>
                  <p className="mb-0 text-muted text-secondary">Statistique à jour</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
