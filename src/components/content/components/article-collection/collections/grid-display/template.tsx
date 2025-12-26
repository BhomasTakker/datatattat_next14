import styles from "./template.module.scss";

export const GridArticleTemplates = ({ count }: { count: number }) => {
	return Array.from({ length: count }).map((_, index) => (
		<div key={index} className={styles.template}>
			<div className={styles.article} />
		</div>
	));
};
