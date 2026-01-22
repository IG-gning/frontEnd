import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const stats = [
    { title: "Formulaires", value: 125, icon: <i className="bi bi-envelope"></i>, color: "stat-info" },
    { title: "Messages", value: 40, icon: <i className="bi bi-chat-dots"></i>, color: "stat-success" },
    { title: "Utilisateurs", value: 600, icon: <i class="bi bi-people-fill"></i>, color: "stat-warning" },
    { title: "Emails", value: 25, icon: <i className="bi bi-envelope"></i>, color: "stat-danger" },
    { title: "Hôtels", value: 40, icon: <i className="bi bi-building"></i>, color: "stat-primary" },
    { title: "Entrées", value: 0, icon: <i class="bi bi-people-fill"></i>, color: "stat-secondary" },
  ];

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
                  <p className="mb-0 text-muted text-secondary"> je ne sais pas quoi mettre </p>
                   
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








  