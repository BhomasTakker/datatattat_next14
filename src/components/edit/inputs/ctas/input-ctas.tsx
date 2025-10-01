import { GenericInput, InputCtasProps } from "@/types/edit/inputs/inputs";
import styles from "./input-ctas.module.scss";
import { IconButton } from "@/components/ui/icon-button";
import { Ctas, getCtaById } from "./ctas";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { EditContext } from "../../context/edit-context";

type CtaButtonProps = {
	id: Ctas;
	input: GenericInput;
};

const InputCta = ({ id, input }: CtaButtonProps) => {
	const methods = useFormContext();
	const context = useContext(EditContext);
	const ctaConfig = getCtaById(id);
	if (!ctaConfig) return null;
	const { icon: CtaIcon, id: configId, action, label, tooltip } = ctaConfig;

	return (
		<IconButton
			data-testid={`cta-button-${configId}`}
			icon={CtaIcon}
			onClick={() => action(input, methods, context)}
			tooltip={tooltip}
		/>
	);
};

// I think we need a way of targetting specific inputs and resetting their key
// There is no other way of forcing a rerender of a specific input component
// Without re-rendering the whole form - which we may have to do in the meantime
// const updateKey = () => setKey(randomKeyGenerator());

export const InputCtas = (props: InputCtasProps) => {
	const { ctas } = props;
	return (
		<div className={styles.root}>
			{ctas.map((cta) => {
				const { id } = cta;
				return <InputCta key={id} id={id as Ctas} input={props} />;
			})}
		</div>
	);
};
