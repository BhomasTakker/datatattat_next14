"use server";

export async function getData() {
	return await new Promise((resolve) => {
		setTimeout(() => resolve("data!!!!!"), 2000);
	});
}
