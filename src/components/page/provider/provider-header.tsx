import { ProviderItem } from "@/types/data-structures/collection/item/item";
import styles from "./provider-header.module.scss";

type Props = {
	provider: ProviderItem;
};

export const ProviderHeader = ({ provider }: Props) => {
	const { name, description, url, logo, rating, leaning, origin } = provider;

	return (
		<div className={styles.root}>
			{logo && <img src={logo} alt={`${name} logo`} className={styles.logo} />}
			<div className={styles.content}>
				<h1 className={styles.name}>{name}</h1>
				<p className={styles.description}>{description}</p>
				<dl className={styles.meta}>
					<div className={styles.metaItem}>
						<dt className={styles.metaLabel}>Origin</dt>
						<dd className={styles.metaValue}>{origin}</dd>
					</div>
					<div className={styles.metaItem}>
						<dt className={styles.metaLabel}>Website</dt>
						<dd className={styles.metaValue}>
							<a
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.link}
							>
								{url}
							</a>
						</dd>
					</div>
					<div className={styles.metaItem}>
						<dt className={styles.metaLabel}>Rating</dt>
						<dd className={styles.metaValue}>
							<span className={styles.rating}>{rating}</span>
							<span className={styles.ratingMax}> / 100</span>
						</dd>
					</div>
					<div className={styles.metaItem}>
						<dt className={styles.metaLabel}>Leaning</dt>
						<dd className={styles.metaValue}>{leaning}</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};
