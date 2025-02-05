import { PageLayout } from "@/components/ui/layout/page-layout";
import { MainHeader } from "@/components/header/main-header";

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ username: string; route: string[] }>;
}>) {
	const { username, route } = await params;
	const headerRoute = ["users", username, ...route];

	return (
		<PageLayout>
			<MainHeader route={headerRoute} />
			{children}
		</PageLayout>
	);
}
