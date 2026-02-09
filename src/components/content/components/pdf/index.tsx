"use client";

import dynamic from "next/dynamic";

// Dynamically import the PDFViewer component to avoid SSR issues with react-pdf
// We may want this to be a more generic dynamic loader in the future if we have more components with SSR issues
export const PDFViewer = dynamic(
	() =>
		import("./pdf-viewer").then((mod) => ({
			default: mod.PDFViewer,
		})),
	{
		ssr: false,
		loading: () => <div>Loading PDF viewer...</div>,
	},
);
