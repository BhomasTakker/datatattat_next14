"use server";

const url1 =
	"https://publish.twitter.com/oembed?url=https://x.com/tparsi/status/1937480651868881310&omit_script=1";
const url2 =
	"https://www.reddit.com/oembed?url=https://www.reddit.com/r/aww/comments/crpjwk/every_year_this_mama_duck_brings_her_babies_to_my/";
const url3 =
	"https://noembed.com/embed?url=https://www.youtube.com/watch?v=9bZkp7q19f0";

export const getOembed = async (src: string) => {
	console.log("9999 getOembed", { src });
	try {
		const data = await fetch(url1);
		console.log("9999", { data });
		const json = await data.json();
		console.log("9999", { json });
		return json;
	} catch (err) {
		return "error";
	}
};
