"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { PropertyFormData } from "@/types/types";
import { getSessionUser } from "@/utils/getSessionUser";
import { parsePropertyFormData } from "@/utils/parsePropertyFormData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const updateProperty = async (propertyId: string, formData: FormData) => {
	await connectDB();
	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("User ID is required");
	}

	const { userId } = sessionUser;

	const existingProperty = await Property.findById(propertyId);

	if (existingProperty.owner.toString() !== userId) {
		throw new Error("Current user does not own this property");
	}

	const data: PropertyFormData = parsePropertyFormData(formData);

	const updatedProperty = await Property.findByIdAndUpdate(propertyId, {
		...data,
		images: existingProperty.images,
	});

	revalidatePath("/", "layout");

	redirect(`/properties/${updatedProperty._id.toString()}`);
};

export default updateProperty;
