import { supabase } from "../lib/supabase";
import { useState } from "react"

const listarSalvos = async () => {
    const { data, error } = await supabase.from("salvos").select("*").eq("id_usuario", supabase.auth.user().id)
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
    const { data, error } = await supabase.from("salvos").insert(salvo)
    if (error) {
        console.error(error)
        return null
    }

    return data
}

const removerSalvo = async (id) => {
    const { data, error } = await supabase.from("salvos").delete().eq("id", id)
    if (error) {
        console.error(error)
        return null
    }
    return data
} 

export { listarSalvos, inserirSalvo, removerSalvo }