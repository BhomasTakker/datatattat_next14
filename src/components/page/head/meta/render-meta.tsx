import { UnknownObject } from "@/types/utils";

interface Meta {
	data: UnknownObject;
}

export const renderMeta = ({ data }: Meta) => {
	const metadata = [];
	for (const key in data) {
		const value = data[key] as string;
		metadata.push(
			<meta
				key={key}
				data-rh="true"
				name={key}
				property={key}
				content={value}
			></meta>
		);
	}

	return [...metadata];
};
