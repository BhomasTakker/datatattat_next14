import { StyleSheet } from "@/types/css";
import { ButtonHTMLAttributes, FC } from "react";
import styles from "./icon-button.module.scss";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon: FC;
	onClick: () => void;
	classes?: StyleSheet;
	tooltip?: string;
};

export const IconButton = ({
	icon,
	onClick,
	tooltip,
	type = "button",
}: IconButtonProps) => {
	const Icon = icon;

	return (
		<button className={styles.icon} onClick={onClick} type={type}>
			<Icon />
			{tooltip && <p className={styles.tooltip}>{tooltip}</p>}
		</button>
	);
};
