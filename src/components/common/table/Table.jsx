import styles from "./Table.module.css"

export default function Table({ loading, headers, dados, dadosFiltrados = [], Card }) {
    return (
        <>
            {loading ? (
                <p className={styles.carregando}>Carregando dados...</p>
            ) : dados.length === 0 ? (
                <div className={styles.tabela}>
                    <p className={styles.estadoVazio}>Nenhum dado para exibir.</p>
                </div>
            ) : (
                <div className={styles.tabela}>
                    <div className={styles.tabelaCabecalho}>
                        {headers.map((header, i) => (
                            <span key={i}>{header}</span>
                        ))}
                    </div>
                    <div className={styles.tabelaCorpo}>
                        {dadosFiltrados.length > 0 ? dadosFiltrados.map((dado, i) => (
                            Card && <Card key={i} registro={dado} />
                        )) : (
                            <p className={styles.estadoVazio}>Nenhum dado encontrado.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}