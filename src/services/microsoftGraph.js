const CACHE_KEY = "unicagen_account_created_at";

export async function buscarDataCriacaoContaMicrosoft(session) {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) return cached;

    if (!session) {
        throw new Error("Sessão não encontrada. Faça login novamente.");
    }

    const providerToken = session.provider_token;

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
