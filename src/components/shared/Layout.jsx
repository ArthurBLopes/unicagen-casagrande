import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Sidebar from "../common/sidebar/Sidebar";
import { useThemeLogos, toggleTheme } from "../../hooks/theme/useTheme";
import { useState } from "react";
import ButtonTheme from "../../components/common/buttonTheme/ButtonTheme";

export default function Layout() {

    const [temaEscuro, setTemaEscuro] = useState(document.documentElement.getAttribute("data-theme") === "dark")

    function alternarTema() {
        toggleTheme()
        setTemaEscuro((atual) => !atual)
    }

    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <main className={styles.conteudoPrincipal}>
                <ButtonTheme />
                <Outlet />
            </main>
        </div>
    );
}