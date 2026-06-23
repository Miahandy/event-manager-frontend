import api from "../services/api";
import { useState } from "react";

const InscriptionButton = ({ eventId }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleInscription = async () => {
    setLoading(true);

    try {
      await api.post(`/inscriptions`, {
        eventId,
      });

      setStatus("inscrit");
    } catch (err) {
      console.error(err);
      setStatus("erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleInscription} disabled={loading}>
        {loading ? "Inscription..." : "S'inscrire"}
      </button>

      {status === "inscrit" && <p>✔ Inscrit</p>}
      {status === "erreur" && <p>❌ Erreur</p>}
    </div>
  );
};

export default InscriptionButton;