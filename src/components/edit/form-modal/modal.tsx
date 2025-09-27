import styles from "./modal.module.scss";

type FormModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export const FormModal = ({ isOpen, onClose, children }: FormModalProps) => {
	if (!isOpen) return null;
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<button className={styles.closeButton} onClick={onClose}>
					X
				</button>
				{children}
			</div>
		</div>
	);
};
