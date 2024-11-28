import { Navigate } from "./navigate";

type Interactions = typeof Navigate;

export enum InteractionsOptions {
	Navigate = "navigate",
}

// essentially now
// When we need to our interaction component can be a client component
// We need a client component to play the media, etc
export const InteractionsMap = new Map<InteractionsOptions, Interactions>([
	[InteractionsOptions.Navigate, Navigate],
]);
