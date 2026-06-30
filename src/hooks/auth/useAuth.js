import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export function useAuth() {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loginComMicrosoft() {
        console.log("Clicou no login Microsoft");

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "azure",
            options: {
                scopes: "openid email profile User.Read",
                redirectTo: `${window.location.origin}/auth/callback`,
                queryParams: {
                    prompt: "consent",
                },
            },
        });

        console.log("Resposta OAuth:", data);

        if (error) {
            console.error("Erro ao entrar com Microsoft:", error.message);
        }
    }

    //

    useEffect(() => {
        async function verificarSessao() {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Erro ao verificar sessão:", error.message);
                setLoading(false);
                return;
            }

            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
        }

        verificarSessao();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    //

    async function sair() {
        await supabase.auth.signOut();
        window.location.href = "/login";
    }

    return {
        session,
        user,
        loading,
        loginComMicrosoft,
        sair,
    };
}