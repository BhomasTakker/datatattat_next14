export type BlueSkyAuthor = {
	did: string; // Decentralized Identifier of the author
	handle: string; // BlueSky handle (e.g., username.bsky.social)
	displayName?: string; // Optional display name of the author
	description?: string; // Optional description of the author
	avatar?: string; // Optional avatar URL of the author
	associated?: unknown;
	labels?: string[];
	createdAt?: string; // Optional timestamp when the author was indexed
};

export type BlueSkyRecord = {
	createdAt: string;
	langs: string[];
	reply?: {
		root: {
			uri: string;
		};
		parent: {
			uri: string;
		};
	};
	text: string;
};

export type BlueSkyPost = {
	uri: string;
	cid: string;
	author: BlueSkyAuthor;
	record: BlueSkyRecord;
	replyCount: number;
	repostCount: number;
	likeCount: number;
	quoteCount: number;
	indexedAt: string;
	label: string[];
};

export type BlueSkyPostParent = {
	post: BlueSkyPost;
	parent?: BlueSkyPostParent;
	threadContext?: unknown;
};

export type BlueSkyThread = {
	post: BlueSkyPost;
	parent: BlueSkyPostParent;
	replies: BlueSkyPost[];
	uri: string; // URI of the thread
	depth?: number; // Optional depth of the thread
	parentHeight?: number; // Optional height of the parent post
};

export type SearchPostsParams = {
	q: string; // Author DID
	sort?: "top" | "latest"; // Cursor for pagination
	until?: string; // Filter posts until this date
	since?: string; // Filter posts since this date
	mentions?: string; // Mentions - User @
	author?: string; // Author - User @
	lang?: string; // Language
	domain?: string; // Domain
	url?: string; // URL
	tag?: string[]; // Tag
	cursor?: string;
	limit?: number; // Number of posts to fetch
};

export type PostThreadParams = {
	uri: string; // Post URI
	depth?: number; // Depth of replies to fetch
	parentHeight?: number; // Height of the parent post
};
