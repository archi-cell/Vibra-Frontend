import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Home.css";

function Home() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // 🔐 ADMIN CHECK FUNCTION (HARD-CODED)
    const handleCreateEvent = () => {
        // Hardcoded credentials
        const ADMIN_USERNAME = "admin";
        const ADMIN_PASSWORD = "admin123";

        const username = prompt("Enter Admin Username:")?.trim();
        const password = prompt("Enter Admin Password:")?.trim();

        if (!username || !password) {
            alert("❌ Please enter both username and password!");
            return;
        }

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            navigate("/create-event");
        } else {
            alert("❌ Invalid Admin Credentials!");
        }
    };

    const ExploreEvent = () => {
        // Hardcoded credentials
        const ADMIN_USERNAME = "admin";
        const ADMIN_PASSWORD = "admin123";

        const username = prompt("Enter Admin Username:")?.trim();
        const password = prompt("Enter Admin Password:")?.trim();

        if (!username || !password) {
            alert("❌ Please enter both username and password!");
            return;
        }

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            navigate("/explore");
        } else {
            alert("❌ Invalid Admin Credentials!");
        }
    };

    return (
        <div className="home-wrapper">

            {/* ================= NAVBAR ================= */}
            <nav className="navbar">
                <h1 className="logo">Vibra</h1>

                <div className="nav-links">
                    <a href="#services">Services</a>
                    <a href="/events">Events</a>
                    <a href="#policies">Policies</a>
                </div>

                <div className="nav-actions">
                    <span className="user-name">{user?.name || "Guest"}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>

            {/* ================= HERO ================= */}
            <section className="hero">
                <div className="hero-content">
                    <h2>Book & Create Unforgettable Events</h2>
                    <p>From birthdays to corporate events — Vibra helps you plan, organize and experience amazing moments.</p>
                    <div className="hero-buttons">
                        <button className="primary-btn" onClick={ExploreEvent}>
                            Admin Dashboard
                        </button>
                        <button className="secondary-btn" onClick={handleCreateEvent}>
                            Create Event
                        </button>
                    </div>
                </div>
            </section>

            {/* ================= SERVICES ================= */}
            <section id="services" className="services">
                <h2>Our Services</h2>
                <div className="service-cards">
                    <div className="service-card">
                        <h3>Event Booking</h3>
                        <p>Book tickets for trending events near you.</p>
                    </div>
                    <div className="service-card">
                        <h3>Event Hosting</h3>
                        <p>Create and manage your own events easily.</p>
                    </div>
                    <div className="service-card">
                        <h3>Vendor Support</h3>
                        <p>Connect with venues, decorators & caterers.</p>
                    </div>
                    <div className="service-card">
                        <h3>Secure Payments</h3>
                        <p>Fast and secure payment integration.</p>
                    </div>
                </div>
            </section>

            

            {/* ================= WHY US ================= */}
            <section className="why-us">
                <h2>Why Choose Vibra?</h2>
                <div className="why-grid">
                    <div>
                        <h4>✔ Trusted Platform</h4>
                        <p>Thousands of successful events hosted.</p>
                    </div>
                    <div>
                        <h4>✔ Easy Management</h4>
                        <p>Manage bookings and attendees smoothly.</p>
                    </div>
                    <div>
                        <h4>✔ 24/7 Support</h4>
                        <p>Dedicated customer support team.</p>
                    </div>
                </div>
            </section>

            {/* ================= POLICIES ================= */}
            <section id="policies" className="policies">
                <h2>Our Policies</h2>
                <div className="policy-cards">
                    <div>
                        <h4>Refund Policy</h4>
                        <p>Easy refunds within 48 hours of booking.</p>
                    </div>
                    <div>
                        <h4>Privacy Policy</h4>
                        <p>Your data is secure and never shared.</p>
                    </div>
                    <div>
                        <h4>Terms & Conditions</h4>
                        <p>Clear and transparent booking policies.</p>
                    </div>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="footer">
                <div className="footer-content">
                    <h3>Vibra</h3>
                    <p>Creating memorable experiences through seamless event management.</p>
                    <div className="footer-links">
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                        <a href="#">Support</a>
                    </div>
                    <p className="copyright">© 2026 Vibra. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
}

export default Home;