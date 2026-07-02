import { supabase } from "../lib/supabase";

const CACHE_KEY = "unicagen_account_created_at";

export async function buscarDataCriacaoContaMicrosoft() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) return cached;

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw new Error("Erro ao buscar sessão do Supabase.");
    }

    const providerToken = data.session?.provider_token;

    if (!providerToken) {
        throw new Error("Token da Microsoft não encontrado. Faça login novamente.");
    }

    const response = await fetch(
        "https://graph.microsoft.com/v1.0/me?$select=id,displayName,mail,userPrincipalName,createdDateTime",
        {
            headers: {
                Authorization: `Bearer ${providerToken}`,
            },
        }
    );

    if (!response.ok) {
        const erro = await response.json();
        console.error("Erro Microsoft Graph:", erro);
        throw new Error("Erro ao buscar dados no Microsoft Graph.");
    }

    const usuarioMicrosoft = await response.json();
    const createdDateTime = usuarioMicrosoft.createdDateTime;

    localStorage.setItem(CACHE_KEY, createdDateTime);

    return createdDateTime;
}
