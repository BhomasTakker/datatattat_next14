import Spotify from "next-auth/providers/spotify";
import { loginOrSignUp } from "../user-login";
import { returnUser } from "../user-return";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

export const SPOTIFY = Spotify({
	async profile(profile) {
		const user = await loginOrSignUp(profile, "spotify");
		return returnUser(profile, user, "spotify");
	},
	clientId: SPOTIFY_CLIENT_ID || "",
	clientSecret: SPOTIFY_CLIENT_SECRET || "",
});
