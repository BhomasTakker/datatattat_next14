import styles from "./component-title.module.scss";

type ComponentTitleProps = {
	title: string;
	subTitle?: string;
};

export const ComponentTitle = ({
	title,
	subTitle = "Just some example text",
}: ComponentTitleProps) => {
	console.log("ComponentTitle rendered with title:", title);
	return (
		<div className={styles.root}>
			<div className={styles.signal} />
			<div className={styles.titleContainer}>
				<h2 className={styles.title}>{title}</h2>
				{subTitle && <p className={styles.subTitle}>{subTitle}</p>}
			</div>
		</div>
	);
};
