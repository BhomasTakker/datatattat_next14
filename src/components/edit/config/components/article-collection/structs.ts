import { ArticleCollectionVariants } from "@/components/content/components/article-collection/variant-map";
import { QueryOptions } from "../../query/_with-config";
import { AUDIO_DISPLAY } from "./collections/audio-display/audio-display";
import { GRID_DISPLAY } from "./collections/grid/gridDisplay";
import { STACK_COLUMNS_CONFIG } from "./collections/stack/stack-columns";
import { STACK_SCROLLER_CONFIG } from "./collections/stack/stack-scroller";
import { VIDEO_DISPLAY } from "./collections/video-display/video-display";

type articleCollectionProps =
	| typeof STACK_SCROLLER_CONFIG
	| typeof STACK_COLUMNS_CONFIG
	| typeof GRID_DISPLAY;

export const articleCollectionsMap = new Map<string, articleCollectionProps>([
	[ArticleCollectionVariants.StackScroller, STACK_SCROLLER_CONFIG],
	[ArticleCollectionVariants.StackColumns, STACK_COLUMNS_CONFIG],
	[ArticleCollectionVariants.gridDisplay5, GRID_DISPLAY],
	[ArticleCollectionVariants.gridDisplay7, GRID_DISPLAY],
	[ArticleCollectionVariants.videoDisplay, VIDEO_DISPLAY],
	[ArticleCollectionVariants.audioDisplay, AUDIO_DISPLAY],
]);
