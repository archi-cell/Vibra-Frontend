
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Events from "./pages/Events";
import BookingConfirmation from "./pages/Confirmation";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>

        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Landing />} />

        <Route path="/events" element={<Events />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/home" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/home" replace /> : <Register />}
        />

        {/* ===== PROTECTED ROUTES ===== */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/explore"
          element={user ? <Explore /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/create-event"
          element={user ? <CreateEvent /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/edit-event/:id"
          element={user ? <EditEvent /> : <Navigate to="/login" replace />}
        />

        <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}



export default App;