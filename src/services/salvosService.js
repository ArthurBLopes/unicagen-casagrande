import { supabase } from "../lib/supabase"

const listarSalvos = async (id_usuario) => {
    const { data, error } = await supabase.from("salvos").select("*").eq("id_usuario", id_usuario)
    if (error) {
        console.error(error)
        return []
    }

    if (!data || data.length === 0) {
        console.log("Nenhum curso salvo encontrado.")
        return []
    }

    return data
}

const inserirSalvo = async (salvo) => {
    const { data, error } = await supabase
        .from("salvos")
        .insert(salvo)
        .select()
        .single()

    if (error) {
        console.error(error)
        return null
    }

    return data
}

const removerSalvo = async (id_usuario, id_treinamento) => {
    const { data, error } = await supabase.from("salvos").delete().eq("id_usuario", id_usuario).eq("id_treinamento", id_treinamento)
    if (error) {
        console.error(error)
        return null
    }
    return data
} 

export { listarSalvos, inserirSalvo, removerSalvo }