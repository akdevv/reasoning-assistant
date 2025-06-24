import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Reasoning Assistant",
	description: "Reasoning Assistant - powered by ChainOfThought",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body>{children}</body>
		</html>
	);
}
