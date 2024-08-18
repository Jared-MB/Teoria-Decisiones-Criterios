import { cn } from "@/core/lib/utils";

export function InputContainer({
	children,
	classNames,
}: { children: React.ReactNode; classNames?: { container?: string } }) {
	return (
		<div
			className={cn("grid w-full items-center gap-2", classNames?.container)}
		>
			{children}
		</div>
	);
}
