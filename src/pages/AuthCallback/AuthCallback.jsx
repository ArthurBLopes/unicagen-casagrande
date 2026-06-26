import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        async function finalizarLogin() {
            const code = new URLSearchParams(window.location.search).get("code");

            if (code) {
                const { error } = await supabase.auth.exchangeCodeForSession(code);

                if (error) {
                    console.error("Erro ao finalizar login:", error.message);
                    navigate("/login");
                    return;
                }
            }

            const { data } = await supabase.auth.getSession();

            if (data.session) {
                navigate("/home");
            } else {
                navigate("/login");
            }
        }

        finalizarLogin();
    }, [navigate]);

    return <p>Finalizando login...</p>;
}