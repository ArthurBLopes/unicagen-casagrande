import { listarTrilhasComTreinamentos, listarTrilhas } from "../../services/treinamentosTrilhasService";
import { useEffect, useState } from "react";

export function useTrilhasComTreinamentos() {
    const [trilhasComTreinamentos, setTrilhasComTreinamentos] = useState([]);
    const [trilhas, setTrilhas] = useState([]);
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

    useEffect(() => {
        const carregarTrilhas = async () => {
            try {
                const dados = await listarTrilhas();
                setTrilhas(dados);
                setErroCarregamento(false);
            } catch (error) {
                console.error("Erro ao carregar trilhas:", error);
                setTrilhasComTreinamentos([]);
                setErroCarregamento(true);
            }
        };

        carregarTrilhas();
    }, []);

    return { trilhasComTreinamentos, trilhas, erroCarregamento };
}