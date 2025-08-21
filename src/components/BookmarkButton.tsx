"use client";

import React, { useEffect, useState } from "react";
import { IProperty } from "@/types/types";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

type Props = {
	property: IProperty;
};

const BookmarkButton: React.FC<Props> = ({ property }) => {
	const { data: session } = useSession();
	const userId = (session?.user as any)?.id;
	const [isBookmarked, setIsBookmarked] = useState(false);

	useEffect(() => {
		if (!userId) return;

		checkBookmarkStatus(property._id?.toString() || "").then((res) => {
			if ((res as any).error) {
				toast.error((res as any).error);
				return;
			}

			setIsBookmarked(res.isBookmarked);
		});
	}, [property._id, userId]);

	const handleClick = async () => {
		if (!userId) {
			toast.error("You need to be signed in for this action.");
			return;
		}

		bookmarkProperty(property._id?.toString() || "").then((response) => {
			if (!(response as any).error) {
				toast.success(response.message);
				setIsBookmarked(response.isBookmarked);
			} else {
				toast.error("Failed to bookmark property. Please try again.");
			}
		});
	};

	return !isBookmarked ? (
		<button
			onClick={handleClick}
			className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
		>
			<FaBookmark className="mr-2" /> Bookmark Property
		</button>
	) : (
		<button
			onClick={handleClick}
			className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
		>
			<FaBookmark className="mr-2" /> Remove Bookmark
		</button>
	);
};

export default BookmarkButton;
