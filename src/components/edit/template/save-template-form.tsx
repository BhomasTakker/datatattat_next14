import { Button } from "@/components/ui/button";
import styles from "./form.module.scss";

type SaveTemplateFormProps = {
	submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const SaveTemplateForm = ({ submitHandler }: SaveTemplateFormProps) => {
	return (
		<form className={styles.root} onSubmit={submitHandler}>
			<h2>Save Template</h2>
			<label>
				<p>Template ID:</p>
				<input type="text" name="templateId" />
			</label>
			<Button type="submit">Save Template</Button>
		</form>
	);
};
