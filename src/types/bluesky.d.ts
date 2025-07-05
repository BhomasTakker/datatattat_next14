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
