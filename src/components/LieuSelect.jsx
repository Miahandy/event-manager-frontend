import { useEffect, useState } from "react";
//import { useFetch } from "../hooks/useFetch";
import { getLieux } from "../services/lieuService";
import api from "../services/api";


export default function LieuSelect({ value, onChange, name = "lieu_id", required }) {
  const { data, loading } = useFetch(getLieux);

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="auth-form__input auth-form__select"
      disabled={loading}
    >
      <option value="">{loading ? "Chargement…" : "-- Choisir un lieu --"}</option>
      {data?.map(l => (
        <option key={l.id} value={l.id}>{l.nom}</option>
      ))}
    </select>
  );
}
