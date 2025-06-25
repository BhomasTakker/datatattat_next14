"use client";

type ClientOembedProps = {
	html: string;
};

export const ClientOembed = ({ html }: ClientOembedProps) => {
	return (
		<div>
			<div
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			></div>
		</div>
	);
};
