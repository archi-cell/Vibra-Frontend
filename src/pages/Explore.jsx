import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

const API_URL = import.meta.env.VITE_API_URL || "https://vibra-backend-6tpm.onrender.com";

function Explore() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const res = await fetch(`${API_URL}/api/events`);
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error("Error fetching events:", err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/api/events/${id}`, {
                method: "DELETE"
            });
            fetchEvents();
        } catch (err) {
            console.error("Error deleting event:", err);
        }
    };

    const handleEdit = (event) => {
        navigate(`/edit-event/${event._id}`);
    };

    return (
        <div className="explore-page">
            <h2>Admin Dashboard</h2>
            <div className="event-grid">
                {events.map(event => (
                    <EventCard
                        key={event._id}
                        event={event}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
}

export default Explore;
