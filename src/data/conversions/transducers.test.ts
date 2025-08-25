import {
	mapTransducer,
	filterTransducer,
	sortTransducer,
	createTakeTransducer,
	createSkipTransducer,
} from "./transducers";

describe("Transducers", () => {
	// Helper reducer functions for testing
	const arrayReducer = <T>(acc: T[], value: T): T[] => [...acc, value];
	const sumReducer = (acc: number, value: number): number => acc + value;
	const stringConcatReducer = (acc: string, value: string): string =>
		acc + value;

	describe("mapTransducer", () => {
		it("should transform values using the provided mapping function", () => {
			const double = (x: number) => x * 2;
			const transducer = mapTransducer<number, number, number[]>(double);
			const reducer = transducer(arrayReducer<number>);

			const result = [1, 2, 3, 4, 5].reduce(reducer, []);
			expect(result).toEqual([2, 4, 6, 8, 10]);
		});

		it("should work with different types", () => {
			const toString = (x: number) => x.toString();
			const transducer = mapTransducer<number, string, string[]>(toString);
			const reducer = transducer(arrayReducer<string>);

			const result = [1, 2, 3].reduce(reducer, []);
			expect(result).toEqual(["1", "2", "3"]);
		});

		it("should work with object transformations", () => {
			interface Person {
				name: string;
				age: number;
			}

			interface PersonWithId extends Person {
				id: number;
			}

			const addId = (person: Person): PersonWithId => ({
				...person,
				id: Math.floor(Math.random() * 1000),
			});

			const people: Person[] = [
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 30 },
			];

			const transducer = mapTransducer<Person, PersonWithId, PersonWithId[]>(
				addId
			);
			const reducer = transducer(arrayReducer<PersonWithId>);

			const result = people.reduce(reducer, []);
			expect(result).toHaveLength(2);
			expect(result[0]).toHaveProperty("id");
			expect(result[1]).toHaveProperty("id");
			expect(result[0]).toHaveProperty("name", "Alice");
			expect(result[1]).toHaveProperty("name", "Bob");
		});

		it("should work with sum reducer", () => {
			const square = (x: number) => x * x;
			const transducer = mapTransducer<number, number, number>(square);
			const reducer = transducer(sumReducer);

			const result = [1, 2, 3, 4].reduce(reducer, 0);
			expect(result).toBe(30); // 1 + 4 + 9 + 16
		});
	});

	describe("filterTransducer", () => {
		it("should filter values based on predicate function", () => {
			const isEven = (x: number) => x % 2 === 0;
			const transducer = filterTransducer<number, number[]>(isEven);
			const reducer = transducer(arrayReducer<number>);

			const result = [1, 2, 3, 4, 5, 6].reduce(reducer, []);
			expect(result).toEqual([2, 4, 6]);
		});

		it("should work with string predicates", () => {
			const startsWithA = (str: string) => str.startsWith("A");
			const transducer = filterTransducer<string, string[]>(startsWithA);
			const reducer = transducer(arrayReducer<string>);

			const result = ["Apple", "Banana", "Apricot", "Cherry", "Avocado"].reduce(
				reducer,
				[]
			);
			expect(result).toEqual(["Apple", "Apricot", "Avocado"]);
		});

		it("should work with object filtering", () => {
			interface Product {
				name: string;
				price: number;
				inStock: boolean;
			}

			const products: Product[] = [
				{ name: "Laptop", price: 1000, inStock: true },
				{ name: "Phone", price: 500, inStock: false },
				{ name: "Tablet", price: 300, inStock: true },
			];

			const inStockPredicate = (product: Product) => product.inStock;
			const transducer = filterTransducer<Product, Product[]>(inStockPredicate);
			const reducer = transducer(arrayReducer<Product>);

			const result = products.reduce(reducer, []);
			expect(result).toHaveLength(2);
			expect(result.every((p: Product) => p.inStock)).toBe(true);
		});

		it("should return empty array when no items match predicate", () => {
			const greaterThanTen = (x: number) => x > 10;
			const transducer = filterTransducer<number, number[]>(greaterThanTen);
			const reducer = transducer(arrayReducer<number>);

			const result = [1, 2, 3, 4, 5].reduce(reducer, []);
			expect(result).toEqual([]);
		});

		it("should work with sum reducer", () => {
			const isPositive = (x: number) => x > 0;
			const transducer = filterTransducer<number, number>(isPositive);
			const reducer = transducer(sumReducer);

			const result = [-2, 3, -1, 4, -5, 6].reduce(reducer, 0);
			expect(result).toBe(13); // 3 + 4 + 6
		});
	});

	describe("sortTransducer", () => {
		it("should sort numeric values in ascending order", () => {
			const ascendingSort = (a: number, b: number) => a - b;
			const transducer = sortTransducer<number>(ascendingSort);
			const reducer = transducer(arrayReducer<number>);

			const result = [3, 1, 4, 1, 5, 9, 2, 6].reduce(reducer, []);
			expect(result).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
		});

		it("should sort numeric values in descending order", () => {
			const descendingSort = (a: number, b: number) => b - a;
			const transducer = sortTransducer<number>(descendingSort);
			const reducer = transducer(arrayReducer<number>);

			const result = [3, 1, 4, 1, 5, 9, 2, 6].reduce(reducer, []);
			expect(result).toEqual([9, 6, 5, 4, 3, 2, 1, 1]);
		});

		it("should sort strings alphabetically", () => {
			const alphabeticalSort = (a: string, b: string) => a.localeCompare(b);
			const transducer = sortTransducer<string>(alphabeticalSort);
			const reducer = transducer(arrayReducer<string>);

			const result = ["banana", "apple", "cherry", "date"].reduce(reducer, []);
			expect(result).toEqual(["apple", "banana", "cherry", "date"]);
		});

		it("should sort objects by property", () => {
			interface Person {
				name: string;
				age: number;
			}

			const people: Person[] = [
				{ name: "Alice", age: 30 },
				{ name: "Bob", age: 25 },
				{ name: "Charlie", age: 35 },
			];

			const sortByAge = (a: Person, b: Person) => a.age - b.age;
			const transducer = sortTransducer<Person>(sortByAge);
			const reducer = transducer(arrayReducer<Person>);

			const result = people.reduce(reducer, []);
			expect(result).toEqual([
				{ name: "Bob", age: 25 },
				{ name: "Alice", age: 30 },
				{ name: "Charlie", age: 35 },
			]);
		});

		it("should handle empty arrays", () => {
			const ascendingSort = (a: number, b: number) => a - b;
			const transducer = sortTransducer<number>(ascendingSort);
			const reducer = transducer(arrayReducer<number>);

			const result = [].reduce(reducer, []);
			expect(result).toEqual([]);
		});

		it("should handle single element arrays", () => {
			const ascendingSort = (a: number, b: number) => a - b;
			const transducer = sortTransducer<number>(ascendingSort);
			const reducer = transducer(arrayReducer<number>);

			const result = [42].reduce(reducer, []);
			expect(result).toEqual([42]);
		});

		it("should maintain stable sorting for equal elements", () => {
			interface Item {
				value: number;
				id: string;
			}

			const items: Item[] = [
				{ value: 1, id: "a" },
				{ value: 2, id: "b" },
				{ value: 1, id: "c" },
				{ value: 2, id: "d" },
			];

			const sortByValue = (a: Item, b: Item) => a.value - b.value;
			const transducer = sortTransducer<Item>(sortByValue);
			const reducer = transducer(arrayReducer<Item>);

			const result = items.reduce(reducer, []);
			expect(result.map((item) => item.value)).toEqual([1, 1, 2, 2]);
		});
	});

	describe("createTakeTransducer", () => {
		it("should take the first n elements", () => {
			const takeThree = createTakeTransducer<number, number[]>(3);
			const reducer = takeThree(arrayReducer<number>);

			const result = [1, 2, 3, 4, 5, 6, 7].reduce(reducer, []);
			expect(result).toEqual([1, 2, 3]);
		});

		it("should take all elements when count is greater than array length", () => {
			const takeTen = createTakeTransducer<number, number[]>(10);
			const reducer = takeTen(arrayReducer<number>);

			const result = [1, 2, 3].reduce(reducer, []);
			expect(result).toEqual([1, 2, 3]);
		});

		it("should take zero elements when count is 0", () => {
			const takeZero = createTakeTransducer<number, number[]>(0);
			const reducer = takeZero(arrayReducer<number>);

			const result = [1, 2, 3, 4, 5].reduce(reducer, []);
			expect(result).toEqual([]);
		});

		it("should handle negative count as taking zero elements", () => {
			const takeNegative = createTakeTransducer<number, number[]>(-5);
			const reducer = takeNegative(arrayReducer<number>);

			const result = [1, 2, 3, 4, 5].reduce(reducer, []);
			expect(result).toEqual([]);
		});

		it("should work with string arrays", () => {
			const takeTwo = createTakeTransducer<string, string[]>(2);
			const reducer = takeTwo(arrayReducer<string>);

			const result = ["apple", "banana", "cherry", "date"].reduce(reducer, []);
			expect(result).toEqual(["apple", "banana"]);
		});

		it("should work with sum reducer", () => {
			const takeThree = createTakeTransducer<number, number>(3);
			const reducer = takeThree(sumReducer);

			const result = [10, 20, 30, 40, 50].reduce(reducer, 0);
			expect(result).toBe(60); // 10 + 20 + 30
		});

		it("should maintain state across different transducer instances", () => {
			const takeTwo1 = createTakeTransducer<number, number[]>(2);
			const takeTwo2 = createTakeTransducer<number, number[]>(2);
			const reducer1 = takeTwo1(arrayReducer<number>);
			const reducer2 = takeTwo2(arrayReducer<number>);

			const result1 = [1, 2, 3, 4].reduce(reducer1, []);
			const result2 = [5, 6, 7, 8].reduce(reducer2, []);

			expect(result1).toEqual([1, 2]);
			expect(result2).toEqual([5, 6]);
		});
	});

	describe("createSkipTransducer", () => {
		it("should skip the first n elements", () => {
			const skipThree = createSkipTransducer<number, number[]>(3);
			const reducer = skipThree(arrayReducer<number>);

			const result = [1, 2, 3, 4, 5, 6, 7].reduce(reducer, []);
			expect(result).toEqual([4, 5, 6, 7]);
		});

		it("should return empty array when count is greater than array length", () => {
			const skipTen = createSkipTransducer<number, number[]>(10);
			const reducer = skipTen(arrayReducer<number>);

			const result = [1, 2, 3].reduce(reducer, []);
			expect(result).toEqual([]);
		});

		it("should skip zero elements when count is 0", () => {
			const skipZero = createSkipTransducer<number, number[]>(0);
			const reducer = skipZero(arrayReducer<number>);

			const result = [1, 2, 3, 4, 5].reduce(reducer, []);
			expect(result).toEqual([1, 2, 3, 4, 5]);
		});

		it("should handle negative count as skipping zero elements", () => {
			const skipNegative = createSkipTransducer<number, number[]>(-5);
			const reducer = skipNegative(arrayReducer<number>);

			const result = [1, 2, 3, 4, 5].reduce(reducer, []);
			expect(result).toEqual([1, 2, 3, 4, 5]);
		});

		it("should work with string arrays", () => {
			const skipTwo = createSkipTransducer<string, string[]>(2);
			const reducer = skipTwo(arrayReducer<string>);

			const result = ["apple", "banana", "cherry", "date"].reduce(reducer, []);
			expect(result).toEqual(["cherry", "date"]);
		});

		it("should work with sum reducer", () => {
			const skipTwo = createSkipTransducer<number, number>(2);
			const reducer = skipTwo(sumReducer);

			const result = [10, 20, 30, 40, 50].reduce(reducer, 0);
			expect(result).toBe(120); // 30 + 40 + 50
		});

		it("should maintain state across different transducer instances", () => {
			const skipTwo1 = createSkipTransducer<number, number[]>(2);
			const skipTwo2 = createSkipTransducer<number, number[]>(2);
			const reducer1 = skipTwo1(arrayReducer<number>);
			const reducer2 = skipTwo2(arrayReducer<number>);

			const result1 = [1, 2, 3, 4].reduce(reducer1, []);
			const result2 = [5, 6, 7, 8].reduce(reducer2, []);

			expect(result1).toEqual([3, 4]);
			expect(result2).toEqual([7, 8]);
		});
	});

	describe("Transducer composition scenarios", () => {
		it("should work with map followed by filter using separate reductions", () => {
			const double = (x: number) => x * 2;
			const isGreaterThanFive = (x: number) => x > 5;

			const mapTransducerInstance = mapTransducer<number, number, number[]>(
				double
			);
			const filterTransducerInstance = filterTransducer<number, number[]>(
				isGreaterThanFive
			);

			// Apply map first, then filter
			const mapReducer = mapTransducerInstance(arrayReducer<number>);
			const tempResult = [1, 2, 3, 4, 5].reduce(mapReducer, []);
			// tempResult should be [2, 4, 6, 8, 10]

			const filterReducer = filterTransducerInstance(arrayReducer<number>);
			const finalResult = tempResult.reduce(filterReducer, []);

			expect(finalResult).toEqual([6, 8, 10]);
		});

		it("should work with filter followed by take using separate reductions", () => {
			const isEven = (x: number) => x % 2 === 0;
			const filterTransducerInstance = filterTransducer<number, number[]>(
				isEven
			);
			const takeTransducerInstance = createTakeTransducer<number, number[]>(2);

			// Apply filter first, then take
			const filterReducer = filterTransducerInstance(arrayReducer<number>);
			const tempResult = [1, 2, 3, 4, 5, 6, 7, 8].reduce(filterReducer, []);
			// tempResult should be [2, 4, 6, 8]

			const takeReducer = takeTransducerInstance(arrayReducer<number>);
			const finalResult = tempResult.reduce(takeReducer, []);

			expect(finalResult).toEqual([2, 4]);
		});

		it("should work with skip followed by sort using separate reductions", () => {
			const skipTransducerInstance = createSkipTransducer<number, number[]>(2);
			const sortTransducerInstance = sortTransducer<number>((a, b) => a - b);

			// Apply skip first, then sort
			const skipReducer = skipTransducerInstance(arrayReducer<number>);
			const tempResult = [5, 1, 8, 3, 9, 2].reduce(skipReducer, []);
			// tempResult should be [8, 3, 9, 2]

			const sortReducer = sortTransducerInstance(arrayReducer<number>);
			const finalResult = tempResult.reduce(sortReducer, []);

			expect(finalResult).toEqual([2, 3, 8, 9]);
		});
	});

	describe("Edge cases and error handling", () => {
		it("should handle undefined values in map transducer", () => {
			const identity = (x: number | undefined) => x;
			const transducer = mapTransducer<
				number | undefined,
				number | undefined,
				(number | undefined)[]
			>(identity);
			const reducer = transducer(arrayReducer<number | undefined>);

			const result = [1, undefined, 3, undefined, 5].reduce(reducer, []);
			expect(result).toEqual([1, undefined, 3, undefined, 5]);
		});

		it("should handle null values in filter transducer", () => {
			const isNotNull = (x: number | null) => x !== null;
			const transducer = filterTransducer<number | null, (number | null)[]>(
				isNotNull
			);
			const reducer = transducer(arrayReducer<number | null>);

			const result = [1, null, 3, null, 5].reduce(reducer, []);
			expect(result).toEqual([1, 3, 5]);
		});

		it("should handle empty arrays across all transducers", () => {
			const mapTransducerInstance = mapTransducer<number, number, number[]>(
				(x: number) => x * 2
			);
			const filterTransducerInstance = filterTransducer<number, number[]>(
				(x: number) => x > 0
			);
			const sortTransducerInstance = sortTransducer<number>((a, b) => a - b);
			const takeTransducerInstance = createTakeTransducer<number, number[]>(5);
			const skipTransducerInstance = createSkipTransducer<number, number[]>(2);

			const emptyArray: number[] = [];

			expect(
				emptyArray.reduce(mapTransducerInstance(arrayReducer<number>), [])
			).toEqual([]);
			expect(
				emptyArray.reduce(filterTransducerInstance(arrayReducer<number>), [])
			).toEqual([]);
			expect(
				emptyArray.reduce(sortTransducerInstance(arrayReducer<number>), [])
			).toEqual([]);
			expect(
				emptyArray.reduce(takeTransducerInstance(arrayReducer<number>), [])
			).toEqual([]);
			expect(
				emptyArray.reduce(skipTransducerInstance(arrayReducer<number>), [])
			).toEqual([]);
		});

		it("should handle large datasets efficiently", () => {
			const largeArray = Array.from({ length: 10000 }, (_, i) => i);

			const takeTransducerInstance = createTakeTransducer<number, number[]>(
				100
			);
			const reducer = takeTransducerInstance(arrayReducer<number>);

			const start = Date.now();
			const result = largeArray.reduce(reducer, []);
			const end = Date.now();

			expect(result).toHaveLength(100);
			expect(result[0]).toBe(0);
			expect(result[99]).toBe(99);
			// Should complete quickly (less than 100ms for this size)
			expect(end - start).toBeLessThan(100);
		});
	});

	describe("String concatenation reducer tests", () => {
		it("should work with map transducer and string concatenation", () => {
			const addPrefix = (x: number) => `num_${x}`;
			const transducer = mapTransducer<number, string, string>(addPrefix);
			const reducer = transducer(stringConcatReducer);

			const result = [1, 2, 3].reduce(reducer, "");
			expect(result).toBe("num_1num_2num_3");
		});

		it("should work with filter transducer and string concatenation", () => {
			const isVowel = (char: string) => "aeiou".includes(char.toLowerCase());
			const transducer = filterTransducer<string, string>(isVowel);
			const reducer = transducer(stringConcatReducer);

			const result = [
				"h",
				"e",
				"l",
				"l",
				"o",
				" ",
				"w",
				"o",
				"r",
				"l",
				"d",
			].reduce(reducer, "");
			expect(result).toBe("eoo"); // Only vowels: e, o, o
		});
	});
});
