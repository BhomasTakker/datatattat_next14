import { connectToMongoDB } from "../mongo/db";
import { connectToRedisDB } from "../redis/db";

export const initialiseServices = () => {
	connectToMongoDB();
	connectToRedisDB();
};
