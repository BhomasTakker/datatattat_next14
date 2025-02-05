import { StyleSheet } from "@/types/css";
import { Details } from "@/types/data-structures/collection/base";
import { Time } from "./time";

type Props = {
	styles: StyleSheet;
	provider?: string;
} & Details;

export const Meta = ({
	categories,
	authors,
	published,
	publishers,
	provider,
	styles,
}: Props) => {
	// remove categories and authors / or default no show
	return (
		<div className={styles.meta}>
			{categories?.length ? (
				<p className={styles.categories}>{categories}</p>
			) : null}
			{authors?.length ? <p className={styles.authors}>{authors}</p> : null}
			{publishers?.length ? (
				<p className={styles.publishers}>{publishers}</p>
			) : (
				<p className={styles.publishers}>{provider}</p>
			)}
			{published ? <Time styles={styles} time={published} /> : null}
		</div>
	);
};
