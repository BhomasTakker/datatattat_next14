"use client";

import { useState } from "react";

import styles from "./terms-and-conditions.module.scss";
import { Button } from "@/components/ui/button";

type TermsAndConditionsProps = {
	onContinue: () => void;
};

const termsParagraphs = [
	"By completing signup, you agree to use this service lawfully and are solely responsible for your actions and any content you post, share, or link.",
	"You must not post unlawful, defamatory, infringing, abusive, fraudulent, or otherwise harmful material, and you are responsible for ensuring you have all necessary rights and permissions for the content you submit.",
	"This platform may include links, embeds, feeds, media, and social posts from third parties. We do not create, control, endorse, verify, or guarantee third-party content, and we are not responsible for third-party acts, omissions, accuracy, availability, legality, or outcomes.",
	'To the maximum extent permitted by law, the service is provided "as is" and "as available" without warranties of any kind, and we disclaim all implied warranties including merchantability, fitness for a particular purpose, and non-infringement.',
	"To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of data, profits, reputation, business, or opportunities arising from your use of the service, user content, or third-party content.",
	"You agree to defend, indemnify, and hold us harmless from claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of your content, your use of the service, or your breach of these terms or applicable law.",
	"We may suspend or remove content or accounts at our discretion for policy or legal violations. We may also update these terms from time to time, and continued use after updates constitutes acceptance of the revised terms.",
];

export const TermsAndConditions = ({ onContinue }: TermsAndConditionsProps) => {
	const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

	return (
		<section className={styles.termsSection}>
			<h1 className={styles.header}>Terms and Conditions</h1>
			<div className={styles.termsContent} data-testid="terms-content">
				{termsParagraphs.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>
			<label className={styles.checkboxRow}>
				<input
					type="checkbox"
					checked={hasAgreedToTerms}
					onChange={(event) => setHasAgreedToTerms(event.target.checked)}
					data-testid="terms-agree-checkbox"
				/>
				<span>I have read and agree to the Terms and Conditions.</span>
			</label>
			<Button
				type="button"
				onClick={onContinue}
				disabled={!hasAgreedToTerms}
				data-testid="terms-continue-button"
			>
				Continue
			</Button>
		</section>
	);
};
