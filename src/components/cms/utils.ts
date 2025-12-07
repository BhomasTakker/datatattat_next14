const CMS_API_KEY = process.env.CMS_API_KEY || "";
const CMS_ROUTE = process.env.CMS_ROUTE || "";

export const getRoute = (url: string = "") => CMS_ROUTE + url;
export const getCMSHeaders = () => ({
	"Content-Type": "application/json",
	"x-api-key": CMS_API_KEY,
});
