import { PageComponent } from "@/types/page";

export const DisplayPlayer = ({ component }: { component: PageComponent }) => {
	console.log({ component });
	return <div>Display Player</div>;
};
