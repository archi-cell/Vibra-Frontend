import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("vibraUser")) || null
    );

    const login = async (data) => {
        try {
            // You can later replace this with API call
            localStorage.setItem("vibraUser", JSON.stringify(data));
            setUser(data);
            return true; // ✅ VERY IMPORTANT
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const register = async (data) => {
        try {
            localStorage.setItem("vibraUser", JSON.stringify(data));
            setUser(data);
            return true; // ✅ VERY IMPORTANT
        } catch (error) {
            console.error("Register failed:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("vibraUser");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
