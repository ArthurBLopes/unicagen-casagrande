import { supabase } from "../lib/supabase";

const listarUsuarios = async () => {
    const { data, error} = await supabase.from("usuarios").select("*")
    if (error) {
        console.error(error)
        return []
    }
    return data
}

export { listarUsuarios }