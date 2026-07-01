import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AuthCallback() {
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState("Finalizando login...");

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.replace("#", ""));

        const erro =
            searchParams.get("error") ||
            hashParams.get("error");

        const descricao =
            searchParams.get("error_description") ||
            hashParams.get("error_description");

        if (erro) {
            console.error("Erro no callback:", {
                erro,
                descricao,
                url: window.location.href,
            });

            setMensagem(descricao || "Erro ao finalizar login.");

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 2500);

            return;
        }

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("Auth event:", event, session);

            if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
                navigate("/inicio", { replace: true });
            }

            if (event === "SIGNED_OUT") {
                navigate("/login", { replace: true });
            }
        });

        supabase.auth.getSession().then(({ data, error }) => {
            console.log("Sessão no callback:", data.session);
            console.log("Erro getSession:", error);

            if (data.session) {
                navigate("/inicio", { replace: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

    return <p>{mensagem}</p>;
}