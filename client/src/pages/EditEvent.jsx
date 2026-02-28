import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Explore.css"

function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        price: "",
        image: ""
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/events`)
            .then(res => res.json())
            .then(data => {
                const event = data.find(e => e._id === id);
                if (event) setForm(event);
            });
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`http://localhost:5000/api/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        navigate("/explore");
    };

    return (
        <div className="create-page">
            <h2>Edit Event</h2>

            <form onSubmit={handleSubmit}>
                <input name="title" value={form.title} onChange={handleChange} required />
                <input name="location" value={form.location} onChange={handleChange} required />
                <input name="date" type="date" value={form.date} onChange={handleChange} required />
                <input name="price" type="number" value={form.price} onChange={handleChange} required />
                <input name="image" value={form.image} onChange={handleChange} required />
                <textarea name="description" value={form.description} onChange={handleChange} required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditEvent;