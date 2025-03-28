import Redis from "ioredis";
// import { Redis } from "@upstash/redis";
import { REDIS_URL } from "./config";

// Declaring a variable to store the cached database connection
let cachedConnection: Redis | null = null;

export const connectToRedisDB = () => {
	// console.log("Connecting to redis db");
	// throw new Error("Not implemented properly");
	if (cachedConnection) {
		// console.log("Using cached redis db connection");
		return cachedConnection;
	}
	try {
		const cnx = new Redis(REDIS_URL, { showFriendlyErrorStack: true });
		cachedConnection = cnx;
		console.log("New redis db connection established");
		return cachedConnection;
	} catch (error) {
		// If an error occurs during connection, log the error and throw it
		// console.log(error);
		throw error;
	}
};
