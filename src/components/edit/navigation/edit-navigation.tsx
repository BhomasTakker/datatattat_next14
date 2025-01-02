import Link from "next/link";
import styles from "./edit-navigation.module.scss";
import { NavigationMenu } from "@/components/header/navigation/navigation-menu";
import { getMainHeader, getSubHeaders } from "@/actions/header/get-header";
import { SubHeaders } from "@/components/header/sub-headers";
import { PATHS } from "@/lib/routing/paths";

type EditNavigationProps = {
	route: string;
	isAdminEdit?: boolean;
};

export const EditNavigation = async ({
	route,
	isAdminEdit,
}: EditNavigationProps) => {
	const mainHeader = await getMainHeader();
	const subHeaders = await getSubHeaders(route);

	// Get this from somewhere
	const homeHref = isAdminEdit ? PATHS.admin() : PATHS.edit();
	const homeLabel = isAdminEdit ? "Home" : `User Home`;

	const routePrefix = isAdminEdit ? PATHS.admin() : PATHS.edit();
	return (
		<section className={styles.header}>
			<Link href={homeHref}>{homeLabel}</Link>
			{/* BACK BUTTON / More up a level button */}
			{isAdminEdit ? (
				<NavigationMenu items={mainHeader.nav} prefix={routePrefix} />
			) : null}
			{subHeaders && subHeaders.length > 0 ? (
				<SubHeaders headersArray={subHeaders} prefix={routePrefix} />
			) : null}
		</section>
	);
};
