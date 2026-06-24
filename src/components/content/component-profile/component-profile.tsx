import Link from "next/link";
import styles from "./component-profile.module.scss";
import { ComponentProfileProps } from "@/types/component";
import { ComponentTitle } from "./title/component-title";

// At the moment it is internal links only!
export const ComponentProfile = ({
	profile,
}: {
	profile: ComponentProfileProps;
}) => {
	const { componentTitle, subTitle, componentTitleLink } = profile || {};

	const titleComponent = (
		<ComponentTitle title={componentTitle} subTitle={subTitle} />
	);
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
