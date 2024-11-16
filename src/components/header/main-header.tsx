import { ClientHeader } from "./client-header";
import { NavigationHeader } from "./navigation-header";
import styles from "./main-header.module.scss";

export interface DynamicHeader {
	route?: string[] | undefined;
}
export const MainHeader = ({ route }: DynamicHeader) => {
	return (
		<header className={styles.root}>
			<NavigationHeader />
			<ClientHeader route={route} />
		</header>
	);
};
