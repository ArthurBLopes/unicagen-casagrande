import { useEffect, useState } from "react";
import { listarTagsTreinamento } from "../../services/tagsService";

export function useTagsDoTreinamento(id_treinamento) {
    const [tagsDoCurso, setTagsDoCurso] = useState([]);
    const [erroCarregamento, setErroCarregamento] = useState(false);

    useEffect(() => {
        if (!id_treinamento) {
            setTagsDoCurso([]);
            return;
        }

        const carregar = async () => {
            try {
                const dados = await listarTagsTreinamento(id_treinamento);
                setTagsDoCurso(Array.isArray(dados) ? dados : []);
                setErroCarregamento(false);
            } catch (error) {
                console.error("Erro ao carregar trilhas do treinamento:", error);
                setTagsDoCurso([]);
                setErroCarregamento(true);
            }
        };
        carregar();
    }, [id_treinamento]);

    return { tagsDoCurso, erroCarregamento };
}