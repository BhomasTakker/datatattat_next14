import { getMainHeader, getSubHeaders } from "@/actions/header/get-header";
import { NavigationMenu } from "./navigation/navigation-menu";
import { SubHeaders } from "./sub-headers";
import { DynamicHeader } from "./main-header";

type Props = {
	prefix?: string;
} & DynamicHeader;

// Next 14 we will cache the header
// Next 15 will not
// We need to cache and bust by route
export const ClientHeader = async ({ route, prefix = "" }: Props) => {
	const header = await getMainHeader();
	// createRouteFromParams return `/${joined}`
	const joined = (route || []).join("/");
	const joinedRoute = `/${joined}`;
	const subHeaders =
		joinedRoute !== "/" ? await getSubHeaders(joinedRoute) : [];

	return (
		<>
			{header ? <NavigationMenu items={header.nav} prefix={prefix} /> : null}
			{subHeaders && subHeaders.length > 0 ? (
				<SubHeaders headersArray={subHeaders} prefix={prefix} />
			) : null}
		</>
	);
};
