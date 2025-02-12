import { Avatar } from "@/types/data-structures/collection/base";
import { UnknownObject } from "@/types/utils";

type ValidateArticle = {
	title?: string | null;
	avatar?: Avatar | null;
} & UnknownObject;
// not here but / we are getting messy!
export const validateArticleData = (item: ValidateArticle) => {
	const { title, avatar } = item || {};
	if (!title || !avatar) {
		return false;
	}
	return true;
};
