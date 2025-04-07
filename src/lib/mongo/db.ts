// https://medium.com/@elhamrani.omar23/next-js-14-server-actions-with-typescript-mongodb-mongoose-4a11575b987c
// Importing mongoose library along with Connection type from it
import mongoose, { Connection } from "mongoose";

// We can set indexes on atlas / we should also create a search instead of an index
// https://www.youtube.com/playlist?list=PL4RCxklHWZ9sEaTrqx7DOxQ5FzwDOTWFj

let cachedConnection: Connection | null = null;

export async function connectToMongoDB_Old() {
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

// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.ts
declare global {
	var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToMongoDB() {
	const MONGODB_URI = process.env.MONGODB_URI!;

	if (!MONGODB_URI) {
		throw new Error(
			"Please define the MONGODB_URI environment variable inside .env.local"
		);
	}

	if (cached.conn) {
		return cached.conn;
	}
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};
		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}
	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}
