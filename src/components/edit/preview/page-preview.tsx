import { PageComponentFactory } from "@/components/page/components/page-component-factory";
import { IPage } from "@/types/page";
import styles from "./page-preview.module.scss";

type Props = {
	pageData: IPage;
};

/**
 *
 * @param param0
 * @returns
 * @description Note:- Currently BlueSky and X fail to render correctly - this will be the same for other social media / embeds - Seems when multiple?
 */

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
