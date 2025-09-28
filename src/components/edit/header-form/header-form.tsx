"use client";

import { useForm, FormProvider } from "react-hook-form";

import { saveHeader } from "@/actions/edit/update-header";
import { HeaderType } from "@/types/header";
import { NavList } from "./nav/nav-list";
import { Button } from "@/components/ui/button";

import styles from "./header-form.module.scss";
import { User } from "@/types/auth/session";
import { getPagesForUser } from "@/actions/page/page-actions";
import { useEffect, useState } from "react";
import { IPage } from "@/types/page";
import { initToastPromise, ToastType } from "@/lib/sonner/toast";

type HeaderFormProps = {
	headerData: Omit<HeaderType, "createdAt" | "updatedAt">;
	user: User;
};

export const HeaderForm = ({ headerData, user }: HeaderFormProps) => {
	const [pages, setPages] = useState<IPage[]>([]);
	const { user_id } = user;
	const methods = useForm({
		// read up on this / required for unregistering fields
		// use in conjunction with unregister
		shouldUnregister: true,
	});
	const getPages = async () => {
		const userPages = await getPagesForUser(user_id);
		setPages(userPages);
	};

	useEffect(() => {
		getPages();
	}, []);

	const { handleSubmit } = methods;
	const { route, nav } = headerData;

	const onSubmit = handleSubmit(async (data) => {
		initToastPromise({
			cb: () => saveHeader(route, data),
			id: ToastType.SaveHeader,
		});
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit} className={styles.form}>
				<NavList links={nav} pages={pages} />
				<Button type="submit">Submit</Button>
			</form>
		</FormProvider>
	);
};
