import { DescriptionInputProps } from "@/types/edit/inputs/inputs";
import styles from "./input-description.module.scss";

// should be md file display or something like that?
// Could use / amend for help, dircetions, etc

export const InputDescription = ({ text }: DescriptionInputProps) => {
	return (
		<p className={styles.description} data-testid="input-description">
			{text}
		</p>
	);
};
