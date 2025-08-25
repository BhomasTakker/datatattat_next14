"use server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "";
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "";
const SPOTIFY_TOKEN_PATH = "https://accounts.spotify.com/api/token";

// dupe with mongo
// can we create a utils for this kind of thing?
// Should at least order/structure as a specific type of thing
// singleton ish
declare global {
	var spotifyAccessToken: any; // This must be a `var` and not a `let / const`
}

let cached = global.spotifyAccessToken;

if (!cached) {
	cached = global.spotifyAccessToken = {
		token: null,
		promise: null,
		expires: null,
	};
}

export const getSpotifyAccessToken = async () => {
	if (cached.token) {
		return cached.token;
	}

	const expired = cached.expires && Date.now() > cached.expires;

	if (!cached.promise || expired) {
		cached.promise = fetch(SPOTIFY_TOKEN_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "client_credentials",
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
			}),
		});
	}

	try {
		const result = await cached.promise;
		const data = await result.json();
		cached.token = data.access_token;
		cached.expires = Date.now() + data.expires_in * 1000;
	} catch (error) {
		cached.promise = null;
		cached.expires = null;
		console.error("Failed to fetch access token");
		throw error;
	}

	return cached.token;
};
