import { useFormContext } from "react-hook-form";
import styles from "./nav-item-input.module.scss";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IPage } from "@/types/page";

type Link = {
	label: string;
	route: string;
};

export const NavItemInput = ({
	link,
	index,
	onMove,
	onDelete,
	pages,
}: {
	link: Link;
	index: number;
	onMove: (index: number, direction: string) => void;
	onDelete: (index: number) => void;
	pages: IPage[];
}) => {
	const { label, route } = link;
	const { register } = useFormContext();

	const labelInputId = `header-${index}-label`;
	const routeInputId = `header-${index}-route`;

	const options = pages.map((page) => {
		return { value: page.route, label: page.route };
	});

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
				{/* Update me -select from a list of pages */}
				<div className={styles.input}>
					<label htmlFor={routeInputId}>Route</label>
					<select
						id={routeInputId}
						{...register(routeInputId, { required: true })}
					>
						<option value="">Select a route</option>
						{options.map((option) => {
							const isSelected = route === option.value;
							return (
								<option
									key={option.value}
									value={option.value}
									selected={isSelected}
								>
									{option.label}
								</option>
							);
						})}
					</select>
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
