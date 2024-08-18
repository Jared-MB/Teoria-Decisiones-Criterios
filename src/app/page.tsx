"use client";

import { useEffect, useState } from "react";

import { useCalcs, useColumns, useRows } from "@/core/hooks";

import { Input } from "@/core/components/ui/input";
import { InputContainer } from "@/core/components/ui/input-container";
import { Label } from "@/core/components/ui/label";
import { Separator } from "@/core/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/core/components/ui/table";

export default function Home() {
	const { columns, addColumn, debouncedColumns } = useColumns();
	const { rows, addRow, debouncedRows } = useRows();

	const [pEmin, setPEmin] = useState(0.75);
	const [pEmax, setPEmax] = useState(0.25);

	const { result, calculateAll } = useCalcs({
		columns,
		rows,
		pEmin,
		pEmax,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: No need to add `calculateAll` as a dependency, it's a function that doesn't change
	useEffect(() => {
		calculateAll();
	}, [pEmax, pEmin, rows, columns]);

	return (
		<main className="flex min-h-screen flex-col p-16 gap-y-8">
			<header className="flex justify-between items-center gap-x-8 h-16 w-full">
				<h1 className="text-4xl font-semibold">Teoría de decisiones</h1>
				<div className="flex flex-row gap-x-4 h-16 items-end">
					<div className="flex items-center gap-x-4">
						<InputContainer>
							<Label>Columnas</Label>
							<Input value={debouncedColumns} onChange={addColumn} />
						</InputContainer>
						<InputContainer>
							<Label>Filas</Label>
							<Input value={debouncedRows} onChange={addRow} />
						</InputContainer>
					</div>
					<Separator orientation="vertical" className="h-3/4" />
					<div className="flex items-center gap-x-4">
						<InputContainer>
							<Label>Probabilidad Minima</Label>
							<Input
								value={pEmin}
								step={0.05}
								onChange={(e) => setPEmin(+e.target.value)}
							/>
						</InputContainer>
						<InputContainer>
							<Label>Probabilidad Maxima</Label>
							<Input
								value={pEmax}
								step={0.05}
								onChange={(e) => setPEmax(+e.target.value)}
							/>
						</InputContainer>
					</div>
				</div>
			</header>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead />
						{Array.from({ length: columns }).map((_, index) => (
							<TableHead
								key={`header-${index}`}
								contentEditable
								className="text-purple-500 font-semibold"
							>
								Evento {index + 1}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: rows }).map((_, indexRow) => (
						<TableRow key={`row-${indexRow}`}>
							<TableHead
								contentEditable
								className="text-purple-500 font-semibold"
							>
								Decisión {indexRow + 1}
							</TableHead>
							{Array.from({ length: columns }).map((_, indexColumn) => (
								<TableCell key={`row-cell-${indexColumn}`}>
									<Input
										id={`row-${indexRow}-${indexColumn}`}
										onChange={calculateAll}
									/>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<section className="flex flex-col gap-y-4">
				<h2 className="font-semibold text-2xl">¿Qué decisión tomar? </h2>
				<article>
					<h3>
						Criterio Maximin:{" "}
						<span className="font-semibold text-lg text-purple-500">
							{result.maximin}
						</span>
					</h3>
				</article>
				<article>
					<h3>
						Criterio Maximax:{" "}
						<span className="font-semibold text-lg text-purple-500">
							{result.maximax}
						</span>
					</h3>
				</article>
				<article>
					<h3>
						Criterio Laplace:{" "}
						<span className="font-semibold text-lg text-purple-500">
							{result.laplace}
						</span>
					</h3>
				</article>
				<article>
					<h3>
						Criterio Hurwicz:{" "}
						<span className="font-semibold text-lg text-purple-500">
							{result.hurwicz}
						</span>
					</h3>
				</article>
			</section>
		</main>
	);
}
