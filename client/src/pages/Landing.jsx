import { Link } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
    return (
        <div className="landing-wrapper">

            <nav className="landing-navbar">
                <h1 className="logo">Vibra</h1>
                <div>
                    <Link to="/login" className="nav-btn">Login</Link>
                </div>
            </nav>

            <div className="landing-hero">
                <h2>Create. Connect. Celebrate.</h2>
                <p>
                    The modern event platform to manage and explore celebrations effortlessly.
                </p>

                <div className="hero-buttons">
                    <Link to="/register" className="primary-btn">
                        Create Account
                    </Link>

                    <Link to="/login" className="secondary-btn">
                        Login
                    </Link>
                </div>
            </div>

            <footer className="landing-footer">
                © 2026 Vibra. All rights reserved.
            </footer>

        </div>
    );
}

export default Landing;