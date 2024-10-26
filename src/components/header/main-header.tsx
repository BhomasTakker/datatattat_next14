import { ClientHeader } from "./client-header";
import { NavigationHeader } from "./navigation-header";

export const MainHeader = async () => {
	return (
		<header>
			<NavigationHeader />
			<ClientHeader />
		</header>
	);
};
