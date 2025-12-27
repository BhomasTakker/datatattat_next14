"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../form.module.scss";
import { useRouter } from "next/navigation";
import { getSources, gotoSource } from "@/actions/cms/source";
import { FETCH_SOURCES_CONFIG } from "../../config/fetch-sources.config";
import { useState } from "react";
import { PaginatedData } from "@/types/data-structures/paginated";
import { CMSTitle } from "../../title/cms-title";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";

export const FetchSourcesCMSForm = () => {
	const methods = useForm();
	const router = useRouter();
	const [sourcesData, setSourcesData] = useState<PaginatedData | null>(null);
	const [searchQuery, setSearchQuery] = useState({});

	// Shoyuld be get sources.
	// This is  list rathe then a single item fetch.
	const submitHandler = methods.handleSubmit(async (data) => {
		const sourcesData = await getSources({
			name: data.name,
		});

		setSourcesData(sourcesData);
		setSearchQuery({ name: data.name });
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<h2>Fetch Sources CMS Form</h2>
				<InputFactory data={{ ...FETCH_SOURCES_CONFIG }} />
				<Button type="submit">Submit</Button>
			</form>
			{sourcesData && (
				<>
					{/* Different title component */}
					<CMSTitle title="Search Results" />
					<PaginatedTable
						columns={["name", "collectionTitle", "variant", "src"]}
						query={searchQuery}
						paginatedData={sourcesData}
						fetchPaginatedData={getSources}
						onSelect={gotoSource}
					/>
				</>
			)}
		</FormProvider>
	);
};
