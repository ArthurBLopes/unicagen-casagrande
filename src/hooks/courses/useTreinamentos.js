import { listarTreinamentos } from "../../services/treinamentosService";
import { useEffect, useState } from "react";

export function useTreinamentos() {
    const [treinamentos, setTreinamentos] = useState([]);
    const [erroCarregamento, setErroCarregamento] = useState(false);

    useEffect(() => {
        const carregarTreinamentos = async () => {
            try {
                const dados = await listarTreinamentos();
                setTreinamentos(Array.isArray(dados) ? dados : []);
                setErroCarregamento(false);
            } catch (error) {
                console.error("Erro ao carregar treinamentos:", error);
                setTreinamentos([]);
                setErroCarregamento(true);
            }
        };

        carregarTreinamentos();
    }, []);

    return { treinamentos, erroCarregamento };
}