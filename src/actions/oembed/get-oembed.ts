"use server";

import { OEmbed } from "@/types/data-structures/oembed";

export const getOembed = async (url: string) => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const json = await response.json();
		return json as OEmbed;
	} catch (err) {
		throw new Error(`Failed to fetch oEmbed data: ${err}`);
	}
};
