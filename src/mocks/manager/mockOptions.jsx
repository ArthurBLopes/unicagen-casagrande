import { UserRound, Tag, LibraryBig, GraduationCap } from "lucide-react";

export const opcoes = [
    {
        titulo: "TREINAMENTOS",
        icon: <LibraryBig />,
        caminho: "/gerenciar/treinamentos",
    },
    {
        titulo: "TRILHAS",
        icon: <GraduationCap />,
        caminho: "/gerenciar/trilhas",
    },
    {
        titulo: "TAGS",
        icon: <Tag />,
        caminho: "/gerenciar/tags",
    },
    {
        titulo: "USUÁRIOS",
        icon: <UserRound />,
        caminho: "/gerenciar/usuarios",
    }
]