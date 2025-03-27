import React from "react";
import { render, screen } from "@testing-library/react";
import { Time } from "./time";
import { StyleSheet } from "@/types/css";

const styles: StyleSheet = {
	time: "time-class",
};

describe("Time component", () => {
	it("displays 'Now!' for current time", () => {
		// need to delay by a couple of seconds!
		// now now doesn't trip it defaults!
		const pastTime = new Date(Date.now() - 5 * 1000); // seconds ago!
		render(<Time time={pastTime} styles={styles} />);
		const time = screen.getByText("Now!");
		expect(time).toBeInTheDocument();
	});

	it("displays minutes ago for time within the last hour", () => {
		const pastTime = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
		render(<Time time={pastTime} styles={styles} />);
		const time = screen.getByText("5 minutes ago");
		expect(time).toBeInTheDocument();
	});

	it("displays hours ago for time within the last day", () => {
		const pastTime = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
		render(<Time time={pastTime} styles={styles} />);

		const time = screen.getByText("2 hours ago");

		expect(time).toBeInTheDocument();
	});

	it("displays day and time for time within the last week", () => {
		const pastTime = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
		render(<Time time={pastTime} styles={styles} />);

		const day = pastTime.toLocaleDateString("en-GB", { weekday: "short" });
		const hours = pastTime.getHours();
		const minutes = pastTime.getMinutes();

		// utils
		const useHours = hours < 10 ? `0${hours}` : hours;
		const useMinutes = minutes < 10 ? `0${minutes}` : minutes;

		const time = screen.getByText(`${day} ${useHours}:${useMinutes}`);

		expect(time).toBeInTheDocument();
	});

	it("displays date and time for time within the last month", () => {
		const pastTime = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
		render(<Time time={pastTime} styles={styles} />);

		const date = pastTime.getDate();
		const month = pastTime.toLocaleDateString("en-GB", { month: "short" });
		const hours = pastTime.getHours();
		const minutes = pastTime.getMinutes();

		// utils
		const useHours = hours < 10 ? `0${hours}` : hours;
		const useMinutes = minutes < 10 ? `0${minutes}` : minutes;

		const time = screen.getByText(`${date} ${month} ${useHours}:${useMinutes}`);

		expect(time).toBeInTheDocument();
	});

	it("displays full date for time older than a month", () => {
		const pastTime = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000); // 40 days ago
		render(<Time time={pastTime} styles={styles} />);

		const date = pastTime.getDate();
		const month = pastTime.toLocaleDateString("en-GB", { month: "short" });
		const year = pastTime.getFullYear();

		const time = screen.getByText(`${date} ${month} ${year}`);

		expect(time).toBeInTheDocument();
	});
});
