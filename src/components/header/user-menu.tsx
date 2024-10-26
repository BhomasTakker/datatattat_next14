"use client";

import { PATHS } from "@/lib/routing/paths";
import Link from "next/link";
import { BiSolidUser } from "react-icons/bi";
import styles from "./user-menu.module.scss";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export const UserMenu = () => {
	const { data } = useSession();
	const pathname = usePathname();
	const modalRef = useRef<HTMLDialogElement>(null);

	const openModal = () => {
		if (modalRef.current) {
			modalRef.current.showModal();
		}
	};
	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	};

	return (
		<div>
			<button className={styles.menuButton} onClick={openModal}>
				<BiSolidUser size={"2rem"} />
			</button>
			<dialog ref={modalRef} className={styles.menu} onBlur={closeModal}>
				<ul>
					{/* // callback to current page */}
					<li>
						<Link href={PATHS.signOut(pathname)}>Sign Out</Link>
					</li>
					<li>
						{/* add page query? */}
						<Link href={PATHS.edit()}>Edit</Link>
					</li>
					{data?.user?.name ? (
						<li>
							<Link href={PATHS.user(data?.user?.name || "")}>User Page</Link>
						</li>
					) : null}
				</ul>
			</dialog>
		</div>
	);
};
