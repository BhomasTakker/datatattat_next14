import mongoose from "mongoose";
import { IContentView } from "./IContentView";
import { createContentViewSchema } from "./contentViewSchemaFactory";

const ContentViewPastDaySchema = createContentViewSchema(86400);

export const ContentViewPastDay =
	mongoose.models.ContentViewPastDay ||
	mongoose.model<IContentView>("ContentViewPastDay", ContentViewPastDaySchema);
