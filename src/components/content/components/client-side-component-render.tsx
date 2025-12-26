"use client";

import { PageComponent } from "@/types/page";
import { UnknownObject } from "@/types/utils";
import { useEffect, useState } from "react";
import { ComponentType } from "./component-map";
import { With } from "@/types/component";

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
	const { _with: componentQueryObject, componentProps } = component;
	const { _with: componentPropsQueryObject } = componentProps || {};
	const [componentData, setComponentData] = useState<UnknownObject | null>(
		null
	);
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		const getComponentData = async () => {
			try {
				const data = await getData(
					componentQueryObject || componentPropsQueryObject
				);
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
		// get component and render template while loading data
		return <div>Loading...</div>;
	}

	return (
		<Component component={component} dataObject={{ data: componentData }} />
	);
};
