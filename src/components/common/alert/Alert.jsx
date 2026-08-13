import styles from "./Alert.module.css"
import { Info } from "lucide-react"

export default function Alert({ mensagem }) {
    return (
        <div className={styles.aviso}>
            <Info size={16} />
            <span>{mensagem}</span>
        </div>
    )
}