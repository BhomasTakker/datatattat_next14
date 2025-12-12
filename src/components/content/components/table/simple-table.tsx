import styles from "./simple-table.module.scss";

type SimpleTableProps<T = any> = {
	columns: string[];
	data: T[];
};

export const SimpleTable = <T extends Record<string, any>>({
	columns,
	data,
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
						<tr key={index}>
							{columns.map((key) => (
								<td key={`${index}-${key}`}>{item[key]}</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
