import { PageLayout } from "@/components/ui/layout/page-layout";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <PageLayout>{children}</PageLayout>;
}
