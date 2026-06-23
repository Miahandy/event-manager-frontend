import { useEffect, useState } from "react";
import api from "../services/api";
import { useFetch } from "../hooks/useFetch";
import { getCategories } from "../services/categoryService";

export default function CategorySelect({ value, onChange, name = "categorie_id", required }) {
  const { data, loading } = useFetch(getCategories);

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="auth-form__input auth-form__select"
      disabled={loading}
    >
      <option value="">{loading ? "Chargement…" : "-- Choisir une catégorie --"}</option>
      {data?.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.nom}</option>
      ))}
    </select>
  );
}

