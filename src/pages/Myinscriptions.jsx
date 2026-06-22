import { useEffect, useState } from "react";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";

const MyInscriptions = () => {
  const [inscriptions, setInscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/inscriptions/me");
        setInscriptions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Mes inscriptions</h2>

      {inscriptions.map((ins) => (
        <div key={ins.id}>
          <p>{ins.event?.title}</p>
          <StatusBadge status={ins.status} />
        </div>
      ))}
    </div>
  );
};

export default MyInscriptions;