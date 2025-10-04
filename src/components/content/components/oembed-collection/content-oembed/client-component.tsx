"use client";

import { InViewComponent } from "@/components/ui/in-view/in-view";
import styles from "./client-component.module.scss";

type ClientOembedProps = {
	html: string;
};

export const ClientOembed = ({ html }: ClientOembedProps) => {
	return (
		<InViewComponent
			options={{
				threshold: 0,
				triggerOnce: true,
			}}
			template={<div className={styles.root}></div>}
		>
			<div
				className={styles.root}
				data-testid="client-oembed"
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			></div>
		</InViewComponent>
	);
};
