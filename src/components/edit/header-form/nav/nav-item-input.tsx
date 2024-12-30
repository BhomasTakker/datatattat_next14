import { useFormContext } from "react-hook-form";
import styles from "./nav-item-input.module.scss";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type Link = {
	label: string;
	route: string;
};

export const NavItemInput = ({
	link,
	index,
	onMove,
	onDelete,
}: {
	link: Link;
	index: number;
	onMove: (index: number, direction: string) => void;
	onDelete: (index: number) => void;
}) => {
	const { label, route } = link;
	const { register } = useFormContext();

	const labelInputId = `header-${index}-label`;
	const routeInputId = `header-${index}-route`;

	return (
		<div className={styles.root}>
			<div className={styles.inputs}>
				<div className={styles.input}>
					<label htmlFor={labelInputId}>Label</label>
					<input
						id={labelInputId}
						{...register(labelInputId, {
							required: true,
							maxLength: 20,
							minLength: 2,
						})}
						type="text"
						defaultValue={label}
						required
					/>
				</div>
				<div className={styles.input}>
					<label htmlFor={routeInputId}>Route</label>
					<input
						id={routeInputId}
						{...register(routeInputId, { required: true, minLength: 2 })}
						type="text"
						defaultValue={route}
						required
					/>
				</div>
			</div>
			<div className={styles.controls}>
				<div className={styles.icon} onClick={() => onMove(index, "up")}>
					<FaArrowUp />
				</div>
				<div className={styles.icon} onClick={() => onMove(index, "down")}>
					<FaArrowDown />
				</div>
				<div className={styles.icon} onClick={() => onDelete(index)}>
					<MdDelete />
				</div>
			</div>
		</div>
	);
};
