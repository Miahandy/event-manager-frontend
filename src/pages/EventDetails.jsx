import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import formatDate from "../utils/formatDate";
import Spinner from "../components/common/Spinner"

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Erreur API", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);
  if (loading) return <Spinner />;
  if (!event) return <p>Événement introuvable</p>;
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold"> { event.nom || event.title} </h1>
      <p className="mt-2"> {formatDate(event.date || event.date_evenement)}</p>
      <p> {event.lieu?.name || event.lieu} </p>
      <p> {event.category?.name || event.categorie} </p>
      <div className="mt-4">
        <p> {event.description} </p>
      </div>
    </div>
  );
};

export default EventDetails;