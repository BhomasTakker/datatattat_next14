import { ComponentProps } from "@/types/component";
import { VariantsMap } from "./variant-map";

type SpotifyCollectionProps = {
	variantType: string;
	items: [];
};

export const SpotifyCollection = ({
	component,
	dataObject,
	isTemplate = false,
}: ComponentProps) => {
	const { componentProps } = component;
	const { variantType, ...rest } = componentProps || {};
	const { items = [] } = (dataObject?.data as SpotifyCollectionProps) || {};

	const variantObject = VariantsMap.get(variantType);

	if (!variantObject) {
		return null;
	}

	const { renderMethod, styles, renderTemplate } = variantObject;

	if (isTemplate) {
		return <div className={styles.root}>{renderTemplate(rest)}</div>;
	}

	return (
		<div className={styles.root} data-testid={variantType}>
			{renderMethod(items, rest)}
		</div>
	);
};
