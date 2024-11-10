import { PageComponent } from "@/types/page";
import { ComponentProfile } from "./component-profile/component-profile";
import { ComponentFactory } from "./components/component-factory";

export const ComponentDisplay = ({
	component,
}: {
	component: PageComponent;
}) => {
	return (
		<section data-testid="component">
			<ComponentProfile profile={{}} />
			<ComponentFactory component={component} />
		</section>
	);
};
