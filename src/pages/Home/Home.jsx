export default function Home() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function carregarUsuario() {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        }

        carregarUsuario();
    }, []);

    async function sair() {
        await supabase.auth.signOut();
        window.location.href = "/login";
    }

    return (
        <main style={{ padding: "40px" }}>
            <h1>Home UniCagen</h1>

            {user ? (
                <>
                    <p>Logado como: {user.email}</p>
                    <button onClick={sair}>Sair</button>
                </>
            ) : (
                <p>Carregando usuário...</p>
            )}
        </main>
    );
}
