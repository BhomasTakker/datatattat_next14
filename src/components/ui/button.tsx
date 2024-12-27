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
	type = "button",
	...rest
}: ButtonProps) => {
	return (
		<button
			className={`${styles.button} ${classes ? classes.button : ""}`}
			onClick={onClick}
			// need use type else defaults
			//to submit when used in a form...
			type={type}
			{...rest}
		>
			{children ? children : null}
		</button>
	);
};
