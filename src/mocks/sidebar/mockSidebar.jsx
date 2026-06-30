import { RiHome9Line } from "react-icons/ri";
import { MdWebStories, MdFavoriteBorder } from "react-icons/md";
import { GrContact } from "react-icons/gr";
import { TbWorldWww } from "react-icons/tb";
import LogoCagen from "../../assets/logos/escudos/escudo_cagen.png";

export const opcoes = [
        {
            titulo: "INÍCIO",
            icon: <RiHome9Line size={25} />,
            caminho: "/home",

        },
        {
            titulo: "TRILHAS DE APRENDIZADO",
            icon: <MdWebStories size={25} />,
            caminho: "/trilhas",
        },
        {
            titulo: "FAVORITOS",
            icon: <MdFavoriteBorder size={25} />,
            caminho: "/favoritos",
        },
        {
            titulo: "AJUDA E SUGESTÕES",
            icon: <GrContact size={25} />,
            caminho: "/contact",
        },
        {
            titulo: "CAGEN",
            icon: <TbWorldWww size={25} />,
            caminho: "https://cagen.com.br/",
        },
    ];