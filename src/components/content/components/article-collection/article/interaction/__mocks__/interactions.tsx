import React from "react";

export const Interaction = ({
	children,
	...props
}: {
	children?: React.ReactNode;
	[key: string]: any;
}) => (
	<div data-testid="interaction" {...props}>
		{children}
	</div>
);
