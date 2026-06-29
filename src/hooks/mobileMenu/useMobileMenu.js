import { useEffect } from "react";

export function useMobileMenu(setMenuMobileAberto) {
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 768) {
                setMenuMobileAberto(false);
            } else {
                setMenuMobileAberto(false);
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
}