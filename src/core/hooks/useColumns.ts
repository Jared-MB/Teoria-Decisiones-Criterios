import { type ChangeEvent, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useColumns() {

    const debounce = useDebounce()

    const [columns, setColumns] = useState(4);
    const [debouncedColumns, setDebouncedColumns] = useState(4);

    const handleAddColumn = (e: ChangeEvent<HTMLInputElement>) => {
        setDebouncedColumns(+e.target.value);
        handleDebouncedAddColumn(e);
    };

    const handleDebouncedAddColumn = debounce((e) =>
        setColumns(+e.target.value),
    );

    return { columns, debouncedColumns, addColumn: handleAddColumn };
}