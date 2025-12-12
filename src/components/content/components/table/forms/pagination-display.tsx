import styles from "./pagination-display.module.scss";
import { Pagination } from "./pagination.form";

export const PaginationDisplay = ({
	pagination,
}: {
	pagination: Pagination;
}) => {
	return (
		<div className={styles.paginationInfo}>
			<div className={styles.infoItem}>
				<span className={styles.infoLabel}>Page:</span>
				<span className={styles.infoValue}>
					{pagination.page} of {pagination.pages}
				</span>
			</div>
			<div className={styles.infoDivider}>|</div>
			<div className={styles.infoItem}>
				<span className={styles.infoLabel}>Page Size:</span>
				<span className={styles.infoValue}>{pagination.limit}</span>
			</div>
			<div className={styles.infoDivider}>|</div>
			<div className={styles.infoItem}>
				<span className={styles.infoLabel}>Total Documents:</span>
				<span className={styles.infoValue}>{pagination.total}</span>
			</div>
		</div>
	);
};
