"use server";

import { revalidatePath } from "next/cache";

export async function updatePage(prevState: any, formData: FormData) {
	// Revalidate the path of the page you just updated
	// revalidatePath("/edit");

	console.log({ message: "Created or Updated Page!", prevState, formData });

	return { message: "Created or Updated Page!" };
}
