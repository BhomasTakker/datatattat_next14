import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { ReactNode, useState, useEffect } from "react";

type WithData = {
	getter: () => Promise<CollectionItem>;
	callback: (data: CollectionItem) => ReactNode;
	template: ReactNode;
};

export const WithData = ({ getter, callback, template }: WithData) => {
	const [data, setData] = useState<CollectionItem | null>(null);
	useEffect(() => {
		const loadData = async () => {
			const data = await getter();
			setData(data);
		};
		loadData();
	}, []);
	return data ? callback(data) : template;
};
