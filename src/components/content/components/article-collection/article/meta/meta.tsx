import { StyleSheet } from "@/types/css";
import { Details } from "@/types/data-structures/collection/base";

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
			<p>{categories}</p>
			<p>{authors}</p>
			<p>{`${published}`}</p>
			<p>{publishers}</p>
		</div>
	);
};
