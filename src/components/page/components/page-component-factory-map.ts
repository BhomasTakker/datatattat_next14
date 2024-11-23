import { PageGrid } from "./grid/page-grid";
import { PageComponentsOptions } from "./page-component-factory-options";
import { PageStack } from "./stack/page-stack";

type PageComponents = typeof PageStack | typeof PageGrid;

// Where should this go? / here actually causes issues

export const PageContainersMap = new Map<PageComponentsOptions, PageComponents>(
	[
		[PageComponentsOptions.STACK, PageStack],
		[PageComponentsOptions.GRID, PageGrid],
	]
);
