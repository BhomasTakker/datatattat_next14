import { PageStackCollectionVariants } from "@/types/components/page/stack";

export type VerticalStackProps = {
	variant: PageStackCollectionVariants.Vertical;
};

// Row configuration for row-stack layout
export type Row = {
	columns: number;
	// you wouldn't max/min height - you would set a height
	maxHeight: number;
	minHeight: number;
	index?: number; // optional for default row - specifies which row this config applies to
};

export type RowStackProps = {
	variant: PageStackCollectionVariants.RowStack;
	defaultRow: Row; // Default configuration used for any row not specifically configured
	rows?: Row[]; // Optional array of row-specific configurations - index property determines which row each config applies to
};

export type PageStackProps = {
	variant: PageStackCollectionVariants;
} & (VerticalStackProps | RowStackProps);
