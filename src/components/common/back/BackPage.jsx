import { useNavigation } from "react-router-dom";
import styles from "./Back.module.css";
import { MdArrowBackIos } from "react-icons/md";

export default function BackPage() {

    const navigation = useNavigation()

    return (
        <div className={styles.backContainer}>
            <button className={styles.backButton} onClick={() => navigation.pop()}>
                <MdArrowBackIos size={24} /> Voltar
            </button>
        </div>
    )
}