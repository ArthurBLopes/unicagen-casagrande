import { supabase } from "../lib/supabase";
import { useState } from "react"

const listarTrilhas = async () => {
    const { data, error } = await supabase.from("trilhas").select("*")
    if (error) {
        console.error(error)
        return []
    }

    if (!data || data.length === 0) {
        console.log("Nenhuma trilha encontrada.")
        return []
    }

    return data
}

const inserirTrilha = async (trilha) => {
    const { data, error } = await supabase.from("trilhas").insert(trilha)
    if (error) {
        console.error(error)
        return null
    }

    return data
}

const atualizarTrilha = async (id, trilhaAtualizada) => {
    const { data, error } = await supabase.from("trilhas").update(trilhaAtualizada).eq("id", id)
    if (error) {
        console.error(error)
        return null
    }

    return data
}

const removerTrilha = async (id) => {
    const { data, error } = await supabase.from("trilhas").delete().eq("id", id)
    if (error) {
        console.error(error)
        return null
    }
    return data
}

export { listarTrilhas, inserirTrilha, atualizarTrilha, removerTrilha }