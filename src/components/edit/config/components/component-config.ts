import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../inputs/inputs";
import { ARTICLE_COLLECTION_CONFIG } from "./article-collection/article-collection-config";
import { DISPLAY_PLAYER_CONFIG } from "./display-player/display-player-config";
import { OEMBED_COLLECTION_CONFIG } from "./oembed-collection/oembed-collection-config";
import { SPOTIFY_COLLECTION_CONFIG } from "./spotify-collection/config";
import { componentProfile } from "../shared/component-profile";

enum ComponentOptions {
	ArticleCollection = "ArticleCollection",
	OembedCollection = "OembedCollection",
	SpotifyCollection = "SpotifyCollection",
	Oembed = "Oembed",
	BlueSky = "BlueSky",
	DisplayPlayer = "DisplayPlayer",
}

const pageContainersMap = new Map<string, InputListProps>([
	[ComponentOptions.ArticleCollection, ARTICLE_COLLECTION_CONFIG],
	[ComponentOptions.OembedCollection, OEMBED_COLLECTION_CONFIG],
	[ComponentOptions.DisplayPlayer, DISPLAY_PLAYER_CONFIG],
	[ComponentOptions.SpotifyCollection, SPOTIFY_COLLECTION_CONFIG],
]);

export const COMPONENT_CONFIG: GenericInput = {
	id: "components",
	type: EditInputs.array,
	label: "Components",
	title: "Add Component",
	isCollapsible: true,
	showIdentifier: true,
	input: {
		id: "component",
		type: EditInputs.inputList,
		label: "Component",
		// do not create a 'component' object
		// i.e. create input components on parent
		createObject: false,
		inputs: [
			{
				id: "componentTitle",
				type: EditInputs.title,
				title: "Component",
				size: "large",
				header: "h1",
			},
			componentProfile,
			{
				// technically we need this to be within component props
				// not be/create the component props object
				id: "componentType",
				type: EditInputs.objectSelect,
				label: "Source type",
				resetOnChange: true,
				defaultValue: ComponentOptions.ArticleCollection,
				required: true,
				options: [...pageContainersMap.keys()],
				optionMap: pageContainersMap,
				optionId: "componentProps",
			},
		],
	},
};
