import { useNavigate } from "react-router-dom";
import styles from "./BackPage.module.css";
import { CircleArrowLeft } from "lucide-react";

export default function BackPage() {

    const navigate = useNavigate();

    return (
        <div className={styles.backContainer}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                <CircleArrowLeft size={24} />
            </button>
        </div>
    )
}