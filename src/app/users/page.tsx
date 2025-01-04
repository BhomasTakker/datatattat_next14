import { PATHS } from "@/lib/routing/paths";
import { redirect } from "next/navigation";

export default async function Page() {
	// just redirect for now
	redirect(`${PATHS.home()}`);
}
