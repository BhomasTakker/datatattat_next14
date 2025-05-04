import * as cheerio from "cheerio";

// https://stackoverflow.com/questions/822452/strip-html-tags-from-text-using-plain-javascript/47140708#47140708
export const stripHTML = (html: string) => {
	const cheerioString = cheerio.load(html);
	const asString = cheerioString.text();
	return asString;
};

// https://www.npmjs.com/package/dompurify
// For DOMPurify see
// src\utils\react\set-dangerously.ts
// Something like

// export const setDangerously = (
// 	html: DangerousHTML,
// 	id?: string
// ): DangerouslyType => {
// 	const sanitizedHTML = DOMPurify.sanitize(html, {
// 		// only do on trustedSources?
// 		ALLOWED_TAGS: ["iframe"],
// 		ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
//     // remove svg and math ml
//     USE_PROFILES: {html: true},
// 	});

// 	return {
// 		__html: sanitizedHTML,
// 	};
// };
