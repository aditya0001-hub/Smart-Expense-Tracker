import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthContext";
import { apiCall } from "../utils/apiCall";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GoogleAuth({ text = "signin_with", mode = "login" }) {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    // Auto-dismiss error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSuccess = async (credentialResponse) => {
        setError(null); // Clear previous errors
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Google User:", decoded);

            const { email, name, sub: googleId } = decoded;

            // Use googleId as password for Google OAuth users
            const userPassword = googleId;

            let res;
            if (mode === "register") {
                // Register format: { userName, userEmail, userPassword }
                res = await apiCall("/api/auth/register", "POST", {
                    userName: name,
                    userEmail: email,
                    userPassword: userPassword,
                });
                // After successful registration, redirect to dashboard directly
                if (res) {
                    // Try to login immediately after registration
                    res = await apiCall("/api/auth/login", "POST", {
                        userEmail: email,
                        userPassword: userPassword,
                    });
                }
            } else {
                // Login format: { userEmail, userPassword }
                res = await apiCall("/api/auth/login", "POST", {
                    userEmail: email,
                    userPassword: userPassword,
                });
            }

            if (res && res.token) {
                login(res.token, res.user);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Google Auth Error:", error);
            setError(error.message || "Authentication failed. Please try again.");
            // Scroll to top to show error
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleError = () => {
        console.error("Google Login Failed");
        setError("Google authentication failed. Please try again.");
    };

    return (
        <>
            {/* ERROR POPUP */}
            {error && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-200 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-75 max-w-md">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        <p className="text-sm font-medium flex-1">{error}</p>
                        <button onClick={() => setError(null)} className="text-red-400 hover:text-red-500">
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-center">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    theme="filled_black"
                    shape="pill"
                    text={text}

                />
            </div>

            {/* Animation Styles */}
            <style>{`
                @keyframes slide-down {
                    from { opacity: 0; transform: translate(-50%, -20px); }
                    to { opacity: 1; transform: translate(-50%, 0); }
                }
                .animate-slide-down {
                    animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </>
    );
}
