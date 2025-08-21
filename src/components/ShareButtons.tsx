"use client";

import React from "react";
import { IProperty } from "@/types/types";
import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailShareButton,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
	EmailIcon,
} from "react-share";

type Props = {
	property: IProperty;
};

const ShareButtons: React.FC<Props> = ({ property }) => {
	const shareUrl = `${
		process.env.NEXT_PUBLIC_DOMAIN
	}/properties/${property._id?.toString()}`;

	return (
		<>
			<h3 className="text-xl font-bold text-center pt-2">
				Share This Property:
			</h3>
			<div className="flex gap-3 justify-center pb-5">
				<FacebookShareButton
					url={shareUrl}
					title={property.name}
					hashtag={`#${property.type.trim()}ForRent`}
				>
					<FacebookIcon size={40} round />
				</FacebookShareButton>
				<TwitterShareButton
					url={shareUrl}
					title={property.name}
					hashtags={[`#${property.type.trim()}ForRent`]}
				>
					<TwitterIcon size={40} round />
				</TwitterShareButton>
				<WhatsappShareButton
					url={shareUrl}
					title={property.name}
					separator="::"
				>
					<WhatsappIcon size={40} round />
				</WhatsappShareButton>
				<EmailShareButton
					url={shareUrl}
					subject={property.name}
					body={`Check out this property: ${property.name} - ${shareUrl}`}
				>
					<EmailIcon size={40} round />
				</EmailShareButton>
			</div>
		</>
	);
};

export default ShareButtons;
