import { useState } from "react";

function EventCard({ event, actionButton }) {
    const [showFull, setShowFull] = useState(false);

    return (
        <div className="event-card">

            {/* Event Image */}
            <img
                src={event.image}
                alt={event.title}
                className="event-image"
            />

            {/* Event Info */}
            <h3>{event.title}</h3>
            <p>{event.date} • {event.location}</p>
            <h4>₹{event.price}</h4>

            {/* Description */}
            <div className="event-description">
                <p>
                    {showFull
                        ? event.description
                        : event.description?.substring(0, 80) + "..."}
                </p>

                {event.description && (
                    <button
                        className="details-btn"
                        onClick={() => setShowFull(!showFull)}
                    >
                        {showFull ? "Hide Details" : "View Details"}
                    </button>
                )}
            </div>

            {/* ✅ BOOK NOW BUTTON */}
            {actionButton && (
                <button
                    className="book-btn"
                    onClick={actionButton.onClick}
                >
                    {actionButton.label}
                </button>
            )}

        </div>
    );
}

export default EventCard;
