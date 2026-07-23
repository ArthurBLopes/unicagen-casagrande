import { useEffect } from "react";

export function useClickOutside(ref, callback, ativo = true) {
    useEffect(() => {
        if (!ativo) return;

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ativo, ref, callback]);
}