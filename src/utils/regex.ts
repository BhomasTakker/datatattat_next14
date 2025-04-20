export const patterns = {
	// Matches for a basic username - start letter followed by letters, digits, or hyphens
	// and must be between 3 and 16 characters long
	username: {
		regex: /^\w[\d\w-]{2,15}$/,
		message:
			"Username must be 3-16 characters long and can only contain letters, numbers, and hyphens.",
	},
	// Matches for a basic slug - start letter followed by letters, digits, or hyphens
	// unlimited number of segments separated by slashes
	// should probably have a limit for segments and in total length
	pageSlug: {
		regex: /^[a-z\d_-]+(\/[a-z\d_-]+)*$/,

		message: "Route must be a valid slug!",
	},
} as const;
