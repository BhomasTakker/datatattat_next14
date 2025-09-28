import { PageComponentFactory } from "@/components/page/components/page-component-factory";
import { IPage } from "@/types/page";
import styles from "./page-preview.module.scss";

type Props = {
	pageData: IPage;
};

export const PagePreview = ({ pageData }: Props) => {
	const { content } = pageData || {};
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<PageComponentFactory isClient={true} content={content} />
			</div>
		</div>
	);
};
