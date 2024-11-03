// use a more local layout

import { IPage } from "@/types/page";

export const PageDisplay = ({ page }: { page: IPage }) => {
	const { content } = page || {};
	const { container, props, components } = content || {};
	const { containerType } = container;

	return (
		<div>
			<main>
				<h1>PAGE</h1>
				<p>{`${containerType}`}</p>
				<p>{`${JSON.stringify(props)}`}</p>
				<p>{`Number of components ${components.length}`}</p>
			</main>
		</div>
	);
};
