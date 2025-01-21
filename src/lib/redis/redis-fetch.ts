// @ts-nocheck - Ignoring until we have a better solution for redis

import { UnknownObject } from "@/types/utils";
import { connectToRedisDB } from "./db";

type FetchFn = () => Promise<UnknownObject | null>;

// Should generic
export const fetchWithCache = async (
	fetchFn: FetchFn,
	key: string,
	expiry: number = 60 * 60 * 24
) => {
	try {
		const client = connectToRedisDB();
		const cachedData = await client.get(key);
		if (cachedData) {
			return JSON.parse(cachedData);
		}
		const data = await fetchFn();
		// set one day cache for now :/
		// redis upstash is better at this?
		await client.set(key, JSON.stringify(data), "EX", expiry);
		// don't overwrite a lower cache
		// is for redis upstash
		// await client.expire(key.toString(), cacheExpire, "lt");
		return data;
	} catch (error) {
		// We should set a delay?
		// Or change approach/provider
		// No more cache!
		const data = await fetchFn();
		return data;
	}
};
