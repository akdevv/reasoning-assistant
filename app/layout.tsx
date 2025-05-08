import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Reasoning Assistant",
	description: "Reasoning Assistant for the future of AI",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased font-poppins`}>{children}</body>
		</html>
	);
}
