import { toDateKey, toDateLabel } from "./date-utils";
import { LabelFormat } from "./timeline-day.types";

const todayKey = () => {
	const d = new Date();
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
};

const yesterdayKey = () => {
	const d = new Date();
	d.setDate(d.getDate() - 1);
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
};

describe("toDateKey", () => {
	it("formats a date string as YYYY-MM-DD", () => {
		expect(toDateKey("2020-06-15T12:00:00")).toBe("2020-06-15");
	});

	it("formats a Date object as YYYY-MM-DD", () => {
		expect(toDateKey(new Date("2020-06-15T12:00:00"))).toBe("2020-06-15");
	});

	it("pads single-digit month and day with zeros", () => {
		expect(toDateKey("2020-01-05T00:00:00")).toBe("2020-01-05");
	});

	it("returns today's key for the current date", () => {
		expect(toDateKey(new Date())).toBe(todayKey());
	});
});

describe("toDateLabel", () => {
	it('returns "Today" for today\'s date key', () => {
		expect(toDateLabel(todayKey(), LabelFormat.short)).toBe("Today");
	});

	it('returns "Yesterday" for yesterday\'s date key', () => {
		expect(toDateLabel(yesterdayKey(), LabelFormat.short)).toBe("Yesterday");
	});

	it("returns a non-empty short label for older dates", () => {
		const result = toDateLabel("2020-06-15", LabelFormat.short);
		expect(result).not.toBe("Today");
		expect(result).not.toBe("Yesterday");
		expect(result.length).toBeGreaterThan(0);
	});

	it("short format label does not contain a 4-digit year", () => {
		const result = toDateLabel("2020-06-15", LabelFormat.short);
		expect(result).not.toMatch(/\d{4}/);
	});

	it("long format label contains a comma and a 4-digit year", () => {
		const result = toDateLabel("2020-06-15", LabelFormat.long);
		expect(result).toMatch(/,/);
		expect(result).toMatch(/2020/);
	});

	it("long format label contains the full weekday name", () => {
		// 2020-06-15 was a Monday
		const result = toDateLabel("2020-06-15", LabelFormat.long);
		expect(result).toMatch(/Monday/);
	});
});
