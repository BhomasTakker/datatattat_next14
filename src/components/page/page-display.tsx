// use a more local layout

import { IPage } from "@/types/page";
import { PageHead } from "./head/page-head";
import { PageProfile } from "./profile/page-profile";

export const PageDisplay = ({ page }: { page: IPage }) => {
	const { content, meta, profile } = page || {};
	const { container, props, components } = content || {};
	const { containerType } = container;

	return (
		<div>
			<main>
				{/* Page head for meta data, seo, etc */}
				<PageHead headData={meta} />
				{/* Page profile data for title, description, createdBy, etc */}
				<PageProfile profile={profile} />
				<p>{`${containerType}`}</p>
				<p>{`${JSON.stringify(props)}`}</p>
				<p>{`Number of components ${components.length}`}</p>
			</main>
		</div>
	);
};
