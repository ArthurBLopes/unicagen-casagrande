import { supabase } from "../lib/supabase";

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

const listarTreinamentosDaTrilha = async (trilhaId) => {
    const { data, error } = await supabase
        .from("treinamentos_trilhas")
        .select(`
            treinamento_id,
            treinamentos (
                id,
                titulo,
                descricao,
                link_conteudo,
                link_material,
                data_publicacao,
                imagem
            )
        `)
        .eq("trilha_id", trilhaId);

    if (error) {
        console.error(error);
        return [];
    }

    return data.map((item) => item.treinamentos);
};

const listarTrilhasDoTreinamento = async (treinamento_id) => {
    const { data, error } = await supabase
        .from("treinamentos_trilhas")
        .select(`
            id_treinamento,
            trilhas (
                id,
                titulo,
                descricao,
                cor
            )
        `)
        .eq("id_treinamento", treinamento_id);

    if (error) {
        console.error(error);
        return [];
    }

    return data.map((item) => item.trilhas);
}

const sincronizarTrilhasDoTreinamento = async (id_treinamento, trilhaIds) => {
    const { error: erroDelete } = await supabase
        .from("treinamentos_trilhas")
        .delete()
        .eq("id_treinamento", id_treinamento);

    if (erroDelete) {
        console.error(erroDelete);
        return null;
    }

    if (!trilhaIds || trilhaIds.length === 0) {
        return [];
    }

    const novasLinhas = trilhaIds.map((id_trilha) => ({ id_treinamento, id_trilha }));

    const { data, error: erroInsert } = await supabase
        .from("treinamentos_trilhas")
        .insert(novasLinhas);

    if (erroInsert) {
        console.error(erroInsert);
        return null;
    }

    return data;
};

const listarTrilhasComTreinamentos = async () => {
    const { data, error } = await supabase
        .from("trilhas")
        .select(`
            id,
            titulo,
            descricao,
            cor,
            treinamentos_trilhas (
                treinamentos (
                    id,
                    titulo,
                    descricao,
                    link_conteudo,
                    link_material,
                    data_publicacao,
                    imagem
                )
            )
        `)
    if (error) {
        console.error(error);
        return [];
    }

    const trilhasFormatadas = data.map((trilha) => ({
        id: trilha.id,
        titulo: trilha.titulo,
        descricao: trilha.descricao,
        cor: trilha.cor,
        treinamentos: trilha.treinamentos_trilhas.map((item) => item.treinamentos),
    }));

    const prioridade = {
        "Onboarding": 0,
        "Formação Inicial": 1,
    };

    trilhasFormatadas.sort((a, b) => {
        const prioridadeA = prioridade[a.titulo] ?? Number.MAX_SAFE_INTEGER;
        const prioridadeB = prioridade[b.titulo] ?? Number.MAX_SAFE_INTEGER;

        if (prioridadeA !== prioridadeB) {
            return prioridadeA - prioridadeB;
        }

        return 0;
    });

    return trilhasFormatadas;
};

export { listarTreinamentosTrilhas, listarTreinamentosDaTrilha, listarTrilhasComTreinamentos, listarTrilhas, sincronizarTrilhasDoTreinamento, listarTrilhasDoTreinamento };
