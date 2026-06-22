import { useEffect, useState } from "react";
import api from "../services/api";

const DashboardAdmin = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1>Dashboard Admin</h1>

      {stats && (
        <>
          <p>Utilisateurs: {stats.users}</p>
          <p>Événements: {stats.events}</p>
          <p>Inscriptions: {stats.inscriptions}</p>
        </>
      )}
    </div>
  );
};

export default DashboardAdmin;