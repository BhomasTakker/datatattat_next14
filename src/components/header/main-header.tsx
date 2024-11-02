import { ClientHeader } from "./client-header";
import { NavigationHeader } from "./navigation-header";
import styles from "./main-header.module.scss";
export const MainHeader = () => {
	return (
		<header className={styles.root}>
			<div className={styles.container}>
				<NavigationHeader />
			</div>
			<div className={styles.divider} />
			<div className={styles.container}>
				<ClientHeader />
			</div>
			<div className={styles.divider} />
		</header>
	);
};
