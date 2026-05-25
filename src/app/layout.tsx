import type { Metadata } from "next";
import { LOGO_SQUARE } from "@/lib/assets/constants";

export const metadata: Metadata = {
	title: {
		template: "%s | Datatattat",
		default: "Datatattat",
	},
	icons: {
		icon: [
			{ url: LOGO_SQUARE, type: "image/png", sizes: "32x32" },
			{ url: LOGO_SQUARE, type: "image/png", sizes: "192x192" },
		],
		shortcut: LOGO_SQUARE,
		apple: {
			url: LOGO_SQUARE,
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
