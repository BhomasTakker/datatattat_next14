import { TitleInputProps } from "@/types/edit/inputs/inputs";
import styles from "./input-title.module.scss";

export const InputTitle = ({
	title,
	header = "h2",
	size = "medium",
}: TitleInputProps) => {
	const Header = header;
	return <Header className={`${styles.title} ${styles[size]}`}>{title}</Header>;
};
