"use client";

import { FormProvider, useForm } from "react-hook-form";

import styles from "./compete-signup.module.scss";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { checkIsUsernameOkay } from "@/actions/signup/check-username";

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
	const { register, handleSubmit } = methods;
	const onSubmit = handleSubmit(async (data) => {
		// const res = await saveHeader(route, data);
		// setPageState(res.message);
		console.log("SUBMIT ", { username: data.username });

		const isValid = await checkIsUsernameOkay(data.username);
		setIsUsernameValid(isValid);
	});

	useEffect(() => {
		const checkUsername = async () => {
			const isValid = await checkIsUsernameOkay(username);
			setIsUsernameValid(isValid);
			setIsSubmitDisabled(isValid);
		};
		checkUsername();
	}, []);

	console.log("isUsernmeTaken? ", { isUsernameValid });

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
