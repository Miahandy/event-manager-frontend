import { useEffect, useState } from "react";
import api from "../services/api";
import MyInscriptions from "../pages/MyInscriptions";

const DashboardStudent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Dashboard Étudiant</h1>

      {user && <p>Bienvenue {user.name}</p>}

      <MyInscriptions />
    </div>
  );
};

export default DashboardStudent;