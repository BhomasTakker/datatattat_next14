import { ReactNode } from "react";
import styles from "./title.module.scss";

type FormTitleProps = {
	title: string;
	subtitle?: string;
	icon?: ReactNode;
	align?: "left" | "center";
	size?: "small" | "medium" | "large";
};

export const FormTitle = ({
	title,
	subtitle,
	icon,
	align = "left",
	size = "medium",
}: FormTitleProps) => {
	return (
		<div className={`${styles.titleWrapper} ${styles[align]} ${styles[size]}`}>
			{icon && <div className={styles.icon}>{icon}</div>}
			<div className={styles.content}>
				<h2 className={styles.title}>{title}</h2>
				{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
			</div>
		</div>
	);
};
