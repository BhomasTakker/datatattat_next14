import { ObjectId } from "mongoose";
import { GithubProfile } from "next-auth/providers/github";
import { GoogleProfile } from "next-auth/providers/google";
import { SpotifyProfile } from "next-auth/providers/spotify";

export const providers = {
	google: "google",
	github: "github",
	spotify: "spotify",
} as const;

export type Providers = (typeof providers)[keyof typeof providers];
export type ProviderFunction = (
	profile: Profile,
	id: Providers,
	username: string
) => any;

// This prob shouldn't be here
export type User = {
	signup_completed: boolean;
	signin_method: Providers;
	signin_name: string;
	signin_email: string;
	avatar: string;
	username: string;
	role: string;
	_id: ObjectId;
};

export type Profile = GoogleProfile | GithubProfile | SpotifyProfile;
