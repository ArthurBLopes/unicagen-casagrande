import { useEffect, useState } from "react";
import { listarUsuarios } from "../../services/usuariosService";

export function useUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoadingUsuarios(true);
            const dados = await listarUsuarios();
            setUsuarios(dados);
            setLoadingUsuarios(false);
        };

        fetchUsuarios();
    }, []);

    return { usuarios, loadingUsuarios };
}
