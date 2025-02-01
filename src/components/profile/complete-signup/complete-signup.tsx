"use client";

import { FormProvider, useForm } from "react-hook-form";

import styles from "./compete-signup.module.scss";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { isUsernameValid as checkIsUsernameValid } from "@/actions/signup/check-username";
import { confirmUsername } from "@/actions/signup/confirm-username";
import { useRouter } from "next/navigation";

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
	const { register, handleSubmit, watch } = methods;
	const onSubmit = handleSubmit(async (data) => {
		console.log("SUBMIT", { data });
		const isValid = await checkIsUsernameValid(data.username);
		setIsUsernameValid(isValid);

		if (isValid) {
			const status = await confirmUsername(data.username);
			console.log("STATUS", { status });
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
				<fieldset className={styles.field}>
					<label htmlFor={"username"} className={styles.label}>
						Confirm Username
					</label>
					<input
						className={styles.input}
						defaultValue={username}
						{...register("username", { required: true })}
					/>
					<p
						className={`${styles.warn} ${
							isUsernameValid === false ? styles.showWarning : ""
						}`}
					>
						Username already taken. You must pick another to continue.
					</p>
				</fieldset>
				<Button type="submit" disabled={isSubmitDisabled}>
					Submit
				</Button>
			</form>
		</FormProvider>
	);
};
