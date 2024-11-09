import { PageGrid } from "./grid/page-grid";
import { PageStack } from "./stack/page-stack";

type PageComponents = typeof PageStack | typeof PageGrid;

// Where should this go?
export enum PageComponentsOptions {
	STACK = "Stack",
	GRID = "Grid",
}

export const PageContainersMap = new Map<PageComponentsOptions, PageComponents>(
	[
		[PageComponentsOptions.STACK, PageStack],
		[PageComponentsOptions.GRID, PageGrid],
	]
);
