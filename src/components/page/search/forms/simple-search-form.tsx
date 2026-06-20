"use client";

type SearchFormProps = {
	onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
	isLoading: boolean;
};

// we will be using react-hook-form for this, but for now we will just use a simple form
export const SimpleSearchForm = ({ onSubmit, isLoading }: SearchFormProps) => {
	return (
		<form action="/search" method="get" onSubmit={onSubmit}>
			<input type="text" name="q" placeholder="Search..." />
			<button type="submit" disabled={isLoading}>
				Search
			</button>
		</form>
	);
};
