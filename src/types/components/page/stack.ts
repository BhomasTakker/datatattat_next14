export const PageStackVariant = {
	Horizontal: "Horizontal",
	Vertical: "Vertical",
} as const;

export const PageStackSizeOptions = {
	XLarge: "xl",
	Large: "lg",
	Medium: "md",
	Small: "sm",
	XSmall: "xs",
	Free: "Free",
} as const;

export type PageStackSizeOptions =
	(typeof PageStackSizeOptions)[keyof typeof PageStackSizeOptions];

export type PageStackVariant =
	(typeof PageStackVariant)[keyof typeof PageStackVariant];
