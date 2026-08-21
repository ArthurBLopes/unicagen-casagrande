import { listarTags, listarTagsTreinamento, listarTagsTreinamentos } from "../../services/tagsService";
import { useEffect, useState, useCallback } from "react";

export function useTags(id_treinamento) {
    const [tags, setTags] = useState([]);
    const [tagsTreinamentos, setTagsTreinamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erroCarregamento, setErroCarregamento] = useState(false);

    const carregarTags = useCallback(async () => {
        try {
            const data = await listarTags();
            setTags(data);
            setErroCarregamento(false);
        } catch (error) {
            console.error("Erro ao carregar tags:", error);
            setTags([]);
            setErroCarregamento(true);
        }
    }, [])

    const carregarTagsTreinamento = useCallback(async () => {
        try {
            const data = await listarTagsTreinamentos();
            setTagsTreinamentos(data);
            setErroCarregamento(false);
        } catch (error) {
            console.error("Erro ao carregar tags do treinamento:", error);
            setTagsTreinamentos([]);
            setErroCarregamento(true);
        }
    }, [])

    useEffect(() => {
        setLoading(true);
        Promise.all([carregarTagsTreinamento(), carregarTags()]).finally(() => setLoading(false));
    }, [carregarTagsTreinamento, carregarTags]);

    return { tags, tagsTreinamentos, loading, erroCarregamento, recarregarTags: carregarTags };
}