import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Event.css";

function CreateEvent() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        price: "",
        image: "",
        category: ""
    });

    const [loadingAI, setLoadingAI] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔥 AI Description Generator
    const generateDescription = async () => {
        if (!form.title || !form.location || !form.date || !form.category) {
            alert("Please fill Title, Location, Date and Category first.");
            return;
        }

        try {
            setLoadingAI(true);

            const response = await fetch(
                "http://localhost:5000/api/ai/generate-description",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: form.title,
                        location: form.location,
                        date: form.date,
                        category: form.category
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setForm({ ...form, description: data.description });
            } else {
                alert("AI generation failed");
            }

        } catch (error) {
            console.error(error);
            alert("Error generating description");
        } finally {
            setLoadingAI(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:5000/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        navigate("/explore");
    };

    return (
        <div className="create-page">
            <h2>Create Event</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    required
                />

                <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />

                <input
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                    required
                />

                {/* 🔥 NEW CATEGORY FIELD */}
                <input
                    name="category"
                    placeholder="Category (e.g., Tech, Music, Business)"
                    value={form.category}
                    onChange={handleChange}
                    required
                />

                {/* 🔥 DESCRIPTION FIELD */}
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />

                {/* ✨ AI BUTTON */}
                <button
                    type="button"
                    onClick={generateDescription}
                    disabled={loadingAI}
                    className="ai-button"
                >
                    {loadingAI ? "Generating..." : "✨ Generate with AI"}
                </button>

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateEvent;