import styles from "./simple-table.module.scss";

type SimpleTableProps<T = any> = {
	columns: string[];
	data: T[];
	onSelect?: (item: T) => void;
};

export const SimpleTable = <T extends Record<string, any>>({
	columns,
	data,
	onSelect,
}: SimpleTableProps<T>) => {
	return (
		<table className={styles.table}>
			<thead className={styles.thead}>
				<tr>
					{columns.map((key) => (
						<th key={key}>{key}</th>
					))}
				</tr>
			</thead>
			<tbody className={styles.tbody}>
				{data.map((item, index) => {
					return (
						<tr
							key={item.id || item._id || index}
							onClick={() => onSelect && onSelect(item)}
							className={styles.tr + (onSelect ? ` ${styles.clickable}` : "")}
						>
							{columns.map((key) => (
								<td key={`${item.id || item._id || index}-${key}`}>
									{item[key]}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
