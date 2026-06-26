import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../hooks/Auth/useAuth";

export default function Home() {

    const { user, sair, getNome } = useAuth();
    const [nome, setNome] = useState(getNome());

    return (
        <main style={{ padding: "40px" }}>
            <h1>Home UniCagen</h1>

            {user ? (
                <>
                    <p>Logado como: {user.email}</p>
                    <p>Logado como: {nome ? nome : "Não Identificado"}</p>
                    <button onClick={sair}>Sair</button>
                </>
            ) : (
                <p>Carregando usuário...</p>
            )}
        </main>
    );
}
