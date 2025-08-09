import { PageStackCollectionVariants } from "@/types/components/page/stack";
import { PageComponents } from "@/types/page";

export type VerticalStackProps = {
	variant: PageStackCollectionVariants.Vertical;
};

// probably not here
type Row = {
	columns: number;
	// you wouldn't max/min height - you would set a height
	maxHeight: number;
	minHeight: number;
	index?: number; // optional for default row
};
``;
export type RowStackProps = {
	variant: PageStackCollectionVariants.RowStack;
	defaultRow: Row;
	rows?: Row[];
};

export type PageStackProps = {
	variant: PageStackCollectionVariants;
} & (VerticalStackProps | RowStackProps);

// export type PageStackContent = {
// 	containerType: string;
// 	props: PageStackProps;
// 	components: PageComponents;
// };
