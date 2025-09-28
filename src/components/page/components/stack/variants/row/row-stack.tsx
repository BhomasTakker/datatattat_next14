import { PageComponent, PageComponents } from "@/types/page";
import styles from "./row-stack.module.scss";
import { ComponentDisplay } from "@/components/content/component-display";
import {
	Column,
	getContainerHeight,
	getContainerWidth,
	Row,
	RowStackProps,
} from "../../types";

type RowStackComponetProps = {
	components: PageComponents;
	isClient?: boolean;
} & RowStackProps;

const createRowConfigMap = (rows: Row[]) => {
	// Create a map of row configurations by index for quick lookup
	const rowConfigMap = new Map<string, Row>();
	rows.forEach((row) => {
		const { index } = row;
		if (index !== undefined) {
			rowConfigMap.set(`${index}`, row);
		}
	});
	return rowConfigMap;
};

// We want an item style for items?
const createRowStyle = (row: Row) => {
	// Create a style object for the row based on its properties
	// height and overflow are incorrect
	// When we apply height we are cutting off the content
	const style: React.CSSProperties = {
		// maxHeight: `${row.maxHeight}px`, // Set height based on maxHeight
		// Add other styles as needed
	};
	return style;
};

// Potentially we should create classes
const createColumnStyle = (column: Column) => {
	const { minWidth = "MD", maxHeight = "MD", evenColumns } = column;

	const width = getContainerWidth(minWidth);
	const height = getContainerHeight(maxHeight);

	const flex = evenColumns ? { flex: 1 } : { flexGrow: 1 };

	// Create a style object for the column based on its properties
	const style: React.CSSProperties = {
		minWidth: `${width}px`, // Set width based on minWidth
		maxHeight: `${height}px`, // Set height based on maxHeight
		...flex, // Apply flex properties
		// Add other styles as needed
	};
	return style;
};

const renderColumn = (
	key: number,
	component: PageComponent,
	config: Column,
	isClient: boolean
) => {
	const columnStyle = createColumnStyle(config);
	return (
		<li
			key={key}
			data-testid="content-component"
			className={styles.item}
			style={columnStyle}
		>
			<ComponentDisplay component={component} isClient={isClient} />
		</li>
	);
};

const createColumnComponents = (
	config: Row,
	state: {
		components: PageComponents;
		componentIndex: number;
		currentRowIndex: number;
	},
	isClient: boolean
) => {
	const { columns: rowColumns, maxHeight: rowHeight } = config;
	const { components } = state;

	let columnComponents = [];
	for (let j = 0; j < rowColumns; j++) {
		if (state.componentIndex >= components.length) {
			break;
		}
		columnComponents.push(
			renderColumn(
				state.componentIndex,
				components[state.componentIndex],
				config,
				isClient
			)
		);

		state.componentIndex++;
	}

	return columnComponents;
};

const createRow = (rowConfig: Row, state: any, isClient: boolean) => {
	const columnComponents = createColumnComponents(rowConfig, state, isClient);
	const rowStyle = createRowStyle(rowConfig);

	return (
		<li
			key={state.currentRowIndex}
			className={styles.rowListItem}
			style={rowStyle}
		>
			<ul className={styles.rowList}>{columnComponents}</ul>
		</li>
	);
};

const renderComponents = ({
	components,
	defaultRow,
	rows = [],
	isClient = false,
}: RowStackComponetProps) => {
	const rowsToRender = [];

	// Create a map of row configurations by index for quick lookup
	const rowConfigMap = createRowConfigMap(rows);

	// Maybe not the best aproach but contained
	const state = {
		components,
		componentIndex: 0,
		currentRowIndex: 0,
	};

	// we could create a failsafe count and ditch if we exceed
	while (state.componentIndex < components.length) {
		// If we have no more rows to render, we can break
		const currentRowConfig =
			rowConfigMap.get(`${state.currentRowIndex}`) || defaultRow;

		const row = createRow(currentRowConfig, state, isClient);
		rowsToRender.push(row);
		state.currentRowIndex++;
	}

	return rowsToRender;
};

export const rowStack = {
	styles: styles,
	renderMethod: renderComponents,
};
