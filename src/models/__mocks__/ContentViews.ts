jest.mock("../../models/ContentViews", () => ({
	ContentViewPastHour: { create: jest.fn() },
	ContentViewPast3Hours: { create: jest.fn() },
	ContentViewPast6Hours: { create: jest.fn() },
	ContentViewPast12Hours: { create: jest.fn() },
	ContentViewPastDay: { create: jest.fn() },
	ContentViewPast3Days: { create: jest.fn() },
	ContentViewPastWeek: { create: jest.fn() },
}));
