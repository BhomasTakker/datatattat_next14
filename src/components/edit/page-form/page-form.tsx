import { Button } from "@/components/ui/button";
import { META_CONFIG } from "../config/page/meta/meta-config";
import { PROFILE_CONFIG } from "../config/page/profile/profile-config";
import { InputFactory } from "../inputs/input-factory";
import { PAGE_CONFIG } from "../config/page/page-config";
import styles from "./page-form.module.scss";
import { DebugComponent } from "./debug-component";

type PageFormProps = {
	submitHandler: (e?: React.BaseSyntheticEvent) => Promise<void>;
	saveAsTemplateHandler?: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

// get from config
const ROUTE = "route";
const CREATOR = "creator";
const CONTENT = "content";
const META = "meta";
const PROFILE = "profile";

const formIds = {
	creator: CREATOR,
	content: CONTENT,
	meta: META,
	profile: PROFILE,
	route: ROUTE,
};

export const PageForm = ({
	submitHandler,
	saveAsTemplateHandler,
}: PageFormProps) => {
	// const { submitHandler, pageState, formIds } = useContext(PageFormContext);
	// We need to show a preview of the page

	const { meta, profile, content } = formIds;

	return (
		<form onSubmit={submitHandler} className={styles.form}>
			{/* These don't work properly unless first input is an inputList?  */}
			<Button onClick={saveAsTemplateHandler}>Save Page As Template</Button>
			<InputFactory data={{ ...META_CONFIG, id: meta }} />
			<InputFactory data={{ ...PROFILE_CONFIG, id: profile }} />

			<InputFactory data={{ ...PAGE_CONFIG, id: `${content}` }} />
			<Button type="submit">Submit</Button>
			<DebugComponent />
		</form>
	);
};
