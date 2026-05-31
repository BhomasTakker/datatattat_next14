import mongoose from "mongoose";
import { IContentView } from "./IContentView";
import { createContentViewSchema } from "./contentViewSchemaFactory";

const ContentViewPastHourSchema = createContentViewSchema(3600);

export const ContentViewPastHour =
	mongoose.models.ContentViewPastHour ||
	mongoose.model<IContentView>(
		"ContentViewPastHour",
		ContentViewPastHourSchema,
	);
