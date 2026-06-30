import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../hooks/auth/useAuth";
import Sidebar from "../../components/common/sidebar/Sidebar";
import styles from "./Home.module.css";

export default function Home() {

    const { user, sair } = useAuth();
    const nome = user?.user_metadata?.full_name || "Não Identificado";
    const primeiroNome = nome.split(" ")[0];

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h2>Olá, {primeiroNome}</h2>
                <p>Bem-vindo(a) à plataforma de aprendizado da <span className={styles.titulo}>Universidade Casagrande</span>! 
                Explore as trilhas de aprendizado, descubra novos conteúdos e aproveite ao máximo sua jornada.</p>
            </main>
        </div>
    );
}
