import styles from "./Contact.module.css"
import { IoMdMail } from "react-icons/io";
import { MdLightbulb } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Contact() {
    return (
        <>
            <div className={styles.containerPage}>
                <h1 className={styles.titulo}>Central de Ajuda / Sugestões de aula</h1>
                <p className={styles.texto}>Se você tiver alguma dúvida, sugestão ou feedback sobre o nosso site, por favor, entre em contato conosco ou procure ajuda através dos tópicos disponíveis.</p>
                <div className={styles.containerSugestao}>
                    <MdLightbulb size={30} className={styles.iconeIdeia} />
                    <h2 className={styles.subtitulo}>Envie sua sugestão</h2>
                    <p>Tem ideias de temas ou conteúdos que gostaria de ver na UniCagen? Adoraríamos ouvir suas sugestões!
                        Envie suas ideias e ajude a construir trilhas ainda mais relevantes para o seu desenvolvimento.</p>
                    <p><IoMdMail size={10} /> Envie para <a className={styles.email} href="mailto:rh@cagen.com.br">rh@cagen.com.br</a> ou <a className={styles.email} href="mailto:unicagen@cagen.com.br">unicagen@cagen.com.br</a></p>
                </div>
                
            </div>
        </>
    )
}