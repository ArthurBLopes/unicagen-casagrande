import { FaRegFolderOpen } from "react-icons/fa6";
import { RxOpenInNewWindow } from "react-icons/rx";
import styles from "./Trail.module.css";

export default function Trail({ trilha }) {
    return (
        <div className={styles.trailContainer}>
            <h2 className={styles.trailTitle}><FaRegFolderOpen size={24} className={styles.trailIcon} /> {trilha.titulo}</h2>
            <p className={styles.trailDescription}>{trilha.descricao}</p>
            <RxOpenInNewWindow size={20} className={styles.trailOpenIcon} />
        </div>
    )
}