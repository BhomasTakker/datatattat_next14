import styles from "./toggle-button.module.scss";

type ToggleButtonProps = {
	value: boolean;
	onChange: (value: boolean) => void;
	labelOn?: string;
	labelOff?: string;
	id: string;
};

export const ToggleButton = ({
	value,
	onChange,
	labelOn = "On",
	labelOff = "Off",
	id,
}: ToggleButtonProps) => {
	return (
		<div className={styles.wrapper}>
			<span className={styles.label}>{value ? labelOn : labelOff}</span>
			<label
				className={styles.track}
				htmlFor={id}
				aria-label={value ? labelOn : labelOff}
			>
				<input
					id={id}
					type="checkbox"
					checked={value}
					onChange={(e) => onChange(e.target.checked)}
					className={styles.input}
				/>
				<span className={styles.thumb} />
			</label>
		</div>
	);
};
