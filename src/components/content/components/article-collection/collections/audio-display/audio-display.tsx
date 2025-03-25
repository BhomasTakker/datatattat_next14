import { UnknownObject } from "@/types/utils";
import { ArticleRenderProps } from "../types";
import styles from "./audio-display.module.scss";
import { AudioDisplayComponent } from "./audio-display-component";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

export type AudioDisplayOptions = {};

const renderMethod = (
	articles: ArticleRenderProps[],
	options: UnknownObject & AudioDisplayOptions
) => {
	// if (!articles || articles.length === 0) return null;

	const MOCK: CollectionItem[] = [
		{
			guid: "1",
			variant: "audio",
			title: "One Thing: Tesla in Trouble",
			src: "https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chrt.fm/track/E31CC9/swap.fm/track/2nzGkisFXQswLYT5s325/traffic.megaphone.fm/WMHY7427046070.mp3?updated=1742582540",
			description:
				"A world-first in Sydney could offer a lifeline for those waiting for a heart transplant. A high school teacher in Pennsylvania created a kindness challenge for her students. The Sports Bra bar is attracting major attention as March Madness kicks off. A New Jersey woman returned a library book that’s nearly a century overdue. Plus, local police and a four-year-old struck a plea deal in Wisconsin after his mom ate his ice cream. Learn more about your ad choices. Visit podcastchoices.com/adchoices",

			avatar: {
				src: "https://megaphone.imgix.net/podcasts/c906f154-29b1-11ef-a458-5fe7bbcbf9c6/image/6b9cbb1420a9630428d8f50a8abe9104.png?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress",
				alt: "Audio 1",
			},
			details: {
				publishers: ["CNN"],
				published: "Sun, 23 Mar 2025 08:30:00 -0000",
				// duration:'1554',
			},
		},
		{
			guid: "2",
			variant: "audio",
			title:
				"5 Good Things: A Sports Bar Where Barriers (and Brackets) Are Broken",
			description:
				"A world-first in Sydney could offer a lifeline for those waiting for a heart transplant. A high school teacher in Pennsylvania created a kindness challenge for her students. The Sports Bra bar is attracting major attention as March Madness kicks off. A New Jersey woman returned a library book that’s nearly a century overdue. Plus, local police and a four-year-old struck a plea deal in Wisconsin after his mom ate his ice cream. Learn more about your ad choices. Visit podcastchoices.com/adchoices",
			src: "https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chrt.fm/track/E31CC9/swap.fm/track/2nzGkisFXQswLYT5s325/traffic.megaphone.fm/WMHY9024621379.mp3?updated=1742580976",
			avatar: {
				src: "https://megaphone.imgix.net/podcasts/97dfdcba-299a-11ef-b327-5716d4562e24/image/317b90525a553bf5745fe21b072975e1.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress",
				alt: "Audio 2",
			},
			details: {
				publishers: ["CNN"],
				published: "Sat, 22 Mar 2025 08:30:00 -0000",
				// duration:'1554',
			},
		},
	];

	return <AudioDisplayComponent articles={MOCK} {...options} />;
};

export const audioDisplay = {
	styles: styles,
	renderMethod: renderMethod,
};
