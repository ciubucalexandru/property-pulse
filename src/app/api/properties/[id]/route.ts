import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (
	_request: Request,
	{ params }: { params: Promise<{ id: string }> }
) => {
	try {
		await connectDB();
		const { id } = await params;

		const property = await Property.findById(id);

		if (!property) {
			return new Response(
				JSON.stringify({ error: "Property not found" }),
				{
					status: 404,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		return new Response(JSON.stringify({ property }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: "Failed to fetch property" }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
};
