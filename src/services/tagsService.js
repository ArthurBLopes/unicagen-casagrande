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

const listarTagsTreinamento = async (id_treinamento) => {
    const { data, error } = await supabase.from("tags").select("*").eq("id_treinamento", id_treinamento);
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

export { listarTags, listarTagsTreinamento };