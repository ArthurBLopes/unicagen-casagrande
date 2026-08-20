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
    const { data, error } = await supabase.from("trilhas").insert(trilha).select().single()
    if (error) {
        console.error(error)
        return error
    }

    return data
}

const atualizarTrilha = async (id, trilhaAtualizada) => {
    const { data, error } = await supabase.from("trilhas").update(trilhaAtualizada).eq("id", id).select().single()
    if (error) {
        console.error(error)
        return error
    }

    return data
}

const removerTrilha = async (id) => {
    const { data, error } = await supabase.from("trilhas").delete().eq("id", id).select()
    if (error) {
        console.error(error)
        return null
    }
    return data
}

export { listarTrilhas, inserirTrilha, atualizarTrilha, removerTrilha }