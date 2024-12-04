import { StyleSheet } from "@/types/css";
import styles from "./button.module.scss";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	classes?: StyleSheet;
};

export const Button = ({
	children,
	onClick,
	classes,
	...rest
}: ButtonProps) => {
	return (
		<button
			className={`${styles.button} ${classes ? classes.button : ""}`}
			onClick={onClick}
			{...rest}
		>
			{children ? children : null}
		</button>
	);
};
