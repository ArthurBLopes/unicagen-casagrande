import styles from './ChipSelectField.module.css';
import { Trash, X } from "lucide-react"

export default function ChipSelectField({ opcoes, selecionados, onSelect, onRemove }) {
    return (
        <div className={styles.chipSelectField}>
            {opcoes.map((opcao) => {

                const estaSelecionado = selecionados.some((s) => s.id === opcao.id);
                
                return (
                    <div
                        key={opcao.id}
                        className={`${styles.chip} ${estaSelecionado ? styles.chipSelecionado : ""}`}
                        onClick={() => onSelect(opcao)}
                    >
                        {opcao.titulo}
                        {estaSelecionado && (
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
                )
            })}
        </div>
    );
}