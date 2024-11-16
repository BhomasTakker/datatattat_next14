import { connectToMongoDB } from "../mongo/db";

export const initialiseServices = () => {
	connectToMongoDB();
};
