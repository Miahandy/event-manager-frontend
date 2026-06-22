import { useEffect, useState } from "react";
import api from "../services/api";

const LieuSelect = ({ value, onChange }) => {
  const [lieux, setLieux] = useState([]);

  useEffect(() => {
    const fetchLieux = async () => {
      try {
        const res = await api.get("/lieux");
        setLieux(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLieux();
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Choisir un lieu</option>
      {lieux.map((l) => (
        <option key={l.id} value={l.id}>
          {l.name}
        </option>
      ))}
    </select>
  );
};

export default LieuSelect;