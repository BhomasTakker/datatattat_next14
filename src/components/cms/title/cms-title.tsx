import { MdArticle } from "react-icons/md";
import styles from "./cms-title.module.scss";

type CMSTitleProps = {
	title: string;
	description?: string;
};

export const CMSTitle = ({ title, description }: CMSTitleProps) => {
	return (
		<div className={styles.header}>
			<div className={styles.titleWrapper}>
				<MdArticle className={styles.icon} />
				<h1 className={styles.title}>{title}</h1>
			</div>
			{description && <p className={styles.description}>{description}</p>}
		</div>
	);
};
