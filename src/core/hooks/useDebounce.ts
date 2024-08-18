import type { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useDebounce(time = 500) {
    const handleDebounce = (
        callback: (e: ChangeEvent<HTMLInputElement>) => void,
    ) => useDebouncedCallback(callback, time);

    return handleDebounce
}