import { GithubProfile } from "next-auth/providers/github";
import { GoogleProfile } from "next-auth/providers/google";
import { SpotifyProfile } from "next-auth/providers/spotify";
import { Providers } from "./types";

export const createGoogleUser = (
	profile: GoogleProfile,
	id: Providers,
	username: string
) => ({
	signup_completed: false,
	signin_method: id,
	signin_name: profile.name,
	signin_email: profile.email || "", // shouldn't be nothing surely?
	avatar: profile.picture,
	username,
	role: "standard",
});

export const createGithubUser = (
	profile: GithubProfile,
	id: Providers,
	username: string
) => ({
	signup_completed: false,
	signin_method: id,
	signin_name: profile.login,
	signin_email: profile.email || "", // shouldn't be nothing surely?
	avatar: profile.avatar_url,
	username,
	role: "standard",
});

export const createSpotifyUser = (
	profile: SpotifyProfile,
	id: Providers,
	username: string
) => ({
	signup_completed: false,
	signin_method: id,
	signin_name: profile.login,
	signin_email: profile.email || "", // shouldn't be nothing surely?
	avatar: profile.avatar_url,
	username,
	role: "standard",
});
