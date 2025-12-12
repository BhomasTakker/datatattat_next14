"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./pagination.form.module.scss";
import { getArticle } from "@/actions/cms/article";
import { useRouter } from "next/navigation";
import { PAGINATION_FORM_CONFIG } from "./pagination.form.config";
import next from "next";

type PaginationForm = {
	next: () => void;
	prev: () => void;
	goToPage: (page: number) => void;
};

export const PaginationForm = ({ next, prev, goToPage }: PaginationForm) => {
	const methods = useForm();
	const router = useRouter();

	const submitHandler = methods.handleSubmit(async (data) => {
		// In this instance we 'should' be able to pass the loaded atricle
		router.push(`/cms/articles/${67}`);
	});

	const prevHandler = methods.handleSubmit(async (data) => {
		// In this instance we 'should' be able to pass the loaded atricle
		prev();
	});

	const nextHandler = methods.handleSubmit(async (data) => {
		// In this instance we 'should' be able to pass the loaded atricle
		next();
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<h2>Pagination Form</h2>
				<InputFactory data={PAGINATION_FORM_CONFIG} />
				<Button onClick={prevHandler}>Previous</Button>
				<Button onClick={nextHandler}>Next</Button>
			</form>
		</FormProvider>
	);
};
