import Link from "next/link";

type AdminNavProps = {
	levels: string[];
	isAdmin: boolean;
};

export const AdminNav = ({ levels, isAdmin }: AdminNavProps) => {
	return (
		<nav>
			{isAdmin ? (
				<ul>
					<Link href="/edit">Edit</Link>
				</ul>
			) : (
				<Link href="/admin">Admin</Link>
			)}
		</nav>
	);
};
