import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Datatattat",
		default: "Datatattat",
	},
	icons: {
		icon: [
			{ url: "/assets/logo-square.png", type: "image/png", sizes: "32x32" },
			{ url: "/assets/logo-square.png", type: "image/png", sizes: "192x192" },
		],
		shortcut: "/assets/logo-square.png",
		apple: {
			url: "/assets/logo-square.png",
			type: "image/png",
			sizes: "180x180",
		},
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
