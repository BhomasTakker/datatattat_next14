import { ClickProps } from "./click";
import { InteractionsMap, InteractionsOptions } from "./interactions-map";
import { NavigateProps } from "./navigate";

type InteractionProps = {
	children: React.ReactNode;
	type: InteractionsOptions; // should be options
} & (NavigateProps | ClickProps);

///////////////////////////////////////////////
// generic me - Interaction of type Navigation
export const Interaction = ({ children, type, ...props }: InteractionProps) => {
	const InteractionComponent = InteractionsMap.get(type);
	if (!InteractionComponent) {
		return <>{children}</>;
	}

	// how to avoid this error? props as type?
	return <InteractionComponent {...props}>{children}</InteractionComponent>;
};
