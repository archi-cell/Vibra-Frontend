// pages/BookingConfirmation.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/confirmation.css";

function BookingConfirmation() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [event, setEvent] = useState(location.state?.event || null);
    const [bookingStatus, setBookingStatus] = useState("");

    // If user navigates directly, fetch event by ID
    useEffect(() => {
        if (!event) {
            fetch(`http://localhost:5000/api/events/${id}`)
                .then(res => res.json())
                .then(data => setEvent(data))
                .catch(err => console.error("Error fetching event:", err));
        }
    }, [id, event]);

    const handleConfirmBooking = async () => {
        if (!event) return;

        try {
            // Update bookedSeats in backend
            const updatedEvent = {
                bookedSeats: (event.bookedSeats || 0) + 1
            };

            await fetch(`http://localhost:5000/api/events/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedEvent)
            });

            setBookingStatus("✅ Booking Confirmed!");
        } catch (err) {
            console.error(err);
            setBookingStatus("❌ Booking Failed!");
        }
    };

    if (!event) return <p>Loading event details...</p>;

    return (
        <div className="booking-page">
            <h2>Booking Confirmation</h2>

            <div className="booking-details">
                <img src={event.image} alt={event.title} width="500" />
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Price:</strong> ${event.price}</p>
                

                <button onClick={handleConfirmBooking} disabled={bookingStatus === "✅ Booking Confirmed!"}>
                    Confirm Booking
                </button>

                {bookingStatus && <p className="booking-status">{bookingStatus}</p>}

                <button onClick={() => navigate("/explore")}>Back to Events</button>
            </div>
        </div>
    );
}

export default BookingConfirmation;
