"use client";

import React from "react";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import { IMessage, IProperty } from "@/types/types";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

type MessageCardProps = {
	message: IMessage;
};

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
	const { setUnreadCount } = useGlobalContext();

	const handleReadClick = async () => {
		await markMessageAsRead(message?._id?.toString() || "");
		setUnreadCount((prevCount) => {
			const count = parseInt(prevCount, 10) || 0;
			return (message.read ? count + 1 : count - 1).toString();
		});
	};

	const handleDeleteClick = async () => {
		await deleteMessage(message?._id?.toString() || "");
	};

	return (
		<div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
			{!message.read && (
				<div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
					New
				</div>
			)}
			<h2 className="text-xl mb-4">
				<span className="font-bold">Property Inquiry:</span>{" "}
				{(message.property as IProperty).name}
			</h2>
			<p className="text-gray-700">{message.body}</p>
			<ul className="mt-4">
				<li>
					<strong>Reply Email:</strong>{" "}
					<a
						href={`mailto:${message.email}`}
						className="text-blue-500 hover:underline"
					>
						{message.email}
					</a>
				</li>
				<li>
					<strong>Reply Phone:</strong>{" "}
					<a
						href={`tel:${message.phone}`}
						className="text-blue-500 hover:underline"
					>
						{message.phone}
					</a>
				</li>
				<li>
					<strong>Received:</strong>{" "}
					{new Date(message.createdAt || "").toLocaleDateString()}
				</li>
			</ul>
			<button
				className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
				onClick={handleReadClick}
			>
				{message?.read ? "Mark as Unread" : "Mark as Read"}
			</button>
			<button
				className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
				onClick={handleDeleteClick}
			>
				Delete
			</button>
		</div>
	);
};

export default MessageCard;
