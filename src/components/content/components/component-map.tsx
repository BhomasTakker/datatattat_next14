import { ArticleCollection } from "./article-collection/article-collection";
import { BlueSkyCollection } from "./bluesky-collection/bluesky-collection";
import { ContentOembed } from "./content-oembed/content-oembed";
import { DisplayPlayer } from "./display-player/display-player";
import { MediaPlayer } from "./media-player/media-player";

export type ComponentType =
	| typeof ArticleCollection
	| typeof ContentOembed
	| typeof DisplayPlayer
	| typeof MediaPlayer
	| typeof BlueSkyCollection;

export enum ComponentsOptions {
	ArticleCollection = "ArticleCollection",
	ContentOembed = "Oembed",
	BlueSky = "BlueSky",

	DisplayPlayer = "DisplayPlayer",
	MediaPlayer = "MediaPlayer",
}

export const ComponentsMap = new Map<ComponentsOptions, ComponentType>([
	[ComponentsOptions.ArticleCollection, ArticleCollection],
	[ComponentsOptions.ContentOembed, ContentOembed],
	[ComponentsOptions.DisplayPlayer, DisplayPlayer],
	[ComponentsOptions.MediaPlayer, MediaPlayer],
	[ComponentsOptions.BlueSky, BlueSkyCollection],
]);
