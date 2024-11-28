import { PageComponent } from "@/types/page";
import { ComponentProfile } from "./component-profile/component-profile";
import { ComponentFactory } from "./components/component-factory";
import { ComponentProfileProps } from "@/types/component";
import styles from "./component-display.module.scss";

export const ComponentDisplay = ({
	component,
}: {
	component: PageComponent;
}) => {
	const { componentProps } = component;

	return (
		<section className={styles.component} data-testid="component">
			<ComponentProfile profile={componentProps as ComponentProfileProps} />
			<ComponentFactory component={component} />
		</section>
	);
};
