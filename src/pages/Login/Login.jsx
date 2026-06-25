import style from "./Login.module.css"
import LogoBranco from "../../assets/logos/horizontal/Logo_Cagen_Horiz__Verde_Escuro_e_Branco.png"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaVisivel, setSenhaVisivel] = useState(false)

    function alternarVisibilidadeSenha() {
        setSenhaVisivel(!senhaVisivel)
    }

    return (
        <>
            <div className={style.loginContainer}>
                <img className={style.logo} src={LogoBranco} alt="Logo Unicagen" />
                <h1 className={style.tituloPlataforma}>UNICAGEN</h1>
                <h4 className={style.subtituloPlataforma}>Casagrande Engenharia</h4>

                <div className={style.loginCard}>
                    <h2 className={style.tituloEntrar}>Entrar</h2>
                    <p className={style.descricaoEntrar}>Digite suas credenciais para acessar o portal</p>

                    <form className={style.loginForm}>
                        <label className={style.rotuloCampo} htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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

                        <button type="submit" className={style.botaoEntrar}>Entrar</button>

                        <div className={style.divisorOu}>
                            <span>ou</span>
                        </div>

                        <button type="button" className={style.botaoMicrosoft}>
                            <img src="https://cdn-icons-png.flaticon.com/512/732/732221.png" alt="Logo Microsoft" className={style.logoMicrosoft} />
                            Entrar com Microsoft
                        </button>
                    </form>
                </div>

                <p className={style.textoAcessoConvite}>Acesso apenas por convite</p>
            </div>
        </>
    )
}