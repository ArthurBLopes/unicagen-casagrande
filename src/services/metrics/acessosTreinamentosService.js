import { supabase } from "../../lib/supabase"

const registrarAcessoTreinamento = async (id_usuario, id_treinamento) => {
 
    const { data, error } = await supabase
        .from("acessos_treinamento")
        .insert({ id_usuario, id_treinamento })
        .select()
        .single()

    if (error) {
        console.error(error)
        return null
    }

    return data
}

const buscarAcessosTreinamento = async (id_treinamento) => {
    const { data, error } = await supabase
        .from("vw_treinamentos_mais_acessados")
        .select("*")
        .eq("id_treinamento", id_treinamento)
        .single()

    if (error) {
        console.error(error)
        return null
    }

    return data
}

const listarAcessosView = async () => {
    const { data, error } = await supabase
        .from("vw_treinamentos_mais_acessados")
        .select("*")

    if (error) {
        console.error(error);
        return [];
    }

    return data;
};

export { registrarAcessoTreinamento, buscarAcessosTreinamento, listarAcessosView };