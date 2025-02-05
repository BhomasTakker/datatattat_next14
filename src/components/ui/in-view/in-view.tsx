import { PropsWithChildren, ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type InViewProps = {
	options: InViewOptions;
	template: ReactNode;
};

type InViewOptions = {
	threshold?: number;
	triggerOnce?: boolean;
};
export const InViewComponent = (props: PropsWithChildren<InViewProps>) => {
	const { options, children, template } = props;
	const { threshold, triggerOnce } = options;
	const { ref, inView } = useInView({
		threshold,
		triggerOnce,
	});

	return <div ref={ref}>{inView ? children : template}</div>;
};
