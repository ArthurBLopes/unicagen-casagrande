import { supabase } from "../../lib/supabase"
import { hoje } from "../../utils/formatarData"

const registrarAcessoPlataforma = async (id_usuario) => {
 
    const { data, error } = await supabase
        .from("acessos_plataforma")
        .upsert(
            { id_usuario, data_acesso: hoje, ultima_atividade: new Date().toISOString() },
            { onConflict: "id_usuario,data_acesso" }
        )
        .select()
        .single()

    if (error) {
        console.error(error)
        return null
    }

    return data
}

const buscarAcessoUsuario = async (id_usuario) => {
    const { data, error } = await supabase
        .from("vw_acessos_15_dias")
        .select("*")
        .eq("id_usuario", id_usuario)
        .single()

    if (error) {
        console.error(error)
        return null
    }

    return data
}

const listarAcessosView = async () => {
    const { data, error } = await supabase
        .from("vw_acessos_15_dias")
        .select("*")

    if (error) {
        console.error(error);
        return [];
    }

    return data;
};

const listarAcessos = async () => {
    const { data, error } = await supabase
        .from("acessos_plataforma")
        .select("*")

    if (error) {
        console.error(error);
        return [];
    }

    return data;
};

export { registrarAcessoPlataforma, buscarAcessoUsuario, listarAcessosView, listarAcessos }