import { getUserTemplates } from "@/actions/edit/template";
import { useEffect, useState } from "react";

type SaveTemplateFormProps = {
	submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

// should potentially be just use Input and pass config
// but alittle overkill for a single field form
export const LoadTemplateForm = ({ submitHandler }: SaveTemplateFormProps) => {
	// Get user templates
	const [templates, setTemplates] = useState<string[]>([]);

	useEffect(() => {
		const fetchTemplates = async () => {
			const userTemplates = await getUserTemplates();
			const pages = userTemplates.pages || {};
			setTemplates(Object.keys(pages) || []);
		};

		fetchTemplates();
	}, []);

	return (
		<form onSubmit={submitHandler}>
			<label>
				Template ID:
				<select name="templateId">
					{templates.map((template) => (
						<option key={template} value={template}>
							{template}
						</option>
					))}
				</select>
			</label>
			<button type="submit">Load Template</button>
		</form>
	);
};
