
import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";
import Spinner from "../components/common/Spinner";
import "./Home.css";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero__beam hero__beam--1" />
        <div className="hero__beam hero__beam--2" />
        <div className="hero__beam hero__beam--3" />

        <div className="hero__content">
          <h1 className="hero__title">Gérez vos événements</h1>
          <p className="hero__subtitle">
            Organisez, planifiez et gérez vos événements en toute simplicité.
          </p>
        </div>
      </section>

      {/* La suite de la page (liste des événements via EventCard) viendra ici,
          une fois Home.jsx connecté à eventService.js */}
    </main>
  );
}
