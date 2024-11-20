import { ComponentProps } from "@/types/component";

export const DisplayPlayer = ({ component, dataObject }: ComponentProps) => {
	console.log({ component, dataObject });
	return <div>Display Player</div>;
};
