import style from "./Login.module.css"
import { useState } from "react"
import { Eye, EyeOff, Sun, Moon } from "lucide-react"
import { useThemeLogos, toggleTheme } from "../../hooks/theme/useTheme"
import { useAuth } from "../../hooks/auth/useAuth";
import ButtonTheme from "../../components/common/buttonTheme/ButtonTheme";

export default function Login() {
    const { logoAtual } = useThemeLogos();
    const { loginComMicrosoft } = useAuth();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaVisivel, setSenhaVisivel] = useState(false)

    function alternarVisibilidadeSenha() {
        setSenhaVisivel(!senhaVisivel)
    }


    return (
        <>
            <div className={style.loginContainer}>
                <ButtonTheme />

                <img className={style.logo} src={logoAtual} alt="Logo Unicagen" />
                <h1 className={style.tituloPlataforma}>UNICAGEN</h1>
                <h4 className={style.subtituloPlataforma}>Casagrande Engenharia</h4>
                <div className={style.loginCard}>
                    <h2 className={style.tituloEntrar}>Entrar</h2>
                    <p className={style.descricaoEntrar}>Digite suas credenciais para acessar o portal</p>

                    <form className={style.loginForm} onSubmit={(e) => e.preventDefault()}>
                        <button
                            type="button"
                            className={style.botaoMicrosoft}
                            onClick={(e) => {
                                e.preventDefault();
                                loginComMicrosoft();
                            }}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/732/732221.png"
                                alt="Logo Microsoft"
                                className={style.logoMicrosoft}
                            />
                            Entrar com Microsoft
                        </button>
                        <div className={style.divisorOu}><span>ou</span></div>
                        <label className={style.rotuloCampo} htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled
                        />

                        <div className={style.linhaSenha}>
                            <label className={style.rotuloCampo} htmlFor="senha">Senha</label>
                            <a className={style.linkEsqueciSenha} href="#">Esqueci minha senha</a>
                        </div>
                        <div className={style.campoSenhaContainer}>
                            <input
                                id="senha"
                                type={senhaVisivel ? "text" : "password"}
                                placeholder="••••••••"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                disabled
                            />
                            <button
                                type="button"
                                className={style.botaoMostrarSenha}
                                onClick={alternarVisibilidadeSenha}
                                aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {senhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button type="submit" className={style.botaoEntrar} disabled>
                            Entrar
                        </button>
                    </form>
                </div>

                <p className={style.textoAcessoConvite}>Acesso apenas por autenticação Microsoft</p>
            </div>
        </>
    )
}