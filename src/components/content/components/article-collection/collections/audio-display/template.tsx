import styles from "./template.module.scss";

export const AudioPlayerTemplate = () => {
	return <div className={styles.player} />;
};

export const AudioPlayerArticles = () => {
	return (
		<ul className={styles.articles}>
			{Array.from({ length: 10 }).map((_, index) => (
				<li key={index} className={styles.article} />
			))}
		</ul>
	);
};
