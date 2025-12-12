"use client";

import { PaginationForm } from "./forms/pagination.form";
import { SimpleTable } from "./simple-table";
import { useEffect, useState } from "react";

type PaginatedData = {
	data: Record<string, unknown>[];
	pagination: {
		total: number;
		page: number;
		pages: number;
		limit: number;
	};
};

type PaginatedTable = {
	paginatedData: PaginatedData;
	columns: string[];
	query?: { [key: string]: any };
	fetchPaginatedData: (data: {
		page?: string;
		limit?: string;
		[key: string]: any;
	}) => Promise<PaginatedData | null>;
	onSelect?: (item: Record<string, unknown>) => void;
};

export const PaginatedTable = ({
	columns,
	paginatedData,
	query,
	onSelect,
	fetchPaginatedData,
}: PaginatedTable) => {
	const { data } = paginatedData;
	// const { page, pages, limit, total } = pagination;
	const { page, pages, limit } = paginatedData.pagination;
	const [currentPage, setCurrentPage] = useState(page);
	const [tableData, setTableData] = useState(data);
	const [currentLimit, setCurrentLimit] = useState(limit);
	const [pagination, setPagination] = useState(paginatedData.pagination);

	const nextHandler = async () => {
		if (currentPage < pages) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const prevHandler = () => {
		setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
	};

	const submitPaginationHandler = (data: { page?: number; limit?: number }) => {
		if (data.page) setCurrentPage(data.page);
		if (data.limit && data.limit !== currentLimit) {
			setCurrentLimit(data.limit);
			// form set limit etc
			setCurrentPage(data.page || 1); // Reset to first page when limit changes
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchPaginatedData({
				...query,
				page: currentPage.toString(),
				limit: currentLimit.toString(),
			});
			if (result && result.data) setTableData(result.data);
			if (result && result.pagination) setPagination(result.pagination);
		};
		fetchData();
	}, [currentPage, currentLimit]);

	return (
		<div>
			<PaginationForm
				next={nextHandler}
				prev={prevHandler}
				update={submitPaginationHandler}
				pagination={pagination}
			/>
			<SimpleTable columns={columns} data={tableData} onSelect={onSelect} />
		</div>
	);
};
