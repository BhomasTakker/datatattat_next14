import { processWithTransducer, composeTransducers } from "./index";
import {
	mapTransducer,
	filterTransducer,
	sortTransducer,
	createTakeTransducer,
	createSkipTransducer,
} from "./transducers";

describe("Transducer Utilities", () => {
	describe("processWithTransducer", () => {
		it("should process array with a simple map transducer", () => {
			const double = (x: number) => x * 2;
			const mapTransducerInstance = mapTransducer<number, number, number[]>(
				double
			);

			const result = processWithTransducer(
				[1, 2, 3, 4, 5],
				mapTransducerInstance
			);
			expect(result).toEqual([2, 4, 6, 8, 10]);
		});

		it("should process array with a filter transducer", () => {
			const isEven = (x: number) => x % 2 === 0;
			const filterTransducerInstance = filterTransducer<number, number[]>(
				isEven
			);

			const result = processWithTransducer(
				[1, 2, 3, 4, 5, 6],
				filterTransducerInstance
			);
			expect(result).toEqual([2, 4, 6]);
		});

		it("should process array with a sort transducer", () => {
			const ascendingSort = (a: number, b: number) => a - b;
			const sortTransducerInstance = sortTransducer<number>(ascendingSort);

			const result = processWithTransducer(
				[3, 1, 4, 1, 5],
				sortTransducerInstance
			);
			expect(result).toEqual([1, 1, 3, 4, 5]);
		});

		it("should process array with a take transducer", () => {
			const takeTransducerInstance = createTakeTransducer<number, number[]>(3);

			const result = processWithTransducer(
				[1, 2, 3, 4, 5, 6],
				takeTransducerInstance
			);
			expect(result).toEqual([1, 2, 3]);
		});

		it("should process array with a skip transducer", () => {
			const skipTransducerInstance = createSkipTransducer<number, number[]>(2);

			const result = processWithTransducer(
				[1, 2, 3, 4, 5],
				skipTransducerInstance
			);
			expect(result).toEqual([3, 4, 5]);
		});

		it("should handle empty arrays", () => {
			const double = (x: number) => x * 2;
			const mapTransducerInstance = mapTransducer<number, number, number[]>(
				double
			);

			const result = processWithTransducer([], mapTransducerInstance);
			expect(result).toEqual([]);
		});

		it("should work with string arrays", () => {
			const toUpperCase = (s: string) => s.toUpperCase();
			const mapTransducerInstance = mapTransducer<string, string, string[]>(
				toUpperCase
			);

			const result = processWithTransducer(
				["hello", "world"],
				mapTransducerInstance
			);
			expect(result).toEqual(["HELLO", "WORLD"]);
		});
	});

	describe("composeTransducers", () => {
		it("should compose two transducers correctly", () => {
			const double = (x: number) => x * 2;
			const isGreaterThanFive = (x: number) => x > 5;

			const mapTransducerInstance = mapTransducer<number, number, number[]>(
				double
			);
			const filterTransducerInstance = filterTransducer<number, number[]>(
				isGreaterThanFive
			);

			const composedTransducer = composeTransducers<number[]>(
				mapTransducerInstance,
				filterTransducerInstance
			);

			const arrayReducer = <T>(acc: T[], value: T): T[] => [...acc, value];
			const reducer = composedTransducer(arrayReducer<number>);

			const result = [1, 2, 3, 4, 5].reduce(reducer, []);
			expect(result).toEqual([6, 8, 10]);
		});

		it("should compose three transducers correctly", () => {
			const double = (x: number) => x * 2;
			const isEven = (x: number) => x % 2 === 0;
			const ascendingSort = (a: number, b: number) => a - b;

			const mapTransducerInstance = mapTransducer<number, number, number[]>(
				double
			);
			const filterTransducerInstance = filterTransducer<number, number[]>(
				isEven
			);
			const sortTransducerInstance = sortTransducer<number>(ascendingSort);

			const composedTransducer = composeTransducers<number[]>(
				mapTransducerInstance,
				filterTransducerInstance,
				sortTransducerInstance
			);

			const arrayReducer = <T>(acc: T[], value: T): T[] => [...acc, value];
			const reducer = composedTransducer(arrayReducer<number>);

			const result = [3, 1, 4, 2, 5].reduce(reducer, []);
			// Original: [3, 1, 4, 2, 5]
			// After double: [6, 2, 8, 4, 10]
			// After filter even: [6, 2, 8, 4, 10] (all are now even)
			// After sort: [2, 4, 6, 8, 10]
			expect(result).toEqual([2, 4, 6, 8, 10]);
		});

		it("should compose transducers with take and skip", () => {
			const isEven = (x: number) => x % 2 === 0;
			const filterTransducerInstance = filterTransducer<number, number[]>(
				isEven
			);
			const skipTransducerInstance = createSkipTransducer<number, number[]>(1);
			const takeTransducerInstance = createTakeTransducer<number, number[]>(2);

			const composedTransducer = composeTransducers<number[]>(
				filterTransducerInstance,
				skipTransducerInstance,
				takeTransducerInstance
			);

			const arrayReducer = <T>(acc: T[], value: T): T[] => [...acc, value];
			const reducer = composedTransducer(arrayReducer<number>);

			const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce(reducer, []);
			// Filter evens: [2, 4, 6, 8, 10]
			// Skip 1: [4, 6, 8, 10]
			// Take 2: [4, 6]
			expect(result).toEqual([4, 6]);
		});

		it("should handle single transducer composition", () => {
			const double = (x: number) => x * 2;
			const mapTransducerInstance = mapTransducer<number, number, number[]>(
				double
			);

			const composedTransducer = composeTransducers<number[]>(
				mapTransducerInstance
			);

			const arrayReducer = <T>(acc: T[], value: T): T[] => [...acc, value];
			const reducer = composedTransducer(arrayReducer<number>);

			const result = [1, 2, 3].reduce(reducer, []);
			expect(result).toEqual([2, 4, 6]);
		});

		it("should handle empty transducer composition", () => {
			const composedTransducer = composeTransducers<number[]>();

			const arrayReducer = <T>(acc: T[], value: T): T[] => [...acc, value];
			const reducer = composedTransducer(arrayReducer<number>);

			const result = [1, 2, 3].reduce(reducer, []);
			expect(result).toEqual([1, 2, 3]);
		});

		it("should work with different accumulator types", () => {
			const double = (x: number) => x * 2;
			const mapTransducerInstance = mapTransducer<number, number, number>(
				double
			);

			const composedTransducer = composeTransducers<number>(
				mapTransducerInstance
			);

			const sumReducer = (acc: number, value: number): number => acc + value;
			const reducer = composedTransducer(sumReducer);

			const result = [1, 2, 3, 4].reduce(reducer, 0);
			expect(result).toBe(20); // (1*2) + (2*2) + (3*2) + (4*2) = 2 + 4 + 6 + 8 = 20
		});
	});

	describe("Integration tests with processWithTransducer and composed transducers", () => {
		it("should work with processWithTransducer and composed transducers", () => {
			const double = (x: number) => x * 2;
			const isGreaterThanFive = (x: number) => x > 5;

			const mapTransducerInstance = mapTransducer<number, number, number[]>(
				double
			);
			const filterTransducerInstance = filterTransducer<number, number[]>(
				isGreaterThanFive
			);

			const composedTransducer = composeTransducers<number[]>(
				mapTransducerInstance,
				filterTransducerInstance
			);

			const result = processWithTransducer(
				[1, 2, 3, 4, 5, 6],
				composedTransducer
			);
			expect(result).toEqual([6, 8, 10, 12]);
		});

		it("should handle complex data transformations", () => {
			interface User {
				id: number;
				name: string;
				age: number;
				active: boolean;
			}

			interface UserSummary {
				name: string;
				age: number;
			}

			const users: User[] = [
				{ id: 1, name: "Alice", age: 25, active: true },
				{ id: 2, name: "Bob", age: 30, active: false },
				{ id: 3, name: "Charlie", age: 35, active: true },
				{ id: 4, name: "Diana", age: 20, active: true },
				{ id: 5, name: "Eve", age: 28, active: false },
			];

			const isActive = (user: User) => user.active;
			const toSummary = (user: User): UserSummary => ({
				name: user.name,
				age: user.age,
			});
			const sortByAge = (a: UserSummary, b: UserSummary) => a.age - b.age;

			const filterTransducerInstance = filterTransducer<User, User[]>(isActive);
			const mapTransducerInstance = mapTransducer<
				User,
				UserSummary,
				UserSummary[]
			>(toSummary);
			const sortTransducerInstance = sortTransducer<UserSummary>(sortByAge);

			const composedTransducer = composeTransducers<UserSummary[]>(
				filterTransducerInstance as any, // Type assertion for composition
				mapTransducerInstance as any,
				sortTransducerInstance
			);

			const result = processWithTransducer(users, composedTransducer);
			expect(result).toEqual([
				{ name: "Diana", age: 20 },
				{ name: "Alice", age: 25 },
				{ name: "Charlie", age: 35 },
			]);
		});
	});

	describe("Edge cases and error handling", () => {
		it("should handle processWithTransducer with empty data", () => {
			const double = (x: number) => x * 2;
			const mapTransducerInstance = mapTransducer<number, number, number[]>(
				double
			);

			const result = processWithTransducer([], mapTransducerInstance);
			expect(result).toEqual([]);
		});

		it("should handle composed transducers with empty data", () => {
			const double = (x: number) => x * 2;
			const isEven = (x: number) => x % 2 === 0;

			const mapTransducerInstance = mapTransducer<number, number, number[]>(
				double
			);
			const filterTransducerInstance = filterTransducer<number, number[]>(
				isEven
			);

			const composedTransducer = composeTransducers<number[]>(
				mapTransducerInstance,
				filterTransducerInstance
			);

			const result = processWithTransducer([], composedTransducer);
			expect(result).toEqual([]);
		});

		it("should handle large datasets efficiently with composition", () => {
			const largeArray = Array.from({ length: 10000 }, (_, i) => i);
			const isEven = (x: number) => x % 2 === 0;
			const takeTransducerInstance = createTakeTransducer<number, number[]>(
				100
			);
			const filterTransducerInstance = filterTransducer<number, number[]>(
				isEven
			);

			const composedTransducer = composeTransducers<number[]>(
				filterTransducerInstance,
				takeTransducerInstance
			);

			const start = Date.now();
			const result = processWithTransducer(largeArray, composedTransducer);
			const end = Date.now();

			expect(result).toHaveLength(100);
			expect(result[0]).toBe(0);
			expect(result[99]).toBe(198);
			expect(result.every((n) => n % 2 === 0)).toBe(true);
			// Should complete quickly
			expect(end - start).toBeLessThan(100);
		});
	});
});
