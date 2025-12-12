"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./pagination.form.module.scss";
import { PAGINATION_FORM_CONFIG } from "./pagination.form.config";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PaginationDisplay } from "./pagination-display";

type UpdatePagination = {
	limit?: number;
	page?: number;
};

export type Pagination = {
	total: number;
	page: number;
	pages: number;
	limit: number;
};

type PaginationForm = {
	next: () => void;
	prev: () => void;
	// goToPage: (page: number) => void;
	update: (data: UpdatePagination) => void;
	pagination: Pagination;
};

export const PaginationForm = ({
	next,
	prev,
	update,
	pagination,
}: PaginationForm) => {
	const methods = useForm();

	const submitHandler = methods.handleSubmit(async (data) => {
		update({ page: data.page, limit: data.limit });
	});

	const prevHandler = methods.handleSubmit(async (_data) => {
		prev();
	});

	const nextHandler = methods.handleSubmit(async (_data) => {
		next();
	});

	// We need a - generic header bar form layout??
	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<div className={styles.paginationControls}>
					<div className={styles.pageNavigation}>
						<Button onClick={prevHandler} classes={styles.navButton}>
							<FaChevronLeft />
							<span>Previous</span>
						</Button>
						<Button onClick={nextHandler} classes={styles.navButton}>
							<span>Next</span>
							<FaChevronRight />
						</Button>
					</div>
					<div className={styles.paginationInputs}>
						<InputFactory data={PAGINATION_FORM_CONFIG} />
					</div>
					<Button type="submit" classes={styles.submitButton}>
						Apply
					</Button>
				</div>
				<PaginationDisplay pagination={pagination} />
			</form>
		</FormProvider>
	);
};
