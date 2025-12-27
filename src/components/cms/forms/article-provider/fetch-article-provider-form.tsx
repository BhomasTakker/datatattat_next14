"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../form.module.scss";
import { getProviders, gotoProvider } from "@/actions/cms/provider";
import { FETCH_PROVIDERS_CONFIG } from "../../config/fetch-providers.config";
import { FormTitle } from "../title/title";
import { useState } from "react";
import { CMSTitle } from "../../title/cms-title";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { PaginatedData } from "@/types/data-structures/paginated";

export const FetchProvidersCMSForm = () => {
	const methods = useForm();
	const [paginatedProviders, setPaginatedProviders] =
		useState<PaginatedData | null>(null);
	const [searchName, setSearchName] = useState("");

	const submitHandler = methods.handleSubmit(async (data) => {
		const providers = await getProviders({
			name: data.name,
		});

		setPaginatedProviders(providers);
		setSearchName(data.name);
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<FormTitle title="Search Providers" subtitle="Search by name." />
				<InputFactory data={{ ...FETCH_PROVIDERS_CONFIG }} />
				<Button type="submit">Submit</Button>
			</form>
			{paginatedProviders && (
				<>
					{/* Different title component */}
					<CMSTitle title="Search Results" />
					<PaginatedTable
						columns={[
							"name",
							"description",
							"url",
							"rating",
							"origin",
							"leaning",
						]}
						query={{
							name: searchName,
						}}
						paginatedData={paginatedProviders}
						fetchPaginatedData={getProviders}
						onSelect={gotoProvider}
					/>
				</>
			)}
		</FormProvider>
	);
};
