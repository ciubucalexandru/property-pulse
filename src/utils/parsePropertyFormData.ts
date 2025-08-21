import { PropertyFormData } from "@/types/types";

export function parsePropertyFormData(formData: FormData): PropertyFormData {
	return {
		type: formData.get("type") as PropertyFormData["type"],
		name: formData.get("name") as string,
		description: (formData.get("description") as string) || undefined,

		location: {
			street: (formData.get("location.street") as string) || undefined,
			city: formData.get("location.city") as string,
			state: formData.get("location.state") as string,
			zipcode: (formData.get("location.zipcode") as string) || undefined,
		},

		beds: Number(formData.get("beds")),
		baths: Number(formData.get("baths")),
		square_feet: Number(formData.get("square_feet")),

		amenities: formData.getAll("amenities").map((a) => a.toString()),

		rates: {
			weekly: formData.get("rates.weekly")
				? Number(formData.get("rates.weekly"))
				: undefined,
			monthly: formData.get("rates.monthly")
				? Number(formData.get("rates.monthly"))
				: undefined,
			nightly: formData.get("rates.nightly")
				? Number(formData.get("rates.nightly"))
				: undefined,
		},

		seller_info: {
			name: (formData.get("seller_info.name") as string) || undefined,
			email: formData.get("seller_info.email") as string,
			phone: (formData.get("seller_info.phone") as string) || undefined,
		},

		images: formData.getAll("images") as File[],
	};
}
