import { ClientHeader } from "./client-header";
import { NavigationHeader } from "./navigation-header";

export const MainHeader = () => {
	return (
		<header>
			<NavigationHeader />
			<ClientHeader />
		</header>
	);
};
