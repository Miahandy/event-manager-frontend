import { useFetch } from "../hooks/useFetch";
import { getFilieres } from "../services/filiereService";

export default function FiliereSelect({ value, onChange, name = "filiere_id", required }) {
  const { data, loading } = useFetch(getFilieres);

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="auth-form__input auth-form__select"
      disabled={loading}
    >
      <option value="">{loading ? "Chargement…" : "-- Choisir une filière --"}</option>
      {data?.map(f => (
        <option key={f.id} value={f.id}>{f.nom}</option>
      ))}
    </select>
  );
}
