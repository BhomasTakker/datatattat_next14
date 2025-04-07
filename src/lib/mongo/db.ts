// https://medium.com/@elhamrani.omar23/next-js-14-server-actions-with-typescript-mongodb-mongoose-4a11575b987c
// Importing mongoose library along with Connection type from it
import mongoose, { Connection } from "mongoose";

// We can set indexes on atlas / we should also create a search instead of an index
// https://www.youtube.com/playlist?list=PL4RCxklHWZ9sEaTrqx7DOxQ5FzwDOTWFj

let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
	if (cachedConnection) {
		console.log("Using cached db connection");
		return cachedConnection;
	}
	try {
		const cnx = await mongoose.connect(process.env.MONGODB_URI!);
		cachedConnection = cnx.connection;

		console.log("New mongodb connection established");

		return cachedConnection;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
