import html2canvas from "html2canvas";

export const capturarGrafico = async (elemento) => {
    if (!elemento) {
        throw new Error("Elemento do gráfico não encontrado.");
    }

    const canvas = await html2canvas(elemento, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
    });

    return canvas.toDataURL("image/png");
};