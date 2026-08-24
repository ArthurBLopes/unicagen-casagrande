import { useEffect, useState } from "react";
import { listarAtividadeUsuarios, listarEngajamentoPlataforma, listarUsuariosQueAcessaramNovaUnicagen, listarEngajamentoTreinamentos } from "../../services/metrics/resumoMetricas";

export function useMetricasDashboard() {
    const [atividadeUsuarios, setAtividadeUsuarios] = useState([]);
    const [engajamentoPlataforma, setEngajamentoPlataforma] = useState([]);
    const [acessaramNovaUnicagen, setAcessaramNovaUnicagen] = useState(0);
    const [engajamentoTreinamentos, setUsuariosEngajamentoTreinamentos] = useState([]);

    const [loadingAtividadeUsuarios, setLoadingAtividadeUsuarios] = useState(false);
    const [loadingEngajamentoPlataforma, setLoadingEngajamentoPlataforma] = useState(false);
    const [loadingAcessaramNovaUnicagen, setLoadingAcessaramNovaUnicagen] = useState(false);
    const [loadingUsuariosEngajamentoTreinamentos, setLoadingUsuariosEngajamentoTreinamentos] = useState(false);

    const [erroCarregamento, setErroCarregamento] = useState(false);

    useEffect(() => {
        const fetchAtividadeUsuarios = async () => {
            setLoadingAtividadeUsuarios(true);
            setErroCarregamento(false);
            try {
                const data = await listarAtividadeUsuarios();
                setAtividadeUsuarios(data);
            } catch (error) {
                setErroCarregamento(true);
            } finally {
                setLoadingAtividadeUsuarios(false);
            }
        };

        fetchAtividadeUsuarios();
    }, []);

    useEffect(() => {
        const fetchEngajamentoPlataforma = async () => {
            setLoadingEngajamentoPlataforma(true);
            setErroCarregamento(false);
            try {
                const data = await listarEngajamentoPlataforma();
                setEngajamentoPlataforma(data);
            } catch (error) {
                setErroCarregamento(true);
            } finally {
                setLoadingEngajamentoPlataforma(false);
            }
        };

        fetchEngajamentoPlataforma();
    }, []);

        useEffect(() => {
        const fetchAcessaramNovaUnicagen = async () => {
            setLoadingAcessaramNovaUnicagen(true);
            setErroCarregamento(false);
            try {
                const data = await listarUsuariosQueAcessaramNovaUnicagen();
                setAcessaramNovaUnicagen(data);
            } catch (error) {
                setErroCarregamento(true);
            } finally {
                setLoadingAcessaramNovaUnicagen(false);
            }
        };

        fetchAcessaramNovaUnicagen();
    }, []);

    useEffect(() => {
        const fetchEngajamentoTreinamentos = async () => {
            setLoadingUsuariosEngajamentoTreinamentos(true);
            setErroCarregamento(false);
            try {
                const data = await listarEngajamentoTreinamentos();
                setUsuariosEngajamentoTreinamentos(data);
            } catch (error) {
                setErroCarregamento(true);
            } finally {
                setLoadingUsuariosEngajamentoTreinamentos(false);
            }
        };

        fetchEngajamentoTreinamentos();
    }, []);

    return { atividadeUsuarios, engajamentoPlataforma, acessaramNovaUnicagen, engajamentoTreinamentos };
}