import styles from "./Contact.module.css"
import { IoMdMail } from "react-icons/io";
import { MdLightbulb } from "react-icons/md";
import { Link } from "react-router-dom";
//import { helpContent } from "../../mocks/helpCenter/helpCenter";
import { useState } from "react";

export const helpContent = {
    "conta-acesso": {
        title: "Conta e Acesso",
        questions: [
            {
                question: "Como criar uma conta?",
                answer:
                    "Clique em 'Cadastre-se' no canto superior direito, preencha seus dados e conclua o cadastro."
            },
            {
                question: "Como recuperar minha senha?",
                answer:
                    "Na tela de login, clique em 'Esqueci minha senha' e siga as instruções enviadas para seu e-mail."
            },
            {
                question: "Como alterar meus dados?",
                answer:
                    "Acesse seu perfil e utilize a opção 'Editar Perfil' para atualizar suas informações."
            }
        ]
    },

    "suporte-tecnico": {
        title: "Suporte Técnico",
        questions: [
            {
                question: "Problemas de carregamento",
                answer:
                    "Verifique sua conexão com a internet e tente atualizar a página."
            },
            {
                question: "Erro ao acessar páginas",
                answer:
                    "Limpe o cache do navegador ou tente acessar novamente mais tarde."
            },
            {
                question: "Problemas de login",
                answer:
                    "Confirme seus dados de acesso ou utilize a recuperação de senha."
            }
        ]
    }
};

export default function Contact() {

    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (question) => {
        setOpenQuestion(openQuestion === question ? null : question);
    };

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
                {helpContent && Object.entries(helpContent).map(([key, section]) => (
                    <div key={key} className={styles.containerAjuda}>
                        <h2 className={styles.subtitulo}>{section.title}</h2>
                        {section.questions.map((item, index) => (
                            <div key={index} className={styles.pergunta}>
                                <button className={styles.perguntaTitulo} onClick={() => toggleQuestion(item.question)}>{item.question}</button>
                                {openQuestion === item.question && <p className={styles.perguntaResposta}>{item.answer}</p>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}