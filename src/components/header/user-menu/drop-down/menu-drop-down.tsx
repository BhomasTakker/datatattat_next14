import { PropsWithChildren, ReactNode } from "react";
import styles from "./menu-drop-down.module.scss";
import Link from "next/link";
import { BiSolidUser } from "react-icons/bi";
import { PATHS } from "@/lib/routing/paths";
import { usePathname } from "next/navigation";

type DropDownItemProps = {
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	href: string;
};

type PropfileItemProps = {
	username: string;
	avatar: string;
};

export type DropDownProps = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
} & PropfileItemProps;

const DropDownItem = ({
	children,
	leftIcon,
	rightIcon,
	href,
}: PropsWithChildren<DropDownItemProps>) => {
	return (
		<li>
			<Link href={href}>
				<div className={styles.dropDownItem}>
					{leftIcon ? (
						<span className={styles.leftIcon}>{leftIcon}</span>
					) : null}
					{children}
					<span className={styles.rightIcon}>
						{rightIcon ? rightIcon : null}
					</span>
				</div>
			</Link>
		</li>
	);
};

const ProfileItem = ({ avatar, username }: PropfileItemProps) => {
	return (
		<li className={styles.profile}>
			<img
				className={styles.profileImage}
				src={avatar}
				alt={`${username} profile picture`}
			/>
			<h4>{username}</h4>
		</li>
	);
};

export const MenuDropDown = ({
	isOpen,
	setIsOpen,
	avatar,
	username,
}: DropDownProps) => {
	const pathname = usePathname();
	return (
		<div className={`${styles.dropdown} ${isOpen ? styles.open : ""} `}>
			<ul>
				<ProfileItem avatar={avatar} username={username} />
				<DropDownItem
					href={PATHS.profile(username)}
					rightIcon={<BiSolidUser size="24" />}
				>
					Profile
				</DropDownItem>
				<DropDownItem href={PATHS.user(username)}>User Home</DropDownItem>
				<DropDownItem href={PATHS.edit()}>Edit</DropDownItem>
				<DropDownItem href={PATHS.signOut(pathname)}>Sign Out</DropDownItem>
			</ul>
		</div>
	);
};
