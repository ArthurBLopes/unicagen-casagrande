import { supabase } from "../lib/supabase";

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

export { listarTreinamentosTrilhas, listarTreinamentosDaTrilha, listarTrilhasComTreinamentos };
