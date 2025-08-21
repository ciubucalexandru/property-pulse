"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const markMessageAsRead = async (messageId: string) => {
	await connectDB();
	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("User ID is required");
	}

	const { userId } = sessionUser;

	const message = await Message.findById(messageId);

	if (!message) {
		throw new Error("Message not found");
	}

	if (message.recipient.toString() !== userId) {
		console.log(message.recipient, userId);
		throw new Error(
			"You do not have permission to mark this message as read"
		);
	}

	message.read = !message.read;
	revalidatePath("/messages");
	await message.save();

	return message.read;
};

export default markMessageAsRead;
