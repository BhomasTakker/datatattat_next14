import styles from "./page-title.module.scss";

type PageTitleProps = {
	title: string;
	description?: string;
	Icon?: React.ComponentType<{ className?: string }>;
	variant?: "default" | "cms" | "edit" | "admin";
};

export const PageTitle = ({
	title,
	description,
	Icon,
	variant = "default",
}: PageTitleProps) => {
	return (
		<div className={`${styles.header} ${styles[variant]}`}>
			<div className={styles.titleWrapper}>
				{Icon && <Icon className={styles.icon} />}
				<h1 className={styles.title} data-title="page-title">
					{title}
				</h1>
			</div>
			{description && <p className={styles.description}>{description}</p>}
		</div>
	);
};
