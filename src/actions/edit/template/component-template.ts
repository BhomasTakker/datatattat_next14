"use server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { connectToMongoDB } from "@/lib/mongo/db";
import { Session } from "@/types/auth/session";
import { PageComponent } from "@/types/page";
import { saveOrCreateComponentTemplateByKey } from "@/lib/mongo/actions/user/template/component";

export async function saveComponentAsTemplate(
	componentId: string,
	component: PageComponent
) {
	await connectToMongoDB();

	const session = (await getServerSession(options)) as Session;

	const { user } = session;
	const { user_id } = user;
	//return await saveOrCreatePageByRoute(page, user_id);
	return await saveOrCreateComponentTemplateByKey(
		componentId,
		component,
		user_id
	);
}
