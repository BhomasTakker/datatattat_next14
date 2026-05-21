import React from "react";

export const WithData = ({
	getter: _getter,
	callback: _callback,
	template,
	...props
}: {
	getter?: any;
	callback?: any;
	template?: React.ReactNode;
	[key: string]: any;
}) => (
	<div data-testid="withdata" {...props}>
		{template}
	</div>
);
