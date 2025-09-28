import styles from "./modal.module.scss";
import { IconButton } from "@/components/ui/icon-button";
import { IoMdClose } from "react-icons/io";

type FormModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

const blockHandler = (e: React.MouseEvent) => e.stopPropagation();

export const FormModal = ({ isOpen, onClose, children }: FormModalProps) => {
	if (!isOpen) return null;

	return (
		<div className={styles.root} onClick={onClose}>
			<div className={styles.content} onClick={blockHandler}>
				<div className={styles.closeButton}>
					<IconButton data-testid="close" icon={IoMdClose} onClick={onClose} />
				</div>
				<div className={styles.modalBody}>{children}</div>
			</div>
		</div>
	);
};
