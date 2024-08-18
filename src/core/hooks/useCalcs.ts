import { useState } from "react";

export function useCalcs({ columns, rows, pEmax, pEmin }: { columns: number, rows: number, pEmin: number, pEmax: number }) {
    const [result, setResult] = useState({
        maximin: "",
        maximax: "",
        laplace: "",
        hurwicz: "",
    });

    const calculateCells = (indexRow: number) => {
        return Array.from({ length: columns }).map((_, indexColumn) => {
            const cell = document.getElementById(
                `row-${indexRow}-${indexColumn}`,
            ) as HTMLInputElement;

            return +cell.value;
        });
    };

    const getRowName = (allRows: number[], key: keyof typeof result) => {
        const selectedValue = Math.max(...allRows);
        const rowIndex = allRows.indexOf(selectedValue);
        const $row = document.querySelector(
            `tbody tr:nth-child(${rowIndex + 1}) th`,
        );
        setResult((prev) => ({ ...prev, [key]: $row?.textContent || "" }));
    };

    const calculateMaximin = () => {
        const allRows = Array.from({ length: rows }).map((_, indexRow) => {
            const cells = calculateCells(indexRow);
            return Math.min(...cells);
        });

        getRowName(allRows, "maximin");
    };

    const calculateMaximax = () => {
        const allRows = Array.from({ length: rows }).map((_, indexRow) => {
            const cells = calculateCells(indexRow);
            return Math.max(...cells);
        });

        getRowName(allRows, "maximax");
    };

    const calculateHurwicz = () => {
        const allRows = Array.from({ length: rows }).map((_, indexRow) => {
            const cells = calculateCells(indexRow);
            const max = Math.max(...cells);
            const min = Math.min(...cells);
            return pEmin * min + pEmax * max;
        });

        getRowName(allRows, "hurwicz");
    };

    const calculateLaplace = () => {
        const allRows = Array.from({ length: rows }).map((_, indexRow) => {
            const cells = calculateCells(indexRow);
            return cells.reduce((acc, curr) => acc + curr, 0) / columns;
        });

        getRowName(allRows, "laplace");
    };

    const calculateAll = () => {
        calculateMaximin();
        calculateMaximax();
        calculateLaplace();
        calculateHurwicz();
    };

    return {
        calculateAll,
        result
    }
}