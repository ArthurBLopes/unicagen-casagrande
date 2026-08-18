import { listarTags, listarTagsTreinamento, listarTagsTreinamentos } from "../../services/tagsService";
import { useEffect, useState } from "react";

export function useTags(id_treinamento) {
    const [tags, setTags] = useState([]);
    const [tagsTreinamentos, setTagsTreinamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erroCarregamento, setErroCarregamento] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            setErroCarregamento(false);
            try {
                const data = await listarTags();
                setTags(data);
            } catch (error) {
                setErroCarregamento(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    useEffect(() => {
        const fetchTagsTreinamentos = async () => {
            setLoading(true);
            setErroCarregamento(false);
            try {
                const data = await listarTagsTreinamentos();
                setTagsTreinamentos(data);
            } catch (error) {
                setErroCarregamento(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTagsTreinamentos();
    }, []);

    return { tags, tagsTreinamentos, loading, erroCarregamento };
}