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
        treinamentos: trilha.treinamentos_trilhas.map((item) => item.treinamentos),
    }));

    const trilhaOnboarding = data.find((trilha) => trilha.titulo === "Onboarding");
    trilhasFormatadas.pop(trilhaOnboarding);
    trilhaOnboarding && trilhasFormatadas.unshift({
        id: trilhaOnboarding.id,
        titulo: trilhaOnboarding.titulo,
        descricao: trilhaOnboarding.descricao,
        treinamentos: trilhaOnboarding.treinamentos_trilhas.map((item) => item.treinamentos),
    });

    return trilhasFormatadas;
};

export { listarTreinamentosTrilhas, listarTreinamentosDaTrilha, listarTrilhasComTreinamentos };
