export const isPDF = (url: string): boolean => {
	// Check for direct PDF files
	if (/\.pdf$/i.test(url) || url.includes("application/pdf")) {
		return true;
	}

	// Allow trusted PDF sources
	const trustedPDFDomains = [
		"drive.google.com",
		"docs.google.com",
		"dropbox.com",
		"box.com",
		"onedrive.live.com",
		"sharepoint.com",
	];

	try {
		const urlObj = new URL(url);
		return trustedPDFDomains.some((domain) =>
			urlObj.hostname?.includes(domain),
		);
	} catch {
		return false;
	}
};
