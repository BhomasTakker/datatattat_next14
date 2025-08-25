import { composeTransducers, processWithTransducer } from "./index";
import {
	filterTransducer,
	sortTransducer,
	createTakeTransducer,
	createSkipTransducer,
} from "./transducers/transducers";

// Example data structures for demonstration
interface Song {
	id: string;
	name: string;
	artist: string;
	duration: number; // in seconds
	popularity: number; // 0-100
	genre: string;
	releaseYear: number;
}

// Sample data
const songs: Song[] = [
	{
		id: "1",
		name: "Bohemian Rhapsody",
		artist: "Queen",
		duration: 355,
		popularity: 95,
		genre: "Rock",
		releaseYear: 1975,
	},
	{
		id: "2",
		name: "Imagine",
		artist: "John Lennon",
		duration: 183,
		popularity: 90,
		genre: "Pop",
		releaseYear: 1971,
	},
	{
		id: "3",
		name: "Stairway to Heaven",
		artist: "Led Zeppelin",
		duration: 482,
		popularity: 88,
		genre: "Rock",
		releaseYear: 1971,
	},
	{
		id: "4",
		name: "Billie Jean",
		artist: "Michael Jackson",
		duration: 294,
		popularity: 92,
		genre: "Pop",
		releaseYear: 1982,
	},
	{
		id: "5",
		name: "Hotel California",
		artist: "Eagles",
		duration: 391,
		popularity: 89,
		genre: "Rock",
		releaseYear: 1976,
	},
	{
		id: "6",
		name: "Sweet Child O' Mine",
		artist: "Guns N' Roses",
		duration: 356,
		popularity: 87,
		genre: "Rock",
		releaseYear: 1987,
	},
];

// Example 1: Basic filtering - Get only Rock songs
export const example1_BasicFiltering = () => {
	console.log("=== Example 1: Basic Filtering ===");

	const filterRock = filterTransducer<Song, Song[]>(
		(song) => song.genre === "Rock"
	);
	const transducer = composeTransducers(filterRock);

	const result = processWithTransducer(songs, transducer);

	console.log("Original songs:", songs.length);
	console.log("Rock songs:", result.length);
	console.log(
		"Rock songs list:",
		result.map((s) => `${s.name} by ${s.artist}`)
	);
	return result;
};

// Example 2: Chaining filters - Popular rock songs from the 70s
export const example2_ChainedFilters = () => {
	console.log("\n=== Example 2: Chained Filters ===");

	const filterRock = filterTransducer<Song, Song[]>(
		(song) => song.genre === "Rock"
	);
	const filterPopular = filterTransducer<Song, Song[]>(
		(song) => song.popularity > 85
	);
	const filter70s = filterTransducer<Song, Song[]>(
		(song) => song.releaseYear >= 1970 && song.releaseYear < 1980
	);

	const transducer = composeTransducers(filterRock, filterPopular, filter70s);
	const result = processWithTransducer(songs, transducer);

	console.log(
		"Popular rock songs from the 70s:",
		result.map((s) => `${s.name} (${s.releaseYear})`)
	);
	return result;
};

// Example 3: Sorting with filters
export const example3_SortingWithFilters = () => {
	console.log("\n=== Example 3: Sorting with Filters ===");

	// Get all songs, sort by popularity (descending)
	const sortByPopularity = sortTransducer<Song>(
		(a, b) => b.popularity - a.popularity
	);
	const transducer = composeTransducers(sortByPopularity);

	const result = processWithTransducer(songs, transducer);

	console.log("Songs sorted by popularity:");
	result.forEach((song, index) => {
		console.log(
			`${index + 1}. ${song.name} by ${song.artist} (${song.popularity}%)`
		);
	});
	return result;
};

// Example 4: Taking top N items
export const example4_TopN = () => {
	console.log("\n=== Example 4: Top N Items ===");

	// Sort by popularity and take top 3
	const sortByPopularity = sortTransducer<Song>(
		(a, b) => b.popularity - a.popularity
	);
	const takeTop3 = createTakeTransducer<Song, Song[]>(3);

	const transducer = composeTransducers(sortByPopularity, takeTop3);
	const result = processWithTransducer(songs, transducer);

	console.log("Top 3 most popular songs:");
	result.forEach((song, index) => {
		console.log(
			`${index + 1}. ${song.name} by ${song.artist} (${song.popularity}%)`
		);
	});
	return result;
};

// Example 5: Pagination with skip and take
export const example5_Pagination = () => {
	console.log("\n=== Example 5: Pagination (Skip and Take) ===");

	// Sort by release year, skip first 2, take next 3
	const sortByYear = sortTransducer<Song>(
		(a, b) => a.releaseYear - b.releaseYear
	);
	const skipFirst2 = createSkipTransducer<Song, Song[]>(2);
	const takeNext3 = createTakeTransducer<Song, Song[]>(3);

	const transducer = composeTransducers(sortByYear, skipFirst2, takeNext3);
	const result = processWithTransducer(songs, transducer);

	console.log("Songs 3-5 when sorted by year:");
	result.forEach((song, index) => {
		console.log(`${index + 1}. ${song.name} (${song.releaseYear})`);
	});
	return result;
};

// Example 6: Complex filtering and sorting
export const example6_ComplexPipeline = () => {
	console.log("\n=== Example 6: Complex Pipeline ===");

	// Filter songs with duration > 4 minutes, sort by duration, take longest 3
	const filterLongSongs = filterTransducer<Song, Song[]>(
		(song) => song.duration > 240
	);
	const sortByDuration = sortTransducer<Song>(
		(a, b) => b.duration - a.duration
	);
	const takeLongest3 = createTakeTransducer<Song, Song[]>(3);

	const transducer = composeTransducers(
		filterLongSongs,
		sortByDuration,
		takeLongest3
	);
	const result = processWithTransducer(songs, transducer);

	console.log("Top 3 longest songs (over 4 minutes):");
	result.forEach((song, index) => {
		const minutes = Math.floor(song.duration / 60);
		const seconds = song.duration % 60;
		console.log(
			`${index + 1}. ${song.name} by ${song.artist} (${minutes}:${seconds
				.toString()
				.padStart(2, "0")})`
		);
	});
	return result;
};

// Example 7: Working with different data - String processing
export const example7_StringProcessing = () => {
	console.log("\n=== Example 7: String Processing ===");

	const words = [
		"apple",
		"banana",
		"cherry",
		"date",
		"elderberry",
		"fig",
		"grape",
		"honeydew",
	];

	// Filter words longer than 4 characters, sort alphabetically, take first 4
	const filterLongWords = filterTransducer<string, string[]>(
		(word) => word.length > 4
	);
	const sortAlphabetically = sortTransducer<string>((a, b) =>
		a.localeCompare(b)
	);
	const takeFirst4 = createTakeTransducer<string, string[]>(4);

	const transducer = composeTransducers(
		filterLongWords,
		sortAlphabetically,
		takeFirst4
	);
	const result = processWithTransducer(words, transducer);

	console.log("Original words:", words);
	console.log("Filtered and processed words:", result);
	return result;
};

// Example 8: Number processing
export const example8_NumberProcessing = () => {
	console.log("\n=== Example 8: Number Processing ===");

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 20];

	// Filter even numbers, sort descending, take top 5
	const filterEven = filterTransducer<number, number[]>((n) => n % 2 === 0);
	const sortDescending = sortTransducer<number>((a, b) => b - a);
	const takeTop5 = createTakeTransducer<number, number[]>(5);

	const transducer = composeTransducers(filterEven, sortDescending, takeTop5);
	const result = processWithTransducer(numbers, transducer);

	console.log("Original numbers:", numbers);
	console.log("Even numbers, sorted descending, top 5:", result);
	return result;
};

// Example 9: Creating a playlist - Real-world scenario
export const example9_CreatePlaylist = () => {
	console.log("\n=== Example 9: Create Playlist (Real-world Scenario) ===");

	// Create a "Classic Hits" playlist:
	// 1. Songs from 1970-1990
	// 2. Popularity > 85
	// 3. Sort by popularity
	// 4. Take top 4

	const filterClassicEra = filterTransducer<Song, Song[]>(
		(song) => song.releaseYear >= 1970 && song.releaseYear <= 1990
	);
	const filterPopular = filterTransducer<Song, Song[]>(
		(song) => song.popularity > 85
	);
	const sortByPopularity = sortTransducer<Song>(
		(a, b) => b.popularity - a.popularity
	);
	const takeTop4 = createTakeTransducer<Song, Song[]>(4);

	const transducer = composeTransducers(
		filterClassicEra,
		filterPopular,
		sortByPopularity,
		takeTop4
	);

	const result = processWithTransducer(songs, transducer);

	console.log("🎵 Classic Hits Playlist:");
	result.forEach((song, index) => {
		console.log(
			`${index + 1}. ${song.name} by ${song.artist} (${song.releaseYear}) - ${
				song.popularity
			}%`
		);
	});
	return result;
};

// Example 10: Demonstrating transducer composability
export const example10_TransducerComposability = () => {
	console.log("\n=== Example 10: Transducer Composability ===");

	// Show how you can create reusable transducers and compose them differently
	const popularFilter = filterTransducer<Song, Song[]>(
		(song) => song.popularity > 87
	);
	const rockFilter = filterTransducer<Song, Song[]>(
		(song) => song.genre === "Rock"
	);
	const popFilter = filterTransducer<Song, Song[]>(
		(song) => song.genre === "Pop"
	);
	const sortByYear = sortTransducer<Song>(
		(a, b) => a.releaseYear - b.releaseYear
	);
	const take2 = createTakeTransducer<Song, Song[]>(2);

	// Composition 1: Popular Rock songs
	const popularRock = composeTransducers(
		popularFilter,
		rockFilter,
		sortByYear,
		take2
	);
	const rockResult = processWithTransducer(songs, popularRock);

	// Composition 2: Popular Pop songs
	const popularPop = composeTransducers(
		popularFilter,
		popFilter,
		sortByYear,
		take2
	);
	const popResult = processWithTransducer(songs, popularPop);

	console.log("Popular Rock songs (chronologically):");
	rockResult.forEach((song) =>
		console.log(`- ${song.name} by ${song.artist} (${song.releaseYear})`)
	);

	console.log("\nPopular Pop songs (chronologically):");
	popResult.forEach((song) =>
		console.log(`- ${song.name} by ${song.artist} (${song.releaseYear})`)
	);

	return { rock: rockResult, pop: popResult };
};

// Example 11: Using mapTransducer for data transformation
export const example11_DataTransformation = () => {
	console.log("\n=== Example 11: Data Transformation with mapTransducer ===");

	// Since mapTransducer changes the output type, we need a different approach
	// Let's demonstrate by transforming and then using traditional array methods

	const numbers = [1, 2, 3, 4, 5];

	// First, let's show basic filtering and sorting, then transform the results
	const filterOdd = filterTransducer<number, number[]>((n) => n % 2 === 1);
	const sortDesc = sortTransducer<number>((a, b) => b - a);

	const transducer = composeTransducers(filterOdd, sortDesc);
	const filteredNumbers = processWithTransducer(numbers, transducer);

	// Now transform the filtered results
	const doubled = filteredNumbers.map((n) => n * 2);
	const stringified = filteredNumbers.map((n) => `Number: ${n}`);

	console.log("Original numbers:", numbers);
	console.log("Filtered odd numbers (desc):", filteredNumbers);
	console.log("Doubled:", doubled);
	console.log("Stringified:", stringified);

	return { original: numbers, filtered: filteredNumbers, doubled, stringified };
};

// Example 12: Practical Spotify data processing
export const example12_SpotifyDataProcessing = () => {
	console.log("\n=== Example 12: Practical Spotify Data Processing ===");

	// Real-world scenario: Create different types of playlists

	// 1. "Workout Playlist" - High energy songs (popularity > 90), shorter duration
	const workoutFilter = composeTransducers(
		filterTransducer<Song, Song[]>((song) => song.popularity > 90),
		filterTransducer<Song, Song[]>((song) => song.duration < 300), // under 5 minutes
		sortTransducer<Song>((a, b) => b.popularity - a.popularity)
	);

	const workoutSongs = processWithTransducer(songs, workoutFilter);

	// 2. "Chill Playlist" - Moderate popularity, longer songs
	const chillFilter = composeTransducers(
		filterTransducer<Song, Song[]>(
			(song) => song.popularity >= 85 && song.popularity <= 92
		),
		filterTransducer<Song, Song[]>((song) => song.duration >= 300), // 5+ minutes
		sortTransducer<Song>((a, b) => a.releaseYear - b.releaseYear) // chronological
	);

	const chillSongs = processWithTransducer(songs, chillFilter);

	// 3. "Discovery Playlist" - Less popular songs that might be hidden gems
	const discoveryFilter = composeTransducers(
		filterTransducer<Song, Song[]>(
			(song) => song.popularity >= 85 && song.popularity < 90
		),
		sortTransducer<Song>((a, b) => b.releaseYear - a.releaseYear), // newest first
		createTakeTransducer<Song, Song[]>(3)
	);

	const discoverySongs = processWithTransducer(songs, discoveryFilter);

	console.log("🏋️ Workout Playlist (High energy, short):");
	workoutSongs.forEach((song) =>
		console.log(`- ${song.name} by ${song.artist}`)
	);

	console.log("\n🎵 Chill Playlist (Moderate popularity, longer):");
	chillSongs.forEach((song) => console.log(`- ${song.name} by ${song.artist}`));

	console.log("\n🔍 Discovery Playlist (Hidden gems):");
	discoverySongs.forEach((song) =>
		console.log(`- ${song.name} by ${song.artist}`)
	);

	return {
		workout: workoutSongs,
		chill: chillSongs,
		discovery: discoverySongs,
	};
};

// Function to run all examples
export const runAllExamples = () => {
	console.log("🎵 Transducers Examples for Data Manipulation 🎵\n");

	example1_BasicFiltering();
	example2_ChainedFilters();
	example3_SortingWithFilters();
	example4_TopN();
	example5_Pagination();
	example6_ComplexPipeline();
	example7_StringProcessing();
	example8_NumberProcessing();
	example9_CreatePlaylist();
	example10_TransducerComposability();
	example11_DataTransformation();
	example12_SpotifyDataProcessing();

	console.log("\n✨ All examples completed!");
};

// Export individual examples and data for testing
export { songs as sampleData, processWithTransducer };
