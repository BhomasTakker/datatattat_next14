import { getUserTemplates } from "@/actions/edit/template";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import styles from "./form.module.scss";

type SaveTemplateFormProps = {
	submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

// should potentially be just use Input and pass config
// but alittle overkill for a single field form
export const LoadComponentTemplateForm = ({
	submitHandler,
}: SaveTemplateFormProps) => {
	// Get user templates
	const [templates, setTemplates] = useState<string[]>([]);

	useEffect(() => {
		const fetchTemplates = async () => {
			const userTemplates = await getUserTemplates();
			const components = userTemplates.components || {};
			setTemplates(Object.keys(components) || []);
		};

		fetchTemplates();
	}, []);

	return (
		<form className={styles.root} onSubmit={submitHandler}>
			<h2>Load Component Template</h2>
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
