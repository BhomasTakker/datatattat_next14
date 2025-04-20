"use client";

import { IPage } from "@/types/page";
import Link from "next/link";
import styles from "./user-pages.module.scss";
import { IconButton } from "@/components/ui/icon-button";
import { MdDelete } from "react-icons/md";
import { getPagesForUser } from "@/actions/page/page-actions";
import { useEffect, useState } from "react";
import { AddPageMenu } from "./add-page-menu";
import { createPageByRoute, deleteByRoute } from "@/actions/edit/update-page";
import { User } from "@/types/auth/session";

type UserPages = {
	user: User;
};

type UserPage = {
	page: IPage;
	updateHandler: () => void;
};

// if admin?
const UserPage = ({ page, updateHandler }: UserPage) => {
	const onDeleteHandler = async () => {
		await deleteByRoute(page.route);

		updateHandler();
		// update the UI / refetch data
	};
	// We also need to check if the user is an admin, etc
	const isLinkAdmin = !page.route.includes("users");
	const link = isLinkAdmin ? `/admin${page.route}` : `/edit${page.route}`;
	return (
		<li key={page.route} className={styles.listItem}>
			<Link className={styles.link} href={link}>
				{page.route}
			</Link>
			<IconButton icon={MdDelete} onClick={() => onDeleteHandler()} />
		</li>
	);
};

// We shouldn't be a client component
export const UserPages = ({ user }: UserPages) => {
	const [pages, setPages] = useState<IPage[]>([]);
	const { user_id, name } = user;
	const userRoute = `/users/${name}`;

	// Probably this
	// if get fails or times out for whatever reason
	// we are never going to try again or notify
	const getPages = async () => {
		const userPages = await getPagesForUser(user_id);
		setPages(userPages);
	};

	useEffect(() => {
		getPages();
	}, []);

	const onAddHandler = async (route: string) => {
		const newRoute = `${userRoute}/${route}`;

		// We need to check this on server side
		const result = await createPageByRoute(newRoute);

		const success = result?.success;
		if (!success) {
			console.error("Error creating page", { result });
			return;
		}

		getPages();
		// create page - by creating a route and saving it to the db
		// redirect to the page
		// add the re get pages / updateHandler
	};
	return (
		<section>
			<div className={styles.header}>
				{/* Do a sort of header I guess? */}

				<h3>User Pages</h3>
				<AddPageMenu
					createPageHandler={onAddHandler}
					routePrefix={`${userRoute}/`}
				/>
				{/* <IconButton icon={MdAdd} onClick={() => onAddHandler()} /> */}
				{/* <Button>Create Page</Button> */}
			</div>

			<ul className={styles.list}>
				{pages.map((page) => (
					<UserPage page={page} key={page.route} updateHandler={getPages} />
				))}
			</ul>
		</section>
	);
};

// We shouldn't be a client component
export const AdminPages = ({ user }: UserPages) => {
	const [pages, setPages] = useState<IPage[]>([]);
	const { user_id, name } = user;
	const adminRoute = "/";

	const getPages = async () => {
		const userPages = await getPagesForUser(user_id);
		setPages(userPages);
	};

	useEffect(() => {
		getPages();
	}, []);

	const onAddHandler = async (route: string) => {
		const newRoute = `${adminRoute}${route}`;

		// We need to check this on server side
		const result = await createPageByRoute(newRoute);

		const success = result?.success;
		if (!success) {
			console.error("Error creating page", { result });
			return;
		}

		getPages();
	};
	return (
		<section>
			<div className={styles.header}>
				{/* Do a sort of header I guess? */}

				<h1>User Pages</h1>
				<AddPageMenu
					createPageHandler={onAddHandler}
					routePrefix={adminRoute}
				/>
				{/* <IconButton icon={MdAdd} onClick={() => onAddHandler()} /> */}
				{/* <Button>Create Page</Button> */}
			</div>

			<ul className={styles.list}>
				{pages.map((page) => (
					<UserPage page={page} key={page.route} updateHandler={getPages} />
				))}
			</ul>
		</section>
	);
};
