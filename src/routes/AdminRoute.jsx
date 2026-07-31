import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

//comentário para eu lembrar depois: Login é a porta. ProtectedRoute é o segurança conferindo se a pessoa realmente passou pela porta.
// Outlet é o espaço onde a rota protegida mostra a página que o usuário tentou acessar.

export default function AdminRoute() {
    const { isAdmin, loading } = useAuth();

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!isAdmin) {
        return <Navigate to="/inicio" replace />;
    }

    return <Outlet />;
}