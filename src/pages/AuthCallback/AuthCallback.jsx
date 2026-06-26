import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AuthCallback() {
    const navigate = useNavigate();
    const executou = useRef(false);

    useEffect(() => {
        if (executou.current) return;
        executou.current = true;

        async function finalizarLogin() {
            console.log("URL atual:", window.location.href);

            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");

            console.log("Code recebido:", code);

            if (!code) {
                console.error("Nenhum code veio na URL");
                navigate("/login", { replace: true });
                return;
            }

            const { data, error } = await supabase.auth.exchangeCodeForSession(code);

            console.log("Resultado exchangeCodeForSession:", data);
            console.log("Erro exchangeCodeForSession:", error);

            if (error) {
                navigate("/login", { replace: true });
                return;
            }

            const { data: sessionData } = await supabase.auth.getSession();

            console.log("Sessão depois do callback:", sessionData.session);

            if (sessionData.session) {
                navigate("/home", { replace: true });
            } else {
                navigate("/login", { replace: true });
            }
        }

        finalizarLogin();
    }, [navigate]);

    return <p>Finalizando login...</p>;
}