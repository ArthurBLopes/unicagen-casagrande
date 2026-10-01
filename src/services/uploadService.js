// src/services/uploadService.js
// Service responsável por enviar imagens de treinamentos para o endpoint
// PHP hospedado no DreamHost (upload.php), autenticando com o token de
// sessão do Supabase.

// Em produção usa o próprio domínio atual.
// Em desenvolvimento, VITE_UPLOAD_URL pode apontar para o domínio de produção.
const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL || "/upload.php";

const uploadImagemTreinamento = async (arquivo, session, titulo) => {
    if (!session?.access_token) {
        console.error("Usuário não autenticado");
        return null;
    }

    const formData = new FormData();

    formData.append("imagem", arquivo);

    if (titulo) {
        formData.append("titulo", titulo);
    }

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

        console.error(
            "Falha no upload da imagem:",
            erro?.error ?? response.status
        );

        return null;
    }

    const { url } = await response.json();

    return url;
};

export { uploadImagemTreinamento };