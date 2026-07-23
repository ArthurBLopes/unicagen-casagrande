// src/services/uploadService.js
// Service responsável por enviar imagens de treinamentos para o endpoint
// PHP hospedado no DreamHost (upload.php), autenticando com o token de
// sessão do Supabase.

// TODO: trocar pelo domínio real de produção quando o upload.php estiver publicado.
const UPLOAD_URL = "https://unicagen.dreamhosters.com/upload.php";

const uploadImagemTreinamento = async (arquivo, session) => {
    if (!session) {
        console.error("Usuário não autenticado");
        return null;
    }

    const formData = new FormData();
    formData.append("imagem", arquivo);

    let response;
    try {
        response = await fetch(UPLOAD_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
            body: formData,
        });
    } catch (erro) {
        console.error("Erro de rede ao enviar imagem:", erro);
        return null;
    }

    if (!response.ok) {
        const erro = await response.json().catch(() => null);
        console.error("Falha no upload da imagem:", erro?.error ?? response.status);
        return null;
    }

    const { url } = await response.json();
    return url;
};

export { uploadImagemTreinamento };