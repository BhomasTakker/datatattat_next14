export type FavIcon = {
	rel: string;
	type: string;
	sizes: string;
	href: string;
};

export interface FavIcons {
	icons: FavIcon[];
}

export const renderFavIcons = ({ icons }: FavIcons) => {
	return icons.map(({ rel, type, sizes, href }) => (
		<link
			key={`${href}&${sizes}`}
			rel={rel}
			type={type}
			href={href}
			sizes={sizes}
			data-rh="true"
		></link>
	));
};
