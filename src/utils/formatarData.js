export function formatarData(data) {
    const dia = new Date(data).getDay();
    const dias = Math.floor((new Date() - new Date(data)) / (1000 * 60 * 60 * 24));
    const mes = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date(data));
    const ano = new Date(data).getFullYear();
    return dias < 30 ? (dias === 0 ? "Hoje" : `${dias} dias atrás`) : `${dia} de ${mes} de ${ano}`;
}

export function formatarDataTabelas(data) {
    const dia = new Date(data).getDay();
    const dias = Math.floor((new Date() - new Date(data)) / (1000 * 60 * 60 * 24));
    const mes = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date(data));
    const ano = new Date(data).getFullYear();
    return dias === 0 ? "Hoje" : `${dia} de ${mes} de ${ano}`;
}

export function removerItensDuplicados(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
}

export function formatarUltimoAcesso(data) {
    if (!data) return { valor: "Não encontrado" };
    return { valor: data.slice(0, 10).split("-").reverse().join("/") };
}

export const hoje = new Date().toISOString().split("T")[0]



