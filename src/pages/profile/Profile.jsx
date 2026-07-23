import { useState, useEffect } from 'react'
import { useAuth } from '../../providers/AuthContext';
import styles from './Profile.module.css'
import { buscarDataCriacaoContaMicrosoft } from '../..//services/microsoftGraph';
import { Calendar } from "lucide-react";
import { buscarUsuarioPorId } from '../../services/usuariosService';

export default function Profile() {
    const { usuario, session } = useAuth();
    const id_usuario = usuario?.id || "ID não encontrado";
    const [dataCriacaoConta, setDataCriacaoConta] = useState(null);
    const [usuarioData, setUsuarioData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await buscarDataCriacaoContaMicrosoft(session);
                setDataCriacaoConta(data);
            } catch (err) {
                console.warn("Não foi possível buscar data de criação da conta:", err.message);
            }
        }
        if (session) {
            fetchData();
        }
    }, [session]);

    useEffect(() => {
        async function fetchCargo() {
            try {
                const usuarioDb = await buscarUsuarioPorId(id_usuario);
                if (usuarioDb) {
                    setUsuarioData(usuarioDb);
                }
            } catch (err) {
                console.warn("Não foi possível buscar o cargo do usuário:", err.message);
            }
        }
        fetchCargo();
    }, [id_usuario]);

    const inicial = usuarioData?.nome?.split(" ")[0]?.charAt(0).toUpperCase() || "N";
    const nome = usuarioData?.nome || "Nome não encontrado";
    const email = usuarioData?.email || "Email não encontrado";
    const cargo = usuarioData?.regra || "ND";
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
                    <p className={styles.typeUser}>{cargo}</p>
                </div>
                <p className={styles.company}>Você é colaborador da <span className={styles.companyName}>Casagrande Engenharia</span>.</p>
                <p className={styles.email}>{email}</p>
                <div className={styles.divider} />
                <p className={styles.access}><Calendar size={15} /> Acesso autorizado desde {nomeMes} de {ano}</p>
            </div>
        </div>
    )
}