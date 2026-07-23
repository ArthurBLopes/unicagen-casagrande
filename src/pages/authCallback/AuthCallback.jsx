import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { session, loading } = useAuth();
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

        if (!loading) {
            if (session) {
                console.log("Sessão no callback:", session);
                navigate("/inicio", { replace: true });
            } else {
                navigate("/login", { replace: true });
            }
        }
    }, [navigate, session, loading]);

    return <p>{mensagem}</p>;
}