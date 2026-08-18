import { supabase } from "../lib/supabase"

const listarTags = async () => {
    const { data, error } = await supabase.from("tags").select("*")
    if (error) {
        console.error(error)
        return []
    }

    if (!data || data.length === 0) {
        console.log("Nenhuma tag encontrada.")
        return []
    }

    return data
}

const listarTagsTreinamentos = async () => {
    const { data, error } = await supabase
        .from("treinamentos_tags")
        .select(`
            id_treinamento,
            tags (
                id,
                titulo
            )
        `)

    if (error) {
        console.error(error);
        return [];
    }

    return data;
};

const listarTagsTreinamento = async (treinamentoId) => {
    const { data, error } = await supabase
        .from("treinamentos_tags")
        .select(`
            id_treinamento,
            tags (
                id,
                titulo
            )
        `)
        .eq("id_treinamento", treinamentoId);

    if (error) {
        console.error(error);
        return [];
    }

    return data.map((item) => item.tags);
};

const sincronizarTagsDoTreinamento = async (id_treinamento, tagsIds) => {
    const { error: erroDelete } = await supabase
        .from("treinamentos_tags")
        .delete()
        .eq("id_treinamento", id_treinamento);

    if (erroDelete) {
        console.error(erroDelete);
        return null;
    }

    if (!tagsIds || tagsIds.length === 0) {
        return [];
    }

    const novasLinhas = tagsIds.map((id_tag) => ({ id_treinamento, id_tag }));

    const { data, error: erroInsert } = await supabase
        .from("treinamentos_tags")
        .insert(novasLinhas);

    if (erroInsert) {
        console.error(erroInsert);
        return null;
    }

    return data;
};

export { listarTags, listarTagsTreinamento, listarTagsTreinamentos, sincronizarTagsDoTreinamento };