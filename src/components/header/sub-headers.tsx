import React, { ReactElement } from "react";
import { NavigationMenu } from "./navigation/navigation-menu";
import { HeaderType } from "@/types/header";

const trimList = (list: HeaderType[]) => {
	const { length } = list;
	// Should use a config value?
	return length <= 2 ? list : list.slice(length - 2);
};

export const SubHeaders = ({
	headersArray,
	prefix = "",
}: {
	headersArray: HeaderType[];
	prefix?: string;
}) => {
	if (!headersArray || headersArray.length === 0) {
		return null;
	}

	const renderSubMenu = (item: HeaderType, index: number): ReactElement<any> => {
		const { nav = [] } = item || {};
		return <NavigationMenu items={nav} key={index} prefix={prefix} />;
	};

	const renderList = (list: HeaderType[]): ReactElement<any> => {
		return <div>{list.map(renderSubMenu)}</div>;
	};

	// Take in list and reverse
	const reversedList = headersArray.reverse();

	const trimmedList = trimList(reversedList);

	return renderList(trimmedList);
};
