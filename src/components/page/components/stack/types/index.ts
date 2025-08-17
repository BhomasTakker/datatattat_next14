import { PageStackCollectionVariants } from "@/types/components/page/stack";

export type VerticalStackProps = {
	variant: PageStackCollectionVariants.Vertical;
};

export const ContainerWidth = {
	XXS: "180",
	XS: "240",
	SM: "320",
	MD: "640",
	LG: "768",
	XL: "1024",
	XXL: "1280",
} as const;

export const ContainerWidthOptions = {
	XXS: "XXS",
	XS: "XS",
	SM: "SM",
	MD: "MD",
	LG: "LG",
	XL: "XL",
	XXL: "XXL",
} as const;

type ContainerWidth = (typeof ContainerWidth)[keyof typeof ContainerWidth];

export type ContainerWidthOptions = keyof typeof ContainerWidth;

export const ContainerHeight = {
	XXS: "240",
	XS: "360",
	SM: "480",
	MD: "600",
	LG: "720",
	XL: "840",
	XXL: "960",
} as const;

export const ContainerHeightOptions = {
	XXS: "XXS",
	XS: "XS",
	SM: "SM",
	MD: "MD",
	LG: "LG",
	XL: "XL",
	XXL: "XXL",
} as const;

type ContainerHeight = (typeof ContainerHeight)[keyof typeof ContainerHeight];

type ContainerHeightOptions = keyof typeof ContainerHeight;
export const containerWidthOptions: ContainerWidthOptions[] = Object.keys(
	ContainerWidth
) as ContainerWidthOptions[];

// Row configuration for row-stack layout
export type Row = {
	columns: number;
	evenColumns: boolean;
	// you wouldn't max/min height - you would set a height
	maxHeight: ContainerHeightOptions;
	minWidth: ContainerWidthOptions;
	// these are all actually strings!
	// Unless we can/want to convert these after http requests use strings
	index?: string; // optional for default row - specifies which row this config applies to
};

export type Column = {
	minWidth: ContainerWidthOptions;
	maxHeight: ContainerHeightOptions;
	evenColumns: boolean;
};

export type RowStackProps = {
	variant: PageStackCollectionVariants.RowStack;
	defaultRow: Row; // Default configuration used for any row not specifically configured
	rows?: Row[]; // Optional array of row-specific configurations - index property determines which row each config applies to
};

export type PageStackProps = {
	variant: PageStackCollectionVariants;
} & (VerticalStackProps | RowStackProps);
