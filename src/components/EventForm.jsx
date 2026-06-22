import { useState } from "react";
import api from "../services/api";
import CategorySelect from "./CategorySelect";
import LieuSelect from "./LieuSelect";
import FiliereSelect from "./FiliereSelect";

const EventForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    categoryId: "",
    lieuId: "",
    filiereId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/events", form);
      alert("Événement créé avec succès");

      setForm({
        title: "",
        description: "",
        date: "",
        categoryId: "",
        lieuId: "",
        filiereId: "",
      });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">

      <input
        type="text"
        name="title"
        placeholder="Titre"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <CategorySelect
        value={form.categoryId}
        onChange={(value) =>
          setForm({ ...form, categoryId: value })
        }
      />

      <LieuSelect
        value={form.lieuId}
        onChange={(value) =>
          setForm({ ...form, lieuId: value })
        }
      />

      <FiliereSelect
        value={form.filiereId}
        onChange={(value) =>
          setForm({ ...form, filiereId: value })
        }
      />

      <button type="submit">
        Créer événement
      </button>

    </form>
  );
};

export default EventForm;