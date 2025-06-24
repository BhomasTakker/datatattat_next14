"use client";

type ClientOembedProps = {
	oembedData: any;
};

// Take in html
// sanitise it
// Render it
export const ClientOembed = ({ oembedData }: ClientOembedProps) => {
	return (
		<div>
			<div
				dangerouslySetInnerHTML={{
					__html: oembedData ? oembedData.html : "",
				}}
			></div>
		</div>
	);
};
