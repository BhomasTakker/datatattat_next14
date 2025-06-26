import Redis from "ioredis";
// import { Redis } from "@upstash/redis";
import { REDIS_URL } from "./config";

// Declaring a variable to store the cached database connection
let cachedConnection: Redis | null = null;

export const connectToRedisDB = () => {
	// If we are avoiding redis in development mode, throw an error
	// We were still initialising etc which was throwing erros when limit reached
	// This is a bit if a fudge but it works for now
	if (
		process.env.NODE_ENV === "development" ||
		process.env.ENVIRONMENT === "development"
	) {
		throw new Error("Redis DB connection not implemented in development mode");
	}
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
		// console.log(error);
		throw error;
	}
};
