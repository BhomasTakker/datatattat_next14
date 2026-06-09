import {
	ContentViewPast12Hours,
	ContentViewPast3Days,
	ContentViewPast3Hours,
	ContentViewPast6Hours,
	ContentViewPastDay,
	ContentViewPastHour,
	ContentViewPastWeek,
} from "@/models/ContentViews";
import { Types } from "mongoose";

enum ContentViewWindow {
	Hour = "Hour",
	ThreeHours = "ThreeHours",
	SixHours = "SixHours",
	TwelveHours = "TwelveHours",
	Day = "Day",
	ThreeDays = "ThreeDays",
	Week = "Week",
}

const contentViewsMap = new Map([
	[ContentViewWindow.Hour, ContentViewPastHour],
	[ContentViewWindow.ThreeHours, ContentViewPast3Hours],
	[ContentViewWindow.SixHours, ContentViewPast6Hours],
	[ContentViewWindow.TwelveHours, ContentViewPast12Hours],
	[ContentViewWindow.Day, ContentViewPastDay],
	[ContentViewWindow.ThreeDays, ContentViewPast3Days],
	[ContentViewWindow.Week, ContentViewPastWeek],
]);

export async function getContentViews(
	contentId: Types.ObjectId,
	id: ContentViewWindow,
) {
	const Model = contentViewsMap.get(id);
	if (!Model) {
		throw new Error(`Invalid window: ${id}`);
	}
	const count = await Model.countDocuments({ contentId });
	return count;
}

export async function createContentView(
	contentId: Types.ObjectId,
	userId: string | undefined,
	id: ContentViewWindow,
) {
	const Model = contentViewsMap.get(id);
	if (!Model) {
		throw new Error(`Invalid window: ${id}`);
	}
	await Model.create({ contentId, userId, timestamp: new Date() });
}

export async function recordContentViewAllWindows(
	contentId: Types.ObjectId,
	userId?: string,
) {
	await Promise.all([
		createContentView(contentId, userId, ContentViewWindow.Hour),
		createContentView(contentId, userId, ContentViewWindow.Day),
		createContentView(contentId, userId, ContentViewWindow.ThreeHours),
		createContentView(contentId, userId, ContentViewWindow.SixHours),
		createContentView(contentId, userId, ContentViewWindow.TwelveHours),
		createContentView(contentId, userId, ContentViewWindow.ThreeDays),
		createContentView(contentId, userId, ContentViewWindow.Week),
	]);
}

export const getAllContentViews = async (contentId: Types.ObjectId) => {
	const [
		hourViews,
		threeHoursViews,
		sixHoursViews,
		twelveHoursViews,
		dayViews,
		threeDaysViews,
		weekViews,
	] = await Promise.all([
		getContentViews(contentId, ContentViewWindow.Hour),
		getContentViews(contentId, ContentViewWindow.ThreeHours),
		getContentViews(contentId, ContentViewWindow.SixHours),
		getContentViews(contentId, ContentViewWindow.TwelveHours),
		getContentViews(contentId, ContentViewWindow.Day),
		getContentViews(contentId, ContentViewWindow.ThreeDays),
		getContentViews(contentId, ContentViewWindow.Week),
	]);
	return {
		hourViews,
		threeHoursViews,
		sixHoursViews,
		twelveHoursViews,
		dayViews,
		threeDaysViews,
		weekViews,
	};
};
