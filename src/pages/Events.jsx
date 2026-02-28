import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/Event";

function Explore() {
    const [events, setEvents] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);

    const [budget, setBudget] = useState(1000);
    const [locationPref, setLocationPref] = useState("");
    const [expandedEvent, setExpandedEvent] = useState(null);

    const navigate = useNavigate();

    const fetchEvents = () => {
        fetch("http://localhost:5000/api/events")
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error("Error fetching events:", err));
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleBooking = (event) => {
        navigate(`/booking-confirmation/${event._id}`, { state: { event } });
    };

    const fetchRecommendations = async () => {
        if (!locationPref) {
            alert("Please enter preferred location");
            return;
        }

        try {
            setLoadingAI(true);

            const response = await fetch(
                "http://localhost:5000/api/ai/recommend-events",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        interests: ["music", "tech"],
                        pastBookings: [],
                        budget: Number(budget),
                        location: locationPref,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setRecommendations(data.recommendations);
            } else {
                alert("Recommendation failed");
            }
        } catch (error) {
            console.error("Recommendation error:", error);
            alert("Error fetching recommendations");
        } finally {
            setLoadingAI(false);
        }
    };

    const renderEvent = (event) => (
    <div key={event._id} className="event-card-wrapper">

        <div className="custom-event-card">

            <EventCard
                event={event}
                actionButton={{
                    label: "Book Now",
                    onClick: () => handleBooking(event),
                }}
            />

            {/* ✅ Description INSIDE card */}
            <div className="event-description">
                <p>
                    {expandedEvent === event._id
                        ? event.description
                        : event.description?.substring(0, 80) + "..."}
                </p>

                <button
                    className="details-btn"
                    onClick={() =>
                        setExpandedEvent(
                            expandedEvent === event._id ? null : event._id
                        )
                    }
                >
                    {expandedEvent === event._id
                        ? "Hide Details"
                        : "View Details"}
                </button>
            </div>

        </div>
    </div>
);

    return (
        <div className="explore-page">
            <h2>Explore Events</h2>

            {/* 🤖 AI Recommendation Section */}
            <div className="ai-recommend-section">
                <h3>🤖 Smart Recommendations</h3>

                <input
                    type="text"
                    placeholder="Preferred Location"
                    value={locationPref}
                    onChange={(e) => setLocationPref(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                />

                <button onClick={fetchRecommendations} disabled={loadingAI}>
                    {loadingAI ? "Generating..." : "✨ Get AI Recommendations"}
                </button>
            </div>

            {/* ✨ Recommended Events */}
            {recommendations.length > 0 && (
                <>
                    <h2>✨ Recommended For You</h2>
                    <div className="event-grid">
                        {recommendations.map(renderEvent)}
                    </div>
                </>
            )}

            {/* 🗂 All Events */}
            <h2>All Events</h2>
            <div className="event-grid">
                {events.length === 0 && <p>No events available.</p>}
                {events.map(renderEvent)}
            </div>
        </div>
    );
}

export default Explore;