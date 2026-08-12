import styles from './ChipSelectField.module.css';
import { Trash, X } from "lucide-react"

export default function ChipSelectField({ opcoes, selecionados, onSelect, onRemove }) {
    return (
        <div className={styles.chipSelectField}>
            {opcoes.map((opcao) => (
                <div
                    key={opcao.id}
                    className={`${styles.chip} ${selecionados.includes(opcao) ? styles.chipSelecionado : ""}`}
                    onClick={() => onSelect(opcao)}
                >
                    {opcao.titulo}
                    {selecionados.includes(opcao) && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(opcao);
                            }}
                        ><X className={styles.iconeRemover} size={13} />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}