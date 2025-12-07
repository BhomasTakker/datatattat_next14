import isSignupComplete from "@/actions/signup/signup-completed";
import isValidSession from "@/actions/auth/check-session";
import { isAdminUser, isValidUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";

// export const dynamic = "force-dynamic";

/**
 * 
  fetch('/cms/articles/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your-secret-api-key-here'
  },
  body: JSON.stringify({ disabled: true })
})
 */

const CMS_API_KEY = process.env.CMS_API_KEY || "";
const CMS_ROUTE = process.env.CMS_ROUTE || "";

export default async function Page() {
	await connectToMongoDB();
	await isValidSession();
	await isSignupComplete();
	const { username } = await isAdminUser();

	if (!username) {
		console.error("User is not valid or username is missing.");
		return null;
	}

	const stuff = await fetch(
		`${CMS_ROUTE}/articles/get?src=https://www.bbc.com/news/articles/cpvjglwlyx9o`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": CMS_API_KEY,
			},
			// body: JSON.stringify({ disabled: true }),
		}
	)
		.then((res) => res.json())
		.catch((err) => {
			console.error("Error fetching article:", err);
			return null;
		});

	console.log("Update response:", { stuff });

	return (
		<div>
			<h1>CMS Page for {username}</h1>
		</div>
	);
}
