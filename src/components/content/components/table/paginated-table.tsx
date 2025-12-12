"use client";

import { getProviders } from "@/actions/cms/provider";
import { PaginationForm } from "./forms/pagination.form";
import { SimpleTable } from "./simple-table";
import { useEffect, useState } from "react";
import { set } from "mongoose";

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
};

export const PaginatedTable = ({ columns, paginatedData }: PaginatedTable) => {
	const { data, pagination } = paginatedData;
	const { page, pages, limit, total } = pagination;
	const [currentPage, setCurrentPage] = useState(page);
	const [tableData, setTableData] = useState(data);

	const nextHandler = async () => {
		if (currentPage < pages) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const prevHandler = () => {
		setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
	};

	useEffect(() => {
		const fetchData = async () => {
			const providers = await getProviders({ page: currentPage.toString() });
			if (providers && providers.data) setTableData(providers.data);
		};
		fetchData();
	}, [currentPage]);

	return (
		<div>
			<PaginationForm
				next={nextHandler}
				prev={prevHandler}
				goToPage={(page) => {}}
			/>
			<SimpleTable columns={columns} data={tableData} />
		</div>
	);
};
