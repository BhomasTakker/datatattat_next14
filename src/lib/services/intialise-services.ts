import { connectToMongoDB } from "../mongo/db";
import { connectToRedisDB } from "../redis/db";

export const initialiseServices = async () => {
	try {
		await connectToMongoDB();
		connectToRedisDB();
	} catch (error) {
		// console.log(error);
	}
};
