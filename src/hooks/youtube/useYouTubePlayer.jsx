import { useEffect, useRef } from "react";

const YOUTUBE_API_URL = "https://www.youtube.com/iframe_api";
const INTERVALO_PROGRESSO = 5000;

function carregarApiYouTube() {
    return new Promise((resolve) => {
        if (window.YT?.Player) {
            resolve(window.YT);
            return;
        }

        if (!document.querySelector(`script[src="${YOUTUBE_API_URL}"]`)) {
            const script = document.createElement("script");
            script.src = YOUTUBE_API_URL;
            document.body.appendChild(script);
        }

        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    });
}

export function useYouTubePlayer(videoId, { onStart, onProgress, onEnded } = {}) {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const intervaloRef = useRef(null);
    const iniciouRef = useRef(false);

    useEffect(() => {
        if (!videoId) return;

        let ativo = true;
        iniciouRef.current = false;

        carregarApiYouTube().then((YT) => {
            if (!ativo || !containerRef.current) return;

            playerRef.current = new YT.Player(containerRef.current, {
                videoId,
                playerVars: { rel: 0, origin: window.location.origin },
                events: {
                    onStateChange: (event) => {
                        clearInterval(intervaloRef.current);

                        if (event.data === YT.PlayerState.PLAYING) {
                            if (!iniciouRef.current) {
                                iniciouRef.current = true;
                                onStart?.(playerRef.current.getDuration());
                            }

                            intervaloRef.current = setInterval(() => {
                                onProgress?.(playerRef.current.getCurrentTime(), playerRef.current.getDuration());
                            }, INTERVALO_PROGRESSO);
                        }

                        if (event.data === YT.PlayerState.ENDED) {
                            onEnded?.(playerRef.current.getDuration());
                        }
                    }
                }
            });
        });

        return () => {
            ativo = false;
            clearInterval(intervaloRef.current);
            playerRef.current?.destroy();
            playerRef.current = null;
        };
    }, [videoId]);

    return { containerRef, player: playerRef };
}
