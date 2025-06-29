import { ComponentProps } from "@/types/component";

export const BlueSkyCollection = ({
	component,
	dataObject,
}: ComponentProps) => {
	console.log("BlueSkyCollection component props:", { component, dataObject });
	return (
		<div data-testid="bluesky-collection">
			<p>BlueSky Collection Component</p>
			<p>This component is a placeholder for BlueSky collections.</p>
		</div>
	);
};
