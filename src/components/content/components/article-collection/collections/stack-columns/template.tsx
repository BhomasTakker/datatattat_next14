import styles from "./template.module.scss";

export const ArticleTemplates = () => {
	return Array.from({ length: 10 }).map((_, index) => (
		<li key={index} className={styles.template}>
			<div className={styles.article} />
		</li>
	));
};
