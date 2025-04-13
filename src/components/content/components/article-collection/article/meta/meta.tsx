import { StyleSheet } from "@/types/css";
import { Time } from "./time";

type Props = {
	styles: StyleSheet;
	publisher?: string;
	published?: Date | string;
};

export const Meta = ({ published, publisher, styles }: Props) => {
	return (
		<div className={styles.meta}>
			{publisher ? (
				<p className={styles.publishers} data-testid="publisher">
					{publisher}
				</p>
			) : (
				<></>
			)}
			{published ? <Time styles={styles} time={published} /> : null}
		</div>
	);
};
