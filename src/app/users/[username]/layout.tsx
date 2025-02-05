import { PageLayout } from "@/components/ui/layout/page-layout";
import { MainHeader } from "@/components/header/main-header";

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ username: string }>;
}>) {
	const { username } = await params;
	const route = ["users", username];

	return (
		<PageLayout>
			<MainHeader route={route} />
			{children}
		</PageLayout>
	);
}
