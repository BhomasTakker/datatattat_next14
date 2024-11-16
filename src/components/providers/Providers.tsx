import AuthProvider from "../header/auth/auth-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AuthProvider>{children}</AuthProvider>
		</>
	);
};
