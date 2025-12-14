import styles from "./pagination-display.module.scss";
import { Pagination } from "./pagination.form";

export const PaginationDisplay = ({
	pagination,
}: {
	pagination: Pagination;
}) => {
	return (
		<dl className={styles.paginationInfo}>
			<div className={styles.infoItem}>
				<dt className={styles.infoLabel}>Page:</dt>
				<dd className={styles.infoValue}>
					{pagination.page} of {pagination.pages}
				</dd>
			</div>
			<span className={styles.infoDivider} aria-hidden="true">
				|
			</span>
			<div className={styles.infoItem}>
				<dt className={styles.infoLabel}>Page Size:</dt>
				<dd className={styles.infoValue}>{pagination.limit}</dd>
			</div>
			<span className={styles.infoDivider} aria-hidden="true">
				|
			</span>
			<div className={styles.infoItem}>
				<dt className={styles.infoLabel}>Total Documents:</dt>
				<dd className={styles.infoValue}>{pagination.total}</dd>
			</div>
		</dl>
	);
};
