"use client";

import { IPage } from "@/types/page";
import Link from "next/link";
import styles from "./user-pages.module.scss";
import { IconButton } from "@/components/ui/icon-button";
import { MdDelete } from "react-icons/md";
import { deleteByRoute, getPagesForUser } from "@/actions/page/page-actions";
import { useEffect, useState } from "react";
import { AddPageMenu } from "./add-page-menu";
import { createPageByRoute } from "@/actions/edit/update-page";
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
		console.log(`delete me ${page.route}`);
		console.dir(page, { depth: null });

		const result = await deleteByRoute(page.route);
		// returns the deleted page
		console.log({ result });

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

	const getPages = async () => {
		const userPages = await getPagesForUser(user_id);
		setPages(userPages);
	};

	useEffect(() => {
		getPages();
	}, []);

	const onAddHandler = async (route: string) => {
		console.log("add me");

		// admin or not?
		const newRoute = `${userRoute}/${route}`;

		// We need to check this on server side
		const result = await createPageByRoute(newRoute);

		console.log("Page creation result", { result });

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

				<h1>User Pages</h1>
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
		console.log("add me");

		// admin or not?
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
