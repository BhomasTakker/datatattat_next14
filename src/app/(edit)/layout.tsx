import { MainHeader } from "@/components/header/main-header";
import { PageLayout } from "@/components/ui/layout/page-layout";
import { ToastContainer } from "@/lib/sonner/toast-container";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<PageLayout>
			<MainHeader />
			{children}
			<ToastContainer />
		</PageLayout>
	);
}
