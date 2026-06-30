import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../hooks/auth/useAuth";
import Sidebar from "../../components/common/sidebar/Sidebar";
import styles from "./Home.module.css";

export default function Home() {

    const { user, sair } = useAuth();
    const nome = user?.user_metadata?.full_name || "Não Identificado";

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>UNIVERSIDADE CASAGRANDE</h1>
            </main>
        </div>
    );
}
