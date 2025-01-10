import Google from "next-auth/providers/google";
import { createNewUser, getUserBySignInEmail } from "@/lib/mongo/actions/user";
import { checkAndCreateUsername } from "@/actions/signup/check-create-username";

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;

// instead of throwing an error, we could just not include the provider
if (!GOOGLE_CLIENT_ID || !GOOGLE_SECRET) {
	throw new Error("Google ID and Secret not found");
}

// Google sign in will potentially go stale
// There is a warning in the docs about this
// https://next-auth.js.org/providers/google
// https://developers.google.com/identity/protocols/oauth2/openid-connect#expiration
// we perhaps shouldn't use?

/*
iss: 'https://accounts.google.com',
    azp: '243011685091-qt10s6id4j73baubac8g8b43mg2ter66.apps.googleusercontent.com',
    aud: '243011685091-qt10s6id4j73baubac8g8b43mg2ter66.apps.googleusercontent.com',
    sub: '103939997315334294149',
    email: 'tom.thomas.bakker@gmail.com',
    email_verified: true,
    at_hash: 'Ghc5Kx1F0sj-ld7ZUjQXFw',
    name: 'Thomas Bakker',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocLoeuSyfGSK_Vfkrsw_Fcfi9-73_yTuwXsOybZDKHGI4fOHjQ=s96-c',
    given_name: 'Thomas',
    family_name: 'Bakker',
    iat: 1736274233,
    exp: 1736277833 */

export const GOOGLE = Google({
	// profile: createProfile(Providers.GOOGLE),
	async profile(profile) {
		// try catch this
		// what do we do/return if a failure?
		let user = await getUserBySignInEmail(profile.email || "");

		const username = profile.name || profile.login;
		// do we need some kind of fail safe? what if this fails?
		const uniqueUsername = await checkAndCreateUsername(username);

		// if  profile.email_verifiedis false
		// we should reject this

		if (!user) {
			user = await createNewUser({
				signup_completed: false,
				signin_method: "google",
				signin_name: profile.name,
				signin_email: profile.email || "", // shouldn't be nothing surely?
				avatar: profile.picture,
				username: uniqueUsername,
				role: "standard",
				// email_verified: profile.email_verified,
			});
		}

		return {
			...profile,
			name: user.username,
			image: user.avatar,
			// not sure this is correct / use user_id surely??
			id: user._id.toString(),
			user_id: user._id.toString(),
		};
	},
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_SECRET,
});
