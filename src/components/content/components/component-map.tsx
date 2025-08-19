import { ArticleCollection } from "./article-collection/article-collection";
import { DisplayPlayer } from "./display-player/display-player";
import { MediaPlayer } from "./media-player/media-player";
import { OembedCollection } from "./oembed-collection/oembed-collection";

export type ComponentType =
	| typeof ArticleCollection
	| typeof DisplayPlayer
	| typeof MediaPlayer;

export enum ComponentsOptions {
	ArticleCollection = "ArticleCollection",
	ContentOembed = "Oembed",
	OembedCollection = "OembedCollection",
	BlueSky = "BlueSky",

	DisplayPlayer = "DisplayPlayer",
	MediaPlayer = "MediaPlayer",
}

export const ComponentsMap = new Map<ComponentsOptions, ComponentType>([
	[ComponentsOptions.ArticleCollection, ArticleCollection],
	[ComponentsOptions.OembedCollection, OembedCollection],

	[ComponentsOptions.DisplayPlayer, DisplayPlayer],
	[ComponentsOptions.MediaPlayer, MediaPlayer],
]);
