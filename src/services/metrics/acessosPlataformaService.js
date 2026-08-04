import { supabase } from "../lib/supabase"

const listarAcessos = async () => {
    const { data, error } = await supabase.from("vw_resumo_acessos").select("*")
    if (error) {
        console.log(error)
        return []
    }

    if (!data || data.length === 0) {
        console.log("Nenhum acesso encontrado.")
        return []
    }

    return data
}