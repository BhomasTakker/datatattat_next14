import { ComponentProfileProps, PageComponent } from "@/types/page";
import { ComponentProfile } from "./component-profile/component-profile";
import { ComponentFactory } from "./components/component-factory";

export const ComponentDisplay = ({
	component,
}: {
	component: PageComponent;
}) => {
	const { componentProps } = component;

	return (
		<section data-testid="component">
			<ComponentProfile profile={componentProps as ComponentProfileProps} />
			<ComponentFactory component={component} />
		</section>
	);
};
