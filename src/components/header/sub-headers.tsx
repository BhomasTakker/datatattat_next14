import React, { ReactElement } from "react";
import { NavigationMenu } from "./navigation/navigation-menu";
import { HeaderType } from "@/types/header";

const renderSubMenu = (item: HeaderType, index: number): ReactElement => {
	const { nav = [] } = item || {};
	return <NavigationMenu items={nav} key={index} />;
};

const renderList = (list: HeaderType[]): ReactElement => {
	return <div>{list.map(renderSubMenu)}</div>;
};

const trimList = (list: HeaderType[]) => {
	const { length } = list;
	// Should use a config value?
	return length <= 2 ? list : list.slice(length - 2);
};

export const SubHeaders = ({
	headersArray,
}: {
	headersArray: HeaderType[];
}) => {
	if (!headersArray || headersArray.length === 0) {
		return null;
	}

	// Take in list and reverse
	const reversedList = headersArray.reverse();

	const trimmedList = trimList(reversedList);

	return renderList(trimmedList);
};
