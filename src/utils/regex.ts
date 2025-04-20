export const patterns = {
	// Matches for a basic username - start letter followed by letters, digits, or hyphens
	// and must be between 3 and 16 characters long
	username: /^\w[\d\w-]{2,15}$/,
	// Matches for a basic slug - start letter followed by letters, digits, or hyphens
	// unlimited number of segments separated by slashes
	// should probably have a limit for segments and in total length
	slug: /^[a-z\d_-]+(\/[a-z\d_-]+)*$/,
} as const;
