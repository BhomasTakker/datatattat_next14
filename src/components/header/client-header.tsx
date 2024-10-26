"use client";

import { getMainHeader, getSubHeaders } from "@/actions/header/get-header";
import { HeaderType } from "@/types/header";
import { NavigationMenu } from "./navigation/navigation-menu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SubHeaders } from "./sub-headers";

// Next 14 we will cache the header
// Next 15 will not
// We need to cache and bust by route
export const ClientHeader = () => {
	const pathname = usePathname();
	const [header, setHeader] = useState<HeaderType>();
	const [subHeaders, setSubHeaders] = useState<HeaderType[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const header = await getMainHeader();
			const subHeaders = await getSubHeaders("/new-test");
			setHeader(header);
			setSubHeaders(subHeaders);
		};
		fetchData();
	}, [pathname]);

	console.log({ pathname, subHeaders });

	return (
		<>
			{header ? <NavigationMenu items={header.nav} /> : null}
			{subHeaders ? <SubHeaders headersArray={subHeaders} /> : null}
		</>
	);
};
