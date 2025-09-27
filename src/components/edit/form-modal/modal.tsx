import styles from "./modal.module.scss";
import { IconButton } from "@/components/ui/icon-button";
import { IoMdClose } from "react-icons/io";

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
				<div className={styles.closeButton}>
					<IconButton data-testid="close" icon={IoMdClose} onClick={onClose} />
				</div>
				{children}
			</div>
		</div>
	);
};
