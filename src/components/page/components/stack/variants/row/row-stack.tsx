import { PageComponents } from "@/types/page";
import styles from "./row-stack.module.scss";
import { ComponentDisplay } from "@/components/content/component-display";
import { RowStackProps } from "../../types";

type RowStackComponetProps = {
	components: PageComponents;
} & RowStackProps;

const renderRows = ({
	components,
	defaultRow,
	rows = [],
}: Omit<RowStackComponetProps, "variant">) => {
	const rowsToRender = [];
	const { columns: defaultColumns, maxHeight: defaultHeight } = defaultRow;
	let i = 0;
	do {
		// if i != row.index
		let columnComponents = [];
		for (let j = 0; j < defaultColumns; j++) {
			if (i >= components.length) {
				// if we have passed the last component, break
				break;
			}
			columnComponents.push(
				<li key={j} data-testid="content-component" className={styles.item}>
					<ComponentDisplay key={j} component={components[i]} />
				</li>
			);
			// increment i
			console.log("increment i 8989", { i, j, component: components[i] });
			i++;
		}
		const row = (
			<li key={rowsToRender.length} className={styles.rowListItem}>
				<ul className={styles.rowList}>{columnComponents}</ul>
			</li>
		);
		rowsToRender.push(row);
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

	console.log("8989:renderComponent", { defaultRow, rows });

	return renderRows({ components, defaultRow, rows });
	// return components.map((component, index) => {
	// 	return (
	// 		<li key={index} data-testid="content-component" className={className}>
	// 			<ComponentDisplay key={index} component={component} />
	// 		</li>
	// 	);
	// });
};

export const rowStack = {
	styles: styles,
	renderMethod: renderComponents,
};
