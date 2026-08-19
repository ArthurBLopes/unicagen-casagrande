import styles from "./ConfirmModal.module.css";
import { TriangleAlert } from "lucide-react";

export default function ConfirmModal({mensagem,onCancelar,onConfirmar}) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.icone}>
                    <TriangleAlert size={22} />
                </div>

                <h1>Confirmação de Exclusão</h1>

                <p className={styles.mensagem}>{mensagem}</p>
                <p className={styles.aviso}>Esta ação não poderá ser desfeita.</p>

                <div className={styles.acoes}>
                    <button type="button" className={styles.botaoCancelar} onClick={onCancelar}>Cancelar</button>
                    <button type="button" className={styles.botaoExcluir} onClick={onConfirmar}>Excluir</button>
                </div>
            </div>
        </div>
    );
}