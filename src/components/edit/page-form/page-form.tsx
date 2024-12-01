"use client";

import { updatePage } from "@/actions/edit/update-page";
import { IPage } from "@/types/page";
import { useFormState, useFormStatus } from "react-dom";

type State = {
	message: string | null;
};

const initialState: State = {
	message: null,
};

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<button type="submit" aria-disabled={pending}>
			Submit
		</button>
	);
};

export const PageForm = ({
	route,
	pageData,
}: {
	route: string;
	pageData: IPage;
}) => {
	const [state, formAction] = useFormState(updatePage, initialState);

	console.log({ pageData });

	return (
		<form action={formAction}>
			<label htmlFor="page">Create Page</label>
			<input type="text" id="page" name="page" required />
			<SubmitButton />
			<p aria-live="polite" role="status">
				{state.message}
			</p>
		</form>
	);
};
