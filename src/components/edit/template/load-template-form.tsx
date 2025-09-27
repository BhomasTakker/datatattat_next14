import { getUserTemplates } from "@/actions/edit/template";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import styles from "./form.module.scss";

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
		<form className={styles.root} onSubmit={submitHandler}>
			<h2>Load Template</h2>
			<label>
				<p>Template ID:</p>
				<select name="templateId">
					{templates.map((template) => (
						<option key={template} value={template}>
							{template}
						</option>
					))}
				</select>
			</label>
			<Button type="submit">Load Template</Button>
		</form>
	);
};
