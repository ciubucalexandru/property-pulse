"use client";

import { IProperty } from "@/types/types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import DefaultImage from "../../public/properties/a1.jpg";
import deleteProperty from "@/app/actions/deleteProperty";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ProfilePropertiesProps {
	properties: IProperty[];
}

const ProfileProperties: React.FC<ProfilePropertiesProps> = ({
	properties,
}) => {
	const router = useRouter();

	const handleDelete = async (propertyId: string | undefined) => {
		if (!propertyId) {
			throw new Error("Invalid Property ID");
		}

		const confirmed = window.confirm(
			"Are you sure you want to delete this property?"
		);

		if (!confirmed) {
			return;
		}

		await deleteProperty(propertyId);
		toast.success("Property Deleted Successfully");
		router.refresh();
	};

	return properties.map((property) => (
		<div className="mb-10" key={property._id?.toString()}>
			<Link href={`/properties/${property._id?.toString()}`}>
				<Image
					className="h-32 w-full rounded-md object-cover"
					src={property?.images?.[0] || DefaultImage}
					alt="Property 1"
					width={1000}
					height={300}
				/>
			</Link>
			<div className="mt-2">
				<p className="text-lg font-semibold">{property.name}</p>
				<p className="text-gray-600">
					{property?.location?.street} {property?.location?.city}{" "}
					{property?.location?.state}
				</p>
			</div>
			<div className="mt-2">
				<Link
					href={`/properties/${property._id?.toString()}/edit`}
					className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
				>
					Edit
				</Link>
				<button
					className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
					type="button"
					onClick={() => handleDelete(property._id?.toString())}
				>
					Delete
				</button>
			</div>
		</div>
	));
};

export default ProfileProperties;
