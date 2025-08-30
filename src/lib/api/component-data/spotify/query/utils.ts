export const SpotifyVariant = {
	Search: "search",
} as const;

// This should perhaps be the standard way to define types for 'variants'
export type SpotifyVariant =
	(typeof SpotifyVariant)[keyof typeof SpotifyVariant];
