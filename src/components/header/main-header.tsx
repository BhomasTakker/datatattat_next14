import { getServerSession } from "next-auth";
import { NavigationHeader } from "./navigation-header";
import { NavigationMenu } from "./navigation/navigation-menu";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { signIn, signOut } from "@/lib/routing/paths";

const items = [
	{
		label: "Home",
		route: "/",
	},
	{
		label: "Member",
		route: "/Member",
	},
	{
		label: "ClientMember",
		route: "/ClientMember",
	},
];

export const MainHeader = async () => {
	const session = await getServerSession(options);

	return (
		<header>
			<NavigationHeader />
			<NavigationMenu items={items} />
			{session ? (
				<Link href={signOut("/")}>Logout</Link>
			) : (
				<Link href={signIn("/")}>Login</Link>
			)}
		</header>
	);
};
