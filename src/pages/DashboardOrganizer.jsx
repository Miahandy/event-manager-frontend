import { useEffect, useState } from "react";
import api from "../services/api";

const DashboardOrganizer = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events/my");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Dashboard Organisateur</h1>

      {events.map((e) => (
        <div key={e.id}>
          <p>{e.title}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardOrganizer;