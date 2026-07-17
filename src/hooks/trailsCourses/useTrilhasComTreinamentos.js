import { listarTrilhasComTreinamentos } from "../../services/treinamentosTrilhasService";
import { useEffect, useState } from "react";

export function useTrilhasComTreinamentos() {
    const [trilhasComTreinamentos, setTrilhasComTreinamentos] = useState([]);
    const [erroCarregamento, setErroCarregamento] = useState(false);

    useEffect(() => {
        const carregarTrilhasComTreinamentos = async () => {
            try {
                const dados = await listarTrilhasComTreinamentos();
                setTrilhasComTreinamentos(Array.isArray(dados) ? dados : []);
                setErroCarregamento(false);
            } catch (error) {
                console.error("Erro ao carregar trilhas com treinamentos:", error);
                setTrilhasComTreinamentos([]);
                setErroCarregamento(true);
            }
        };

        carregarTrilhasComTreinamentos();
    }, []);

    return { trilhasComTreinamentos, erroCarregamento };
}