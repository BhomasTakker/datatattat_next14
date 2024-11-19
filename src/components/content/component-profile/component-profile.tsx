import Link from "next/link";
import { ComponentProfileProps } from "../../../types/page";
import styles from "./component-profile.module.scss";

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

	if (!showComponentTitle) {
		return <></>;
	}

	return (
		<div className={styles.root}>
			{showComponentTitle && componentTitle && titleComponentToRender}
		</div>
	);
};
