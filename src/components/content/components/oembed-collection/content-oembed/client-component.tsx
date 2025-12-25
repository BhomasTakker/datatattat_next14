"use client";

import styles from "./client-component.module.scss";

type ClientOembedProps = {
	html: string;
};

export const ClientOembed = ({ html }: ClientOembedProps) => {
	return (
		<div
			className={styles.root}
			data-testid="client-oembed"
			dangerouslySetInnerHTML={{
				__html: html,
			}}
		></div>
	);
};

export const ClientOembedTemplate = () => {
	return (
		<div className={styles.template} data-testid="client-oembed-template">
			<div className={styles.image} />
		</div>
	);
};
