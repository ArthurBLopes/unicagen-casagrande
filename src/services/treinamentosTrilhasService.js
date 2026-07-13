import { supabase } from "../lib/supabase";
import { useState } from "react"

const listarTreinamentosTrilhas = async () => {
    const { data, error } = await supabase.from("treinamentos_trilhas").select("*")
    if (error) {
        console.error(error)
        return []
    }

    if (!data || data.length === 0) {
        console.log("Nenhum treinamento_trilha encontrado.")
        return []
    }

    return data
}

export { listarTreinamentosTrilhas }