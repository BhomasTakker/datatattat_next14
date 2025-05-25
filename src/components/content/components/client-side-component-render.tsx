"use client";

import { PageComponent, With } from "@/types/page";
import { UnknownObject } from "@/types/utils";
import { useEffect, useState } from "react";
import { ComponentType } from "./component-map";

type ClientSideComponentProps = {
	Component: ComponentType;
	component: PageComponent;
	getData: (queryObject: With) => Promise<UnknownObject>;
};

export const ClientSideComponent = ({
	getData,
	Component,
	component,
}: ClientSideComponentProps) => {
	const { _with: queryObject } = component;
	const [componentData, setComponentData] = useState<UnknownObject | null>(
		null
	);
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		const getComponentData = async () => {
			try {
				const data = await getData(queryObject);
				setComponentData(data);
			} catch {
				setIsError(true);
			}
		};
		getComponentData();
	}, []);

	if (isError) {
		return <div>Error loading data</div>;
	}

	if (!componentData) {
		return <div>Loading...</div>;
	}

	return (
		<Component component={component} dataObject={{ data: componentData }} />
	);
};
