import { useEffect, useState } from "react";
import { listarTrilhasDoTreinamento } from "../../services/treinamentosTrilhasService";

export function useTrilhasDoTreinamento(id_treinamento) {
    const [trilhasDoCurso, setTrilhasDoCurso] = useState([]);
    const [erroCarregamento, setErroCarregamento] = useState(false);

    useEffect(() => {
        if (!id_treinamento) {
            setTrilhasDoCurso([]);
            return;
        }

        const carregar = async () => {
            try {
                const dados = await listarTrilhasDoTreinamento(id_treinamento);
                setTrilhasDoCurso(Array.isArray(dados) ? dados : []);
                setErroCarregamento(false);
            } catch (error) {
                console.error("Erro ao carregar trilhas do treinamento:", error);
                setTrilhasDoCurso([]);
                setErroCarregamento(true);
            }
        };
        carregar();
    }, [id_treinamento]);

    return { trilhasDoCurso, erroCarregamento };
}