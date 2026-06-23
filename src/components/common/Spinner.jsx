import React from "react";
import "./Spinner.css";

export default function Spinner({ size = "md", label = "Chargement…" }) {
  return (
    <div className={`spinner-wrap spinner-wrap--${size}`} role="status" aria-label={label}>
      <div className="spinner-ring" />
      {label && <span className="spinner-label">{label}</span>}
    </div>
  );
}
