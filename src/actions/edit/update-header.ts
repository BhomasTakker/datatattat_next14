"use server";

import { revalidatePath } from "next/cache";

// This is Submit Header Form
export async function updateHeader(prevState: any, formData: FormData) {
	// Revalidate the path of the page you just updated
	// revalidatePath("/edit");

	console.log({ message: "Created or Updated Header!", prevState, formData });

	return { message: "Created or Updated Header!" };
}
