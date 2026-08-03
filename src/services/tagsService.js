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

const listarTagsTreinamento = async (treinamentoId) => {
    const { data, error } = await supabase
        .from("treinamentos_tags")
        .select(`
            treinamento_id,
            tags (
                id,
                titulo,
            )
        `)
        .eq("treinamento_id", treinamentoId);

    if (error) {
        console.error(error);
        return [];
    }

    return data;
};

export { listarTags, listarTagsTreinamento };