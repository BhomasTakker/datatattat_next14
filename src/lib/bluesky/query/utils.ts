export const BLUESKY_PUBLIC_SERVICE_URL = "https://public.api.bsky.app";
export const BLUESKY_AUTHENTICATED_SERVICE_URL = "https://bsky.social";

export const BlueskyVariant = {
	Search: "search",
	Feed: "feed",
	AuthorFeed: "authorFeed",
	Thread: "thread",
} as const;

// This should perhaps be the standard way to define types for 'variants'
export type BlueskyVariant =
	(typeof BlueskyVariant)[keyof typeof BlueskyVariant];
