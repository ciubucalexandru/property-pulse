"use server";

import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";

export default async function deleteMessage(messageId: string) {
	await connectDB();
	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("User ID is required");
	}

	const { userId } = sessionUser;
	const message = await Message.findById(messageId);

	if (userId !== message.recipient.toString()) {
		throw new Error("You are not authorized to delete this message");
	}

	await message.deleteOne();

	revalidatePath("/messages");
}
