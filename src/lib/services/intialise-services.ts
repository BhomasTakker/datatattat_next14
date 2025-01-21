import { connectToMongoDB } from "../mongo/db";
import { connectToRedisDB } from "../redis/db";

export const initialiseServices = () => {
	try {
		connectToMongoDB();
		// connectToRedisDB();
	} catch (error) {
		// console.log(error);
	}
};
