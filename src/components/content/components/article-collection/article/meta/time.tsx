import { StyleSheet } from "@/types/css";

type Time = {
	time: Date | string;
	styles: StyleSheet;
};

const pluralise = (unit: number, str: string) => {
	return unit > 1 ? `${unit} ${str}s` : `${unit} ${str}`;
};

// Update to use dayjs fully?
// Article time
export const Time = ({ time, styles }: Time) => {
	// cretae a class to get this more easily etc
	const date = new Date(time);
	const now = new Date(Date.now());
	const hours = date.getHours();
	const minutes = date.getMinutes();

	const useHours = hours < 10 ? `0${hours}` : hours;
	const useMinutes = minutes < 10 ? `0${minutes}` : minutes;

	// @ts-expect-error - arithmatic on date - seems fine?
	const diffTime = Math.abs(now - date);
	const diffSeconds = Math.floor(diffTime / 1000);
	const diffMinutes = Math.floor(diffTime / (1000 * 60));
	const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
	const diffRoughMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
	// const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));

	let displayTime = "";

	// Quick change seems to suit
	// reformat this all and look at
	// Intl.DateTimeFormat
	switch (true) {
		case !!diffRoughMonths:
			displayTime = `${date.getDate()} ${date.toLocaleDateString("en-GB", {
				month: "short",
			})} ${date.getFullYear()}`;
			break;
		case !!diffWeeks:
			displayTime = `${date.getDate()} ${date.toLocaleDateString("en-GB", {
				month: "short",
			})} ${useHours}:${useMinutes}`;
			break;
		case !!diffDays:
			displayTime = `${new Intl.DateTimeFormat("en-US", {
				weekday: "short",
			}).format(date)} ${useHours}:${useMinutes}`;
			break;
		case !!diffHours:
			displayTime = `${pluralise(diffHours, "hour")} ago`;
			break;
		case !!diffMinutes:
			displayTime = `${pluralise(diffMinutes, "minute")} ago`;
			break;
		case !!diffSeconds:
			displayTime = "Now!";
			break;
		default:
			displayTime = `${date.getDate()} ${date.toLocaleDateString("en-GB", {
				month: "short",
			})} ${date.getFullYear()}`;
	}

	return (
		<time className={styles.time} dateTime={date.toISOString()}>
			{displayTime}
		</time>
	);
};
