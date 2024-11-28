import { MainFooter } from "@/components/footer/main-footer";
import styles from "./page-layout.module.scss";
import { geistMono, geistSans } from "@/fonts";
import { initialiseServices } from "@/lib/services/intialise-services";
import { Providers } from "@/components/providers/Providers";
import "../../../scss/globals.scss";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
	initialiseServices();
	return (
		<html lang="en">
			<Providers>
				<body
					className={`${geistSans.variable} ${geistMono.variable} ${styles.root}`}
				>
					{children}
					<MainFooter />
				</body>
			</Providers>
		</html>
	);
};
