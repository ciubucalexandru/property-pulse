"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";
import { PropertyFormData } from "@/types/types";
import { parsePropertyFormData } from "@/utils/parsePropertyFormData";

export default async function addProperty(formData: FormData) {
	await connectDB();
	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("User ID is required");
	}

	const { userId } = sessionUser;

	const { images, ...data }: PropertyFormData =
		parsePropertyFormData(formData);

	const imageUrls = [];

	for (const imageFile of images) {
		const imageBuffer = await imageFile.arrayBuffer();
		const imageArray = Array.from(new Uint8Array(imageBuffer));
		const imageData = Buffer.from(imageArray);

		const imageBase64 = imageData.toString("base64");

		const result = await cloudinary.uploader.upload(
			`data:image/png;base64,${imageBase64}`,
			{
				folder: "propertypulse",
			}
		);

		imageUrls.push(result.secure_url);
	}

	const newProperty = new Property({
		owner: userId,
		...data,
		images: imageUrls,
	});
	await newProperty.save();

	revalidatePath("/", "layout");
	redirect(`/properties/${newProperty._id.toString()}`);
}
