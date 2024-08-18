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
import { buttonVariants } from "@/core/components/ui/button";
import Link from "next/link";

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
					<Link
						target="_blank"
						href="https://github.com/Jared-MB/Teoria-Decisiones-Criterios/"
						className={buttonVariants({
							variant: "ghost",
							className: "p-2",
							size: "icon",
						})}
					>
						<svg
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>GitHub</title>
							<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
						</svg>
					</Link>
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
