import { MainHeader } from "@/components/header/main-header";
import { PageLayout } from "@/components/ui/layout/page-layout";
import { ToastContainer } from "@/lib/sonner/toast-container";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ route: string[] }>;
}>) {
	return (
		<PageLayout>
			<MainHeader />
			{children}
			<ToastContainer />
		</PageLayout>
	);
}
