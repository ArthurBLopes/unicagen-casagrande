import { supabase } from "../../lib/supabase";

const registrarProgressoVideo = async (id_usuario, id_treinamento, dados) => {
    const { data, error } = await supabase
        .from("progresso_video_treinamento")
        .upsert(
            { id_usuario, id_treinamento, atualizado_em: new Date().toISOString(), ...dados },
            { onConflict: "id_usuario,id_treinamento" }
        )
        .select()
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
};

const listarProgressoVideo = async () => {
    const { data, error } = await supabase
        .from("progresso_video_treinamento")
        .select("*, treinamentos(titulo)");

    if (error) {
        console.error(error);
        return [];
    }

    return data;
};

const listarProgressoVideoPorUsuario = async (id_usuario) => {
    const { data, error } = await supabase
        .from("progresso_video_treinamento")
        .select("*, treinamentos(titulo)")
        .eq("id_usuario", id_usuario);

    if (error) {
        console.error(error);
        return [];
    }

    return data;
};

export { registrarProgressoVideo, listarProgressoVideo, listarProgressoVideoPorUsuario };
