import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

export const EventCard = ({ event }) => {
  if (!event) return null;

  console.log("Event reçu :", event);
  console.log("ID :", event.id);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border">
      <h2 className="text-xl font-semibold mb-2">
        {event.nom || event.title}
      </h2>

      <p className="text-gray-600">
        {formatDate(event.date || event.date_evenement)}
      </p>

      <p className="text-gray-600">
        {event.lieu?.name || event.lieu}
      </p>

      <p className="mt-2 text-gray-700">
        {event.description}
      </p>

      <Link
        to={`/events/${event.id}`}
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Voir les détails
      </Link>
    </div>
  );
};

export default EventCard;