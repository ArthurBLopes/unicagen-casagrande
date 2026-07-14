import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/auth/useAuth';
import styles from './Profile.module.css'
import { buscarDataCriacaoContaMicrosoft } from '../..//services/microsoftGraph';
import { Calendar } from "lucide-react";
import { listarUsuarios } from '../../services/usuariosService';

export default function Profile() {
    const { user } = useAuth();
    const nome = user?.user_metadata?.full_name || "Não Identificado";
    const email = user?.email || "Email não encontrado";
    const inicial = nome.split(" ")[0]?.charAt(0).toUpperCase() || "N";
    const [dataCriacaoConta, setDataCriacaoConta] = useState(null);
    const [funcao, setFuncao] = useState(null);

    const usuarios = listarUsuarios();
    console.log(usuarios);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await buscarDataCriacaoContaMicrosoft();
                setDataCriacaoConta(data);
            } catch (err) {
                console.warn("Não foi possível buscar data de criação da conta:", err.message);
            }
        }
        fetchData();
    }, []);

    const data = dataCriacaoConta ? new Date(dataCriacaoConta) : null;
    const nomeMes = data ? new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(data) : null;
    const ano = data ? data.getFullYear() : null;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Perfil do Usuário</h1>
            <div className={styles.card}>
                <div className={styles.avatar} aria-hidden="true">{inicial}</div>
                <div className={styles.userInfo}>
                    <p className={styles.name}>{nome}</p>
                    <p className={styles.typeUser}>MEMBRO</p>
                </div>
                <p className={styles.company}>Você é colaborador da <span className={styles.companyName}>Casagrande Engenharia</span>.</p>
                <p className={styles.email}>{email}</p>
                <div className={styles.divider} />
                <p className={styles.access}><Calendar size={15} /> Acesso autorizado desde {nomeMes} de {ano}</p>
            </div>
        </div>
    )
}