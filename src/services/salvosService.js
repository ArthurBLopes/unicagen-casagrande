import { supabase } from "../lib/supabase"

const listarSalvos = async (id_usuario) => {
    const { data, error } = await supabase.from("salvos").select("*").eq("id_usuario", id_usuario)
    if (error) {
        console.error(error)
        return []
    }

    if (!data || data.length === 0) {
        console.log("Nenhum curso salvo encontrado.")
        return []
    }

    return data
}

const inserirSalvo = async (salvo) => {
    const { data, error } = await supabase
        .from("salvos")
        .insert(salvo)
        .select()
        .single()

    if (error) {
        console.error(error)
        return null
    }

    return data
}

const removerSalvo = async (id_usuario, id_treinamento) => {
    const { data, error } = await supabase.from("salvos").delete().eq("id_usuario", id_usuario).eq("id_treinamento", id_treinamento)
    if (error) {
        console.error(error)
        return null
    }
    return data
}

const listarTreinamentosSalvos = async (id_usuario) => {
    const { data, error } = await supabase
        .from("salvos")
        .select(`
            treinamentos (
                id,
                titulo,
                descricao,
                link_conteudo,
                link_material,
                data_publicacao,
                imagem,
                treinamentos_trilhas (
                    trilhas (
                        id,
                        titulo,
                        descricao,
                        cor
                    )
                )
            )
        `)
        .eq("id_usuario", id_usuario);

    if (error) {
        console.error(error);
        return [];
    }

    const treinamentosFormatados = data
        .map((item) => {
            const treinamento = item.treinamentos;
            if (!treinamento) return null;

            return {
                id: treinamento.id,
                titulo: treinamento.titulo,
                descricao: treinamento.descricao,
                link_conteudo: treinamento.link_conteudo,
                link_material: treinamento.link_material,
                data_publicacao: treinamento.data_publicacao,
                imagem: treinamento.imagem,
                tags: treinamento.tags,
                trilha: treinamento.treinamentos_trilhas?.[0]?.trilhas || null,
            };
        })
        .filter(Boolean);

    return treinamentosFormatados;
};

export { listarSalvos, inserirSalvo, removerSalvo, listarTreinamentosSalvos }