import { Types } from "mongoose";
import { ContentViewPastHour } from "@/models/ContentViewsPastHour";
import { ContentViewPastDay } from "@/models/ContentViewsPastDay";

export async function createContentViewPastHour(
	contentId: Types.ObjectId,
	userId?: string,
	timestamp: Date = new Date(),
) {
	await ContentViewPastHour.create({ contentId, userId, timestamp });
}

export async function createContentViewPastDay(
	contentId: Types.ObjectId,
	userId?: string,
	timestamp: Date = new Date(),
) {
	await ContentViewPastDay.create({ contentId, userId, timestamp });
}

export async function recordContentViewAllWindows(
	contentId: Types.ObjectId,
	userId?: string,
	timestamp: Date = new Date(),
) {
	await Promise.all([
		createContentViewPastHour(contentId, userId, timestamp),
		createContentViewPastDay(contentId, userId, timestamp),
		// Add more windowed view functions here as needed
	]);
}
