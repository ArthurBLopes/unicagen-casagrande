import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/auth/useAuth';
import styles from './Profile.module.css'
import { buscarDataCriacaoContaMicrosoft } from '../..//services/microsoftGraph';
import { Calendar } from "lucide-react";

export default function Profile() {
    const { user } = useAuth();
    const nome = user?.user_metadata?.full_name || "Não Identificado";
    const email = user?.email || "Email não encontrado";
    const inicial = nome.split(" ")[0]?.charAt(0).toUpperCase() || "N";
    const [dataCriacaoConta, setDataCriacaoConta] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await buscarDataCriacaoContaMicrosoft();
            setDataCriacaoConta(data);
        }
        fetchData();
    }, []);

    const data = dataCriacaoConta ? new Date(dataCriacaoConta) : null;
    const nomeMes = data ? new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(data) : null;
    const ano = data ? data.getFullYear() : null;

    return (
        <div>
            <h1 className={styles.profileTitle}>Perfil do Usuário</h1>
            <div className={styles.profileContainer}>
                <p className={styles.profileImg}>{inicial}</p>
                <p className={styles.profileWelcome}>Welcome, {nome}!</p>
                <p className={styles.profileEmail}>{email}</p>
                <p className={styles.profileAccess}><Calendar size={16} /> Acesso autorizado desde {nomeMes} de {ano}</p>
            </div>
        </div>
    )
}