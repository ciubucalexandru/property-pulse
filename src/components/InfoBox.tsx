import React, { PropsWithChildren } from "react";
import Link from "next/link";

interface InfoBoxProps extends PropsWithChildren {
	heading: string;
	buttonInfo: {
		text: string;
		href: string;
		backgroundColor?: string;
	};
	backgroundColor?: string;
	textColor?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
	heading,
	backgroundColor = "bg-gray-100",
	textColor = "text-gray-800",
	buttonInfo: { text, href, backgroundColor: buttonBgColor = "bg-blue-500" },
	children,
}) => (
	<div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
		<h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
		<p className={`${textColor} mt-2 mb-4`}>{children}</p>
		<Link
			href={href}
			className={`${buttonBgColor} inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
		>
			{text}
		</Link>
	</div>
);

export default InfoBox;
