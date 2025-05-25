"use client";

import { FormProvider, useForm } from "react-hook-form";

import styles from "./compete-signup.module.scss";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { isUsernameValid as checkIsUsernameValid } from "@/actions/signup/check-username";
import { confirmUsername } from "@/actions/signup/confirm-username";
import { useRouter } from "next/navigation";
import { patterns } from "@/utils/regex";

type Inputs = {
	username: string;
};

type CompleteSignupProps = {
	username: string;
};

export const CompleteSignup = ({ username }: CompleteSignupProps) => {
	const [isUsernameValid, setIsUsernameValid] = useState<boolean | undefined>(
		undefined
	);
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
	const methods = useForm<Inputs>({
		defaultValues: {},
	});
	const { refresh } = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = methods;
	const onSubmit = handleSubmit(async (data) => {
		// console.log("SUBMIT", { data });
		const isValid = await checkIsUsernameValid(data.username);
		setIsUsernameValid(isValid);

		if (isValid) {
			const status = await confirmUsername(data.username);
			// console.log("STATUS", { status });
			refresh();
		}
	});

	useEffect(() => {
		const checkUsername = async () => {
			const isValid = await checkIsUsernameValid(username);
			setIsUsernameValid(isValid);
			setIsSubmitDisabled(!isValid);
		};
		checkUsername();
	}, []);

	// Not sure I like it 100% but copilot wrote this!
	useEffect(() => {
		const username = watch("username");
		// use debounce
		const checkUsername = async () => {
			const isValid = await checkIsUsernameValid(username);
			setIsUsernameValid(isValid);
			setIsSubmitDisabled(!isValid);
		};
		checkUsername();
	}, [watch("username")]);

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit} className={styles.form}>
				<h1 className={styles.header}>Complete Profile</h1>
				<fieldset className={styles.field}>
					<div className={styles.inputContainer}>
						<label htmlFor={"username"} className={styles.label}>
							<h2>Confirm Username</h2>
						</label>
						<input
							data-testid="username-input"
							className={styles.input}
							defaultValue={username}
							{...register("username", {
								required: "Username is required!",
								pattern: {
									value: patterns.username.regex,
									message: patterns.username.message,
								},
							})}
						/>
						{errors.username && (
							<p className={`${styles.warn} ${styles.showWarning}`}>
								{errors.username.message}
							</p>
						)}
						<p
							className={`${styles.warn} ${
								isUsernameValid === false ? styles.showWarning : ""
							}`}
						>
							Username invalid. You must pick another to continue.
						</p>
					</div>
				</fieldset>
				<Button type="submit" disabled={isSubmitDisabled}>
					Submit
				</Button>
			</form>
		</FormProvider>
	);
};
