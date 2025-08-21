import MessageCard from "@/components/MessageCard";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import "@/models/Property";
import { IMessage } from "@/types/types";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import { Types } from "mongoose";

const Page: React.FC = async () => {
	connectDB();

	const sessionUser = await getSessionUser();
	if (!sessionUser || !sessionUser.userId) {
		throw new Error("User ID is required");
	}

	const { userId } = sessionUser;

	const messagesDocs = await Message.find({
		recipient: userId,
	})
		.sort({ createdAt: -1 })
		.populate("sender", "username")
		.populate("property", "name")
		.lean<IMessage[]>();

	const messages = messagesDocs.map((messageDoc) => {
		const message = convertToSerializableObject(messageDoc) || {};
		message.sender = convertToSerializableObject(
			messageDoc.sender as Types.ObjectId
		);
		message.property = convertToSerializableObject(
			messageDoc.property as Types.ObjectId
		);

		return message;
	});

	return (
		<section className="bg-blue-50">
			<div className="container m-auto py-24 max-w-6xl">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<h1 className="text-3xl font-bold mb-4">Your Messages</h1>
					<div className="space-y-4">
						{messages.length === 0 ? (
							<p>You have no messages</p>
						) : (
							messages.map((message) => (
								<MessageCard
									key={message._id}
									message={message as IMessage}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Page;
