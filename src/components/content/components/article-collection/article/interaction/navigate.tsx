import Link from "next/link";

type BaseProps = {
	children: React.ReactNode;
};

export type NavigateProps = {
	href: string; //should be a valid URL
};

export const Navigate = ({ children, href }: NavigateProps & BaseProps) => {
	return <Link href={href}>{children}</Link>;
};
