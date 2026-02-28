import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

function Explore() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const fetchEvents = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/events`)
            .then(res => res.json())
            .then(data => setEvents(data));
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/events/${id}`, {
            method: "DELETE"
        });

        fetchEvents(); // refresh list
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
