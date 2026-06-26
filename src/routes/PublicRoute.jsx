import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function PublicRoute() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (session) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}