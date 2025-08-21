import type { AuthOptions, Profile } from "next-auth";
import Google from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions: AuthOptions = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		async signIn({ profile }) {
			await connectDB();
			const userExists = await User.findOne({ email: profile?.email });

			if (!userExists) {
				const username = profile?.name?.slice(0, 20);
				await User.create({
					email: profile?.email,
					username,
					/* eslint-disable  @typescript-eslint/no-explicit-any */
					image: (profile as any).picture,
				});
			}

			return true;
		},
		async session({ session }) {
			if (session?.user) {
				const user = await User.findOne({ email: session.user?.email });

				/* eslint-disable  @typescript-eslint/no-explicit-any */
				(session.user as any).id = user?._id.toString();
			}

			return session;
		},
	},
};
