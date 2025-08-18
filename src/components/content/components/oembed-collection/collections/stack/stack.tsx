import styles from "./stack.module.scss";
import { UnknownObject } from "@/types/utils";

type OembedProps = {
	src: string;
};

const renderOembed = (item: OembedProps) => {
	const { src } = item;

	// const template = articleTemplate(styles);

	return <div>Render Oembed</div>;
};

const renderMethod = (oembeds: any[] = [], _: UnknownObject) => {
	return oembeds.map((item) => renderOembed(item));
};

const oembedStack = {
	styles,
	renderMethod,
};

export default oembedStack;
