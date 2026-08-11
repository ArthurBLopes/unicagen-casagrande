import styles from './ChipSelectField.module.css';

export default function ChipSelectField({ opcoes, selecionados, onSelect, onRemove }) {
    return (
        <div className={styles.chipSelectField}>
            {opcoes.map((opcao) => (
                <div
                    key={opcao.id}
                    className={styles.chip}
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
                        >
                            &times;
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}