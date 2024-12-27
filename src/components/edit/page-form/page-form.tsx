import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { PageFormContext } from "./context/page-form-context";
import { META_CONFIG } from "../config/page/meta/meta-config";
import { PROFILE_CONFIG } from "../config/page/profile/profile-config";
import { InputFactory } from "../inputs/input-factory";
import { PAGE_CONFIG } from "../config/page/page-config";
import styles from "./page-form.module.scss";

export const PageForm = () => {
	const { submitHandler, pageState, formIds, page } =
		useContext(PageFormContext);
	// We need to show a preview of the page
	// We need to have page meta, page profile, page content forms or form inputs
	// We need to store creator_id, page_id, page_route, page_meta, page_profile, page_content

	const { meta, profile, content } = formIds;

	return (
		<form onSubmit={submitHandler} className={styles.form}>
			{/* These don't work properly unless first input is an inputList?  */}
			<InputFactory data={{ ...META_CONFIG, id: meta }} />
			<InputFactory data={{ ...PROFILE_CONFIG, id: profile }} />

			<InputFactory data={{ ...PAGE_CONFIG, id: `${content}` }} />

			<Button type="submit">Submit</Button>
			<p aria-live="polite" role="status">
				{pageState}
			</p>
		</form>
	);
};
