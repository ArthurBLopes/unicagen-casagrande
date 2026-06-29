import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../hooks/auth/useAuth";
import Sidebar from "../../components/common/sidebar/Sidebar";
import styles from "./Home.module.css";

export default function Home() {

    const { user, sair, getNome } = useAuth();
    const [nome, setNome] = useState(getNome());

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Home UniCagen</h1>

                {user ? (
                    <>
                        <p>Logado como: {user.email}</p>
                        <p>Logado como: {nome ? nome : "Não Identificado"}</p>
                        <button onClick={sair}>Sair</button>
                    </>
                ) : (
                    <p>Carregando usuário...</p>
                )}
            </main>
        </div>
    );
}
