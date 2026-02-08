import { ArticleCollection } from "./article-collection/article-collection";
import { DisplayPlayer } from "./display-player/display-player";
import { MediaPlayer } from "./media-player/media-player";
import { OembedCollection } from "./oembed-collection/oembed-collection";
import { PDFViewer } from "./pdf/pdf-viewer";
import { SpotifyCollection } from "./spotify-collection/spotify-collection";

export type ComponentType =
	| typeof ArticleCollection
	| typeof DisplayPlayer
	| typeof MediaPlayer
	| typeof OembedCollection
	| typeof SpotifyCollection
	| typeof PDFViewer;

export enum ComponentsOptions {
	ArticleCollection = "ArticleCollection",
	ContentOembed = "Oembed",
	OembedCollection = "OembedCollection",
	SpotifyCollection = "SpotifyCollection",
	PDFViewer = "PDFViewer",
	// deprecated?
	BlueSky = "BlueSky",

	DisplayPlayer = "DisplayPlayer",
	MediaPlayer = "MediaPlayer",
}

export const ComponentsMap = new Map<ComponentsOptions, ComponentType>([
	[ComponentsOptions.ArticleCollection, ArticleCollection],
	[ComponentsOptions.OembedCollection, OembedCollection],
	[ComponentsOptions.SpotifyCollection, SpotifyCollection],

	[ComponentsOptions.DisplayPlayer, DisplayPlayer],
	[ComponentsOptions.MediaPlayer, MediaPlayer],
	[ComponentsOptions.PDFViewer, PDFViewer],
]);
