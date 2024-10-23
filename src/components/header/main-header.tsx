import { NavigationHeader } from "./navigation-header";
import { NavigationMenu } from "./navigation/navigation-menu";

const items = [
	{
		label: "Home",
		route: "/",
	},
	{
		label: "Member",
		route: "/Member",
	},
	{
		label: "ClientMember",
		route: "/ClientMember",
	},
];

export const MainHeader = async () => {
	// load header data based on route
	return (
		<header>
			<NavigationHeader />
			<NavigationMenu items={items} />
		</header>
	);
};
