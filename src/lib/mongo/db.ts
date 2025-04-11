import mongoose from "mongoose";

// We can set indexes on atlas / we should also create a search instead of an index
// https://www.youtube.com/playlist?list=PL4RCxklHWZ9sEaTrqx7DOxQ5FzwDOTWFj

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
		console.log("returned cached connection");
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
		// log error - we have had the very occasional error
		cached.promise = null;
		throw e;
	}

	console.log("created new connection");
	return cached.conn;
}
