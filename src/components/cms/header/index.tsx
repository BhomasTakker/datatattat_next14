import { NavigationHeader as MainHeader } from "@/components/header/navigation-header";
import { CMSNavigation } from "./navigation";

export const CMSHeader = () => {
	return (
		<header>
			<MainHeader />
			<CMSNavigation />
		</header>
	);
};
