import styles from "./SearchSortToolbar.module.css";
import { ArrowUpAZ, ClockArrowUp, Search } from "lucide-react";

export default function SearchSortToolbar({ pesquisa, onPesquisaChange, opcaoOrdenar, onOrdenar, placeholder = "Buscar conteúdos..." }) {
    return (
        <div className={styles.searchArea}>
            <div className={styles.searchBox}>
                <Search size={18} />
                <input type="text" placeholder={placeholder} value={pesquisa} onChange={(e) => onPesquisaChange(e.target.value)} />
            </div>
            {onOrdenar && <button className={styles.botaoOrdenador} onClick={onOrdenar}>
                {opcaoOrdenar ? <span>Ordenar por data <ClockArrowUp /></span> : <span>Ordenar por ordem alfabética <ArrowUpAZ /></span>}
            </button>}
        </div>
    );
}
