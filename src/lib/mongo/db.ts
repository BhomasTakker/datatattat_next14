// https://medium.com/@elhamrani.omar23/next-js-14-server-actions-with-typescript-mongodb-mongoose-4a11575b987c
// Importing mongoose library along with Connection type from it
import mongoose, { Connection } from "mongoose";

// Declaring a variable to store the cached database connection
let cachedConnection: Connection | null = null;

// Function to establish a connection to MongoDB
export async function connectToMongoDB() {
	// If a cached connection exists, return it
	if (cachedConnection) {
		console.log("Using cached db connection");
		return cachedConnection;
	}
	try {
		// Check the thing exists and throw an error if it doesn'ts
		// If no cached connection exists, establish a new connection to MongoDB
		const cnx = await mongoose.connect(process.env.MONGODB_URI!);
		// Cache the connection for future use
		cachedConnection = cnx.connection;
		// Log message indicating a new MongoDB connection is established
		console.log("New mongodb connection established");
		// Return the newly established connection

		// not here / we can create a search index on Atlas
		// view and properly investigate
		// https://www.youtube.com/playlist?list=PL4RCxklHWZ9sEaTrqx7DOxQ5FzwDOTWFj
		const articlesCollection = cachedConnection.collection("articles");
		await articlesCollection.createIndexes([
			{ name: "text", key: { title: "text" } },
		]);

		return cachedConnection;
	} catch (error) {
		// If an error occurs during connection, log the error and throw it
		console.log(error);
		throw error;
	}
}
