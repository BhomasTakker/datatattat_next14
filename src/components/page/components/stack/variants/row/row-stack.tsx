import { PageComponents } from "@/types/page";
import styles from "./row-stack.module.scss";
import { ComponentDisplay } from "@/components/content/component-display";
import { Row, RowStackProps } from "../../types";

type RowStackComponetProps = {
	components: PageComponents;
} & RowStackProps;

const renderRows = ({
	components,
	defaultRow,
	rows = [],
}: Omit<RowStackComponetProps, "variant">) => {
	const rowsToRender = [];

	// Create a map of row configurations by index for quick lookup
	const rowConfigMap = new Map();
	rows.forEach((row) => {
		if (row.index !== undefined) {
			rowConfigMap.set(row.index, row);
		}
	});

	let i = 0;
	let currentRowIndex = 0;

	do {
		// Get row configuration for current row index, fallback to defaultRow
		const currentRowConfig =
			rowConfigMap.get(`${currentRowIndex}`) || defaultRow;

		const { columns: rowColumns, maxHeight: rowHeight } =
			currentRowConfig as Row;

		let columnComponents = [];
		for (let j = 0; j < rowColumns; j++) {
			if (i >= components.length) {
				break;
			}
			columnComponents.push(
				<li key={j} data-testid="content-component" className={styles.item}>
					<ComponentDisplay key={j} component={components[i]} />
				</li>
			);

			i++;
		}

		///////////////////////////////////////////
		// Apply row-specific styling if needed
		// Set a height/max height?
		// We should use set heights and widths
		const rowStyle = {
			height: `${rowHeight}px`,
			// maxHeight: `${rowHeight}px`, // Uncomment if you want to enforce max height
		};
		///////////////////////////////////////////

		const row = (
			<li key={currentRowIndex} className={styles.rowListItem} style={rowStyle}>
				<ul className={styles.rowList}>{columnComponents}</ul>
			</li>
		);
		rowsToRender.push(row);
		currentRowIndex++;
	} while (i < components.length);

	return rowsToRender;
};

const renderComponents = ({
	components,
	defaultRow,
	rows = [],
}: RowStackComponetProps) => {
	const className = `
		${styles.item}
	}`;

	return renderRows({ components, defaultRow, rows });
};

export const rowStack = {
	styles: styles,
	renderMethod: renderComponents,
};
