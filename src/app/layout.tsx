const DummyPlayer = () => {
	// console.log("DummyPlayer mounted");
	return null;
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			{children}
			<DummyPlayer />
		</div>
	);
}
