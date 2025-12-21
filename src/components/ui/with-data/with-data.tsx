import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { ReactNode, useState, useEffect } from "react";

type WithData = {
	getter: () => Promise<CollectionItem>;
	callback: (data: CollectionItem) => ReactNode;
	template: ReactNode;
};

export const WithData = ({ getter, callback, template }: WithData) => {
	const [data, setData] = useState<CollectionItem | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const data = await getter();
				setData(data);
			} catch {
				setError("Error fetching data");
			}
		};
		loadData();
	}, []);
	if (error) {
		return <div>{error}</div>;
	}

	return template; //data ? callback(data) : template;
};
