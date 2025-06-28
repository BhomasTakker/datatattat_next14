"use client";

type ClientOembedProps = {
	html: string;
};

export const ClientOembed = ({ html }: ClientOembedProps) => {
	return (
		<div
			data-testid="client-oembed"
			dangerouslySetInnerHTML={{
				__html: html,
			}}
		></div>
	);
};
