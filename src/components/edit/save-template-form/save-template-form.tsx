type SaveTemplateFormProps = {
	submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const SaveTemplateForm = ({ submitHandler }: SaveTemplateFormProps) => {
	return (
		<form onSubmit={submitHandler}>
			<label>
				Template ID:
				<input type="text" name="templateId" />
			</label>
			<button type="submit">Save Template</button>
		</form>
	);
};
