import styles from "./ManagerUsers.module.css"
import { Info } from "lucide-react"

export default function ManagerUsers() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciar Usuários</h1>
                <p>Página de gerenciamento de usuários da plataforma, você pode atribuir permissão de administração conforme achar necessário.</p>
                <div className={styles.aviso}>
                    <Info size={16} /> 
                    <span>Colaboradores que nunca acessaram a nova Unicagen não aparecem nesta lista, pois o cadastro só é criado no primeiro login. Novas funcionalidades relacionadas
                        ao usuário serão inseridas nessa página conforme necessidade.
                    </span>
                </div>
            </main>
        </div>
    )
}