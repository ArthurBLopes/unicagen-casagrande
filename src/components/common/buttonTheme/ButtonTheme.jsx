import { useState } from "react"
import { Sun, Moon } from "lucide-react"
import style from "./ButtonTheme.module.css"
import { toggleTheme } from "../../../hooks/theme/useTheme"

export default function ButtonTheme() {
    const [temaEscuro, setTemaEscuro] = useState(
        document.documentElement.getAttribute("data-theme") === "dark"
    )

    function alternarTema() {
        toggleTheme()
        setTemaEscuro((atual) => !atual)
    }

    return (
        <button
            type="button"
            className={style.botaoAlternarTema}
            onClick={alternarTema}
            aria-label="Alternar tema">
            {temaEscuro ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    )
}