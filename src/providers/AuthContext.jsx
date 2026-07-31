import React, { createContext, useContext, useState, useEffect } from 'react';
import { buscarUsuarioPorId } from '../services/usuariosService';
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}

export default function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [usuarioDB, setUsuarioDB] = useState(null) 
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

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
            setUsuario(data.session?.user ?? null);
            console.log(usuario)
            setLoading(false);
        }

        verificarSessao();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUsuario(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!usuario) return;

        async function buscarUsuarioDb() {
            try {
                const usuarioDb = await buscarUsuarioPorId(usuario.id);
                if (usuarioDb.regra == "admin") {
                    setUsuarioDB(usuarioDb)
                    setIsAdmin(true);
                }
            } catch (err) {
                console.warn("Não foi possível buscar o cargo do usuário:", err.message);
            }
        }

        buscarUsuarioDb();
    }, [usuario?.id]);

    async function sair() {
        await supabase.auth.signOut();
        window.location.href = "/login";
    }

    return (
        <AuthContext.Provider value={{ usuario, setUsuario, session, loading, loginComMicrosoft, isAdmin, usuarioDB, sair }}>
            {children}
        </AuthContext.Provider>
    );
}