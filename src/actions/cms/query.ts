"use server";

const CMS_API_KEY = process.env.CMS_API_KEY || "";

export const getCMSHeaders = async () => ({
	"Content-Type": "application/json",
	"x-api-key": CMS_API_KEY,
});
