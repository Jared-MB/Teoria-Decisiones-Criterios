import type { Metadata } from "next";
import { quicksand } from "@/core/config";

import "./globals.css";
import { cn } from "@/core/lib/utils";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					quicksand.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
}
