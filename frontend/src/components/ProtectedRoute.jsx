import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    // Wait until AuthContext finishes checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in
    return <Outlet />;
};

export default ProtectedRoute;