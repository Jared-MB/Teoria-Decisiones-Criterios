import { type ChangeEvent, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useRows() {

    const debounce = useDebounce()

    const [rows, setRows] = useState(3);
    const [debouncedRows, setDebouncedRows] = useState(3);

    const handleAddRow = (e: ChangeEvent<HTMLInputElement>) => {
        setDebouncedRows(+e.target.value);
        handleDebouncedAddRow(e);
    };

    const handleDebouncedAddRow = debounce((e) => {
        setRows(+e.target.value);
    });

    return { rows, debouncedRows, addRow: handleAddRow };
}