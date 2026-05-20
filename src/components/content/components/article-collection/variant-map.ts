import { audioDisplay } from "./collections/audio-display/audio-display";
import { gridDisplay5, gridDisplay7 } from "./collections/grid-display/display";
import stackColumns from "./collections/stack-columns/stack-columns";
import stackScroller from "./collections/stack-scroller/stack-scroller";
import { videoDisplay } from "./collections/video-display/video-display";
import timelineDay from "./collections/timeline-day/timeline-day";
import { ArticleCollectionVariants } from "./variants";

// we culd do this bette
// type is only different in the renderMethod - JSX.Element & JSX.Element[]
type Variants =
	| typeof stackScroller
	| typeof stackColumns
	| typeof gridDisplay5
	| typeof gridDisplay7
	| typeof audioDisplay
	| typeof videoDisplay
	| typeof timelineDay;

export const VariantsMap = new Map<ArticleCollectionVariants, Variants>([
	[ArticleCollectionVariants.StackScroller, stackScroller],
	[ArticleCollectionVariants.StackColumns, stackColumns],
	[ArticleCollectionVariants.gridDisplay5, gridDisplay5],
	[ArticleCollectionVariants.gridDisplay7, gridDisplay7],
	[ArticleCollectionVariants.videoDisplay, videoDisplay],
	[ArticleCollectionVariants.audioDisplay, audioDisplay],
	[ArticleCollectionVariants.TimelineDay, timelineDay],
]);
