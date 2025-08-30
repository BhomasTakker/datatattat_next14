import { ComponentProps } from "@/types/component";
import { VariantsMap } from "./variant-map";

type SpotifyCollectionProps = {
	variantType: string;
	items: [];
};

export const SpotifyCollection = ({
	component,
	dataObject,
}: ComponentProps) => {
	const { componentProps } = component;
	const { variantType, ...rest } = componentProps || {};
	const { items = [] } = (dataObject?.data as SpotifyCollectionProps) || {};

	const variantObject = VariantsMap.get(variantType);

	if (!variantObject) {
		return null;
	}

	const { renderMethod, styles } = variantObject;

	return (
		<div className={styles.root} data-testid={variantType}>
			{renderMethod(items, rest)}
		</div>
	);
};
