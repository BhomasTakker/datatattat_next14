import { StyleSheet } from "@/types/css";
import { Details } from "@/types/data-structures/collection/base";
import { Time } from "./time";

type Props = {
	styles: StyleSheet;
} & Details;

export const Meta = ({
	categories,
	authors,
	published,
	publishers,
	styles,
}: Props) => {
	return (
		<div className={styles.meta}>
			{categories?.length ? (
				<p className={styles.categories}>{categories}</p>
			) : null}
			{authors?.length ? <p className={styles.authors}>{authors}</p> : null}
			{publishers?.length ? (
				<p className={styles.publishers}>{publishers}</p>
			) : null}
			{published ? <Time styles={styles} time={published} /> : null}
		</div>
	);
};
