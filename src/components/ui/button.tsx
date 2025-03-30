import styles from "./button.module.scss";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	classes?: string;
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
			className={`${styles.button} ${classes ? classes : ""}`}
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
