import { supabase } from "../lib/supabase";

const listarUsuarios = async () => {
    const { data, error} = await supabase.from("usuarios").select("*")
    if (error) {
        console.error(error)
        return []
    }
    return data
}

const buscarUsuarioPorId = async (id) => {
    const { data, error } = await supabase
        .from("usuarios")
        .select("id, nome, email, regra")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
};

export { listarUsuarios, buscarUsuarioPorId };