import { StyleSheet } from "@/types/css";
import { ButtonHTMLAttributes, FC } from "react";
import styles from "./icon-button.module.scss";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon: FC;
	onClick: () => void;
	classes?: StyleSheet;
};

export const IconButton = ({
	icon,
	onClick,
	type = "button",
}: IconButtonProps) => {
	const Icon = icon;

	return (
		<button className={styles.icon} onClick={onClick} type={type}>
			<Icon />
		</button>
	);
};
