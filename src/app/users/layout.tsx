import { MainHeader } from "@/components/header/main-header";
import { PageLayout } from "@/components/ui/layout/page-layout";

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ route: string[] }>;
}>) {
	const { route } = await params;

	return (
		<PageLayout>
			<MainHeader route={route} />
			{children}
		</PageLayout>
	);
}
