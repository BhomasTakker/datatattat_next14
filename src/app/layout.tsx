import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Datatattat",
		default: "Datatattat",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
