import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

export const getSessionUser = async () => {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return null;
	}

	return {
		user: session.user,
		/* eslint-disable  @typescript-eslint/no-explicit-any */
		userId: (session.user as any).id,
	};
};
