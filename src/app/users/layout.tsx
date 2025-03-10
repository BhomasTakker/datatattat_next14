import { PageLayout } from "@/components/ui/layout/page-layout";

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ route: string[] }>;
}>) {
	return <PageLayout>{children}</PageLayout>;
}
