import React from "react";

export const InViewComponent = ({
	children,
	options,
	...props
}: {
	children?: React.ReactNode;
	options?: { threshold?: number; triggerOnce?: boolean };
	[key: string]: any;
}) => (
	<div
		data-testid="inview"
		data-threshold={options?.threshold}
		data-trigger-once={
			options?.triggerOnce !== undefined
				? String(options.triggerOnce)
				: undefined
		}
		{...props}
	>
		{children}
	</div>
);
