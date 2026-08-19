import { listarTreinamentos } from "../../services/treinamentosService";
import { useCallback, useEffect, useState } from "react";

export function useTreinamentos() {
    const [treinamentos, setTreinamentos] = useState([]);
    const [erroCarregamento, setErroCarregamento] = useState(false);
    const [loading, setLoading] = useState(true);

    const carregarTreinamentos = useCallback(async () => {
        try {
            setLoading(true);

            const dados = await listarTreinamentos();

            setTreinamentos(
                Array.isArray(dados) ? dados : []
            );

            setErroCarregamento(false);
        } catch (error) {
            console.error(
                "Erro ao carregar treinamentos:",
                error
            );

            setTreinamentos([]);
            setErroCarregamento(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        carregarTreinamentos();
    }, [carregarTreinamentos]);

    return {
        treinamentos,
        erroCarregamento,
        loading,
        recarregarTreinamentos: carregarTreinamentos
    };
}