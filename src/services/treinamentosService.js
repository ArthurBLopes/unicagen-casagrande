import { supabase } from "../lib/supabase";
import { useState } from "react"

const listarTreinamentos = async () => {
    const { data, error } = await supabase.from("treinamentos").select("*")
    if (error) {
        console.error(error)
        return []
    }

    if (!data || data.length === 0) {
        console.log("Nenhum curso encontrado.")
        return []
    }

    return data
}

const inserirTreinamento = async (treinamento) => {
    const { data, error } = await supabase.from("treinamentos").insert(treinamento)
    if (error) {
        console.error(error)
        return null
    }

    return data
}

const atualizarTreinamento = async (id, treinamentoAtualizado) => {
    const { data, error } = await supabase.from("treinamentos").update(treinamentoAtualizado).eq("id", id)
    if (error) {
        console.error(error)
        return null
    }

    return data
}

const removerTreinamento = async (id) => {
    const { data, error } = await supabase.from("treinamentos").delete().eq("id", id)
    if (error) {
        console.error(error)
        return null
    }
    return data
} 

export { listarTreinamentos, inserirTreinamento, atualizarTreinamento, removerTreinamento }

