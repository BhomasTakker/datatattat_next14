type BaseProps = {
	children: React.ReactNode;
};

export type ClickProps = {
	onClick: () => void;
};

export const Click = ({ children, onClick }: ClickProps & BaseProps) => {
	return <div onClick={onClick}>{children}</div>;
};
