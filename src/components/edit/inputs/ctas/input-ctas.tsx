import { GenericInput, InputCtasProps } from "@/types/edit/inputs/inputs";
import styles from "./input-ctas.module.scss";
import { IconButton } from "@/components/ui/icon-button";
import { Ctas, getCtaById } from "./ctas";
import { useFormContext } from "react-hook-form";

type CtaButtonProps = {
	id: Ctas;
	context: GenericInput;
};

const InputCta = ({ id, context }: CtaButtonProps) => {
	const methods = useFormContext();
	const ctaConfig = getCtaById(id);
	if (!ctaConfig) return null;
	const { icon: CtaIcon, id: configId, action, label } = ctaConfig;

	return (
		<IconButton
			data-testid={`cta-button-${configId}`}
			icon={CtaIcon}
			onClick={() => action(context, methods)}
		/>
	);
};

export const InputCtas = (props: InputCtasProps) => {
	const { ctas } = props;
	return (
		<div className={styles.root}>
			{ctas.map((cta) => {
				const { id } = cta;
				return <InputCta key={id} id={id as Ctas} context={props} />;
			})}
		</div>
	);
};
