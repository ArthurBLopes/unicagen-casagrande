export function getYouTubeEmbedUrl(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&?/]+)/;
    const match = url.match(regex);

    if (!match) return "";

    return `https://www.youtube.com/embed/${match[1]}`;
} 