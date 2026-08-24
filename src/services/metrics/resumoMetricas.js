import { supabase } from "../../lib/supabase"

const listarAtividadeUsuarios = async () => {
    const { data, error } = await supabase
        .from("vw_resumo_atividade_usuarios")
        .select("*")

    if (error) {
        console.error(error);
        return [];
    }

    return data;
};

const listarEngajamentoPlataforma = async () => {
    const { data, error } = await supabase
        .from("vw_engajamento_30_dias")
        .select("*")

    if (error) {
        console.error(error);
        return [];
    }

    return data;
};

const listarUsuariosQueAcessaramNovaUnicagen = async () => {
    const { count, error } = await supabase
    .from("usuarios")
    .select("*", { count: "exact", head: true });

    if (error) {
        console.error(error);
        return [];
    }

    return count;
};

const listarEngajamentoTreinamentos = async () => {
    const { data, error } = await supabase
    .from("vw_treinamentos_mais_acessados")
    .select("*")
    .order("total_acessos", { ascending: false })
    .limit(5);

    if (error) {
        console.error(error);
        return [];
    }

    return data;
};



export { listarAtividadeUsuarios, listarEngajamentoPlataforma, listarUsuariosQueAcessaramNovaUnicagen, listarEngajamentoTreinamentos };