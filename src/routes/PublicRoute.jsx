import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

export default function PublicRoute() {
    const { session, loading } = useAuth();

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (session) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}