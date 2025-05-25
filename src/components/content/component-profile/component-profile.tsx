import Link from "next/link";
import styles from "./component-profile.module.scss";
import { ComponentProfileProps } from "@/types/component";

// At the moment it is internal links only!
export const ComponentProfile = ({
	profile,
}: {
	profile: ComponentProfileProps;
}) => {
	const { componentTitle, showComponentTitle, componentTitleLink } =
		profile || {};

	const titleComponent = <h2 className={styles.title}>{componentTitle}</h2>;
	const titleComponentToRender = componentTitleLink ? (
		<Link href={componentTitleLink}>{titleComponent}</Link>
	) : (
		titleComponent
	);

	if (componentTitle === undefined || componentTitle === "") {
		return null;
	}

	return (
		<div className={styles.root}>
			{componentTitle && titleComponentToRender}
		</div>
	);
};
