import { Click } from "./click";
import { Navigate } from "./navigate";

type Interactions = typeof Navigate | typeof Click;

export enum InteractionsOptions {
	Navigate = "navigate",
	Click = "click",
}

// essentially now
// When we need to our interaction component can be a client component
// We need a client component to play the media, etc
export const InteractionsMap = new Map<InteractionsOptions, Interactions>([
	[InteractionsOptions.Navigate, Navigate],
	[InteractionsOptions.Click, Click],
]);
