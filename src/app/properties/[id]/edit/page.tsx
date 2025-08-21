import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { IProperty } from "@/types/types";
import { convertToSerializableObject } from "@/utils/convertToObject";
import React from "react";

interface EditPropertyPageProps {
	params: {
		id: string;
	};
}

const EditPropertyPage = async ({ params }: EditPropertyPageProps) => {
	connectDB();
	const propertyDoc = await Property.findById(params.id).lean<IProperty>();
	const property = convertToSerializableObject(propertyDoc);

	if (!property) {
		throw new Error("Property not found");
	}

	return (
		<section className="bg-blue-50">
			<div className="container m-auto max-w-2xl py-24">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<PropertyEditForm property={property as IProperty} />
				</div>
			</div>
		</section>
	);
};

export default EditPropertyPage;
