"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type UsePopStateOptions = {
	handlePopState: () => void;
};

export const usePopState = ({ handlePopState }: UsePopStateOptions): void => {
	const router = useRouter();
	useEffect(() => {
		window.addEventListener("popstate", handlePopState);
		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [router]);
};
