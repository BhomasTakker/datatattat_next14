import { PageComponent } from "@/types/page";
import { ComponentProfile } from "./component-profile/component-profile";
import { ComponentFactory } from "./components/component-factory";
import { ComponentProfileProps } from "@/types/component";
import styles from "./component-display.module.scss";
import { Suspense } from "react";

export const ComponentDisplay = ({
	component,
	isClient = false,
}: {
	component: PageComponent;
	isClient?: boolean;
}) => {
	const { componentProps } = component;

	const Template = (
		<ComponentFactory
			component={component}
			isClient={isClient}
			isTemplate={true}
		/>
	);

	// We should also catch in an error boundary
	// If don't load or no data - fallback to don't render component

	return (
		<section className={styles.component} data-testid="component">
			<ComponentProfile profile={componentProps as ComponentProfileProps} />

			{/* We need to create a template component */}
			<Suspense fallback={<div className={styles.suspense}>{Template}</div>}>
				<ComponentFactory component={component} isClient={isClient} />
			</Suspense>
		</section>
	);
};
