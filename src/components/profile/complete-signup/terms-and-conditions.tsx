"use client";

import { useState } from "react";

import styles from "./terms-and-conditions.module.scss";
import { Button } from "@/components/ui/button";

type TermsAndConditionsProps = {
	onContinue: () => void;
};

const termsParagraphs = [
	"By completing signup, you agree to use this service lawfully and in good faith.",
	"You are responsible for content you publish and must not post unlawful, abusive, or misleading material.",
	"We may update features and terms over time, and significant changes may require renewed acceptance.",
	"Your account may be limited or removed if activity violates these terms or applicable law.",
	"You can contact support if you have questions about your account, data, or these terms.",
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
