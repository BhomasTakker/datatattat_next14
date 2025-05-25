import { MainFooter } from "@/components/footer/main-footer";
import styles from "./page-layout.module.scss";
import { geistMono, geistSans } from "@/fonts";
import { initialiseServices } from "@/lib/services/intialise-services";
import { Providers } from "@/components/providers/Providers";
import "../../../scss/globals.scss";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const PageLayout = async ({
	children,
}: {
	children: React.ReactNode;
}) => {
	await initialiseServices();
	return (
		<Providers>
			<div
				className={`${geistSans.variable} ${geistMono.variable} ${styles.root}`}
			>
				{children}
				<MainFooter />
				<Analytics />
				<SpeedInsights />
			</div>
		</Providers>
	);
};
