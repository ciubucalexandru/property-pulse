"use client";

import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

type GlobalContextType = {
	unreadCount: string;
	setUnreadCount: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [unreadCount, setUnreadCount] = useState<string>("");

	const { data: session } = useSession();

	useEffect(() => {
		if (session && session.user) {
			getUnreadMessageCount().then((res) => {
				if (res.count) setUnreadCount(res.count.toString());
			});
		}
	}, [getUnreadMessageCount, session]);

	return (
		<GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error(
			"useGlobalContext must be used within a GlobalProvider"
		);
	}
	return context;
};
