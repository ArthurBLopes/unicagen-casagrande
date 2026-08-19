import styles from "./Table.module.css"
import { Trash, SquarePen } from "lucide-react"

export default function Table({ loading, headers, dados, dadosFiltrados = [], columns, colunas, acoes }) {
    const gridColunas = columns || `repeat(${headers.length}, 1fr)`

    return (
        <>
            {loading ? (
                <p className={styles.carregando}>Carregando dados...</p>
            ) : dados.length === 0 ? (
                <div className={styles.tabela}>
                    <p className={styles.estadoVazio}>Nenhum dado para exibir.</p>
                </div>
            ) : (
                <div className={styles.tabela} style={{ "--tabela-colunas": gridColunas }}>
                    <div className={styles.tabelaCabecalho}>
                        {headers.map((header, i) => (
                            <span key={i}>{header}</span>
                        ))}
                    </div>
                    <div className={styles.tabelaCorpo}>
                        {dadosFiltrados.length > 0 ? dadosFiltrados.map((dado, i) => (
                            <div className={styles.linha} key={dado.id ?? i}>
                                {colunas(dado).map((coluna, j) => (
                                    <span key={j} className={coluna.className ?? styles.valor}>
                                        {coluna.valor}
                                    </span>
                                ))}

                                {acoes && (
                                    <div className={styles.acoes}>
                                        {acoes.onEditar && (
                                            <button className={styles.btn} onClick={() => acoes.onEditar(dado)}><SquarePen size={18} /></button>
                                        )}
                                        {acoes.onRemover && (
                                            <button className={styles.btnRemover} onClick={() => acoes.onRemover(dado)}><Trash size={18} /></button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )) : (
                            <p className={styles.estadoVazio}>Nenhum dado encontrado.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}