import { listarTrilhasComTreinamentos, listarTrilhas } from "../../services/treinamentosTrilhasService";
import { useCallback, useEffect, useState } from "react";

export function useTrilhasComTreinamentos() {
    const [trilhasComTreinamentos, setTrilhasComTreinamentos] = useState([]);
    const [trilhas, setTrilhas] = useState([]);
    const [erroCarregamento, setErroCarregamento] = useState(false);
    const [loading, setLoading] = useState(true);

    const carregarTrilhasComTreinamentos = useCallback(async () => {
        try {
            const dados = await listarTrilhasComTreinamentos();
            setTrilhasComTreinamentos(Array.isArray(dados) ? dados : []);
            setErroCarregamento(false);
        } catch (error) {
            console.error("Erro ao carregar trilhas com treinamentos:", error);
            setTrilhasComTreinamentos([]);
            setErroCarregamento(true);
        }
    }, []);

    const carregarTrilhas = useCallback(async () => {
        try {
            const dados = await listarTrilhas();
            setTrilhas(Array.isArray(dados) ? dados : []);
            setErroCarregamento(false);
        } catch (error) {
            console.error("Erro ao carregar trilhas:", error);
            setTrilhas([]);
            setErroCarregamento(true);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        Promise.all([carregarTrilhasComTreinamentos(), carregarTrilhas()])
            .finally(() => setLoading(false));
    }, [carregarTrilhasComTreinamentos, carregarTrilhas]);

    return {
        trilhasComTreinamentos,
        trilhas,
        erroCarregamento,
        loading,
        recarregarTrilhas: carregarTrilhas,
    };
}