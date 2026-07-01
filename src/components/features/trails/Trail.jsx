import { FaRegFolderOpen } from "react-icons/fa6";
import { RxOpenInNewWindow } from "react-icons/rx";
import styles from "./Trail.module.css";

export default function Trail({ trilha }) {
    return (
        <div
            className={styles.trailContainer}
            style={{ "--trail-color": trilha.cor || "var(--text-color2)" }}
        >
            <div className={styles.trailHeader}>
                <span className={styles.iconBox}>
                    <FaRegFolderOpen size={20} className={styles.trailIcon} />
                </span>

                <h2 className={styles.trailTitle}>{trilha.titulo}</h2>
            </div>

            <p className={styles.trailDescription}>{trilha.descricao}</p>

            <div className={styles.trailFooter}>
                <span>Ver trilha</span>
                <RxOpenInNewWindow size={18} className={styles.trailOpenIcon} />
            </div>
        </div>
    );
}