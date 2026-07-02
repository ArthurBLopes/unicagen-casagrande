import { supabase } from "../lib/supabase";

export async function buscarDataCriacaoContaMicrosoft() {
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

    return usuarioMicrosoft.createdDateTime;
}
