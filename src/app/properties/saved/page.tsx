import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { IProperty } from "@/types/types";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedPropertiesPage: React.FC = async () => {
	await connectDB();
	const { userId } = (await getSessionUser()) || {};

	const { bookmarks } = await User.findById(userId).populate("bookmarks");

	return (
		<section className="px-4 py-6">
			<div className="container lg:continaer m-auto px-4 py-6">
				<h1 className="text-2xl mb-4">
					{bookmarks.length === 0 ? (
						"You have no saved properties"
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{bookmarks.map((property: IProperty) => (
								<PropertyCard
									property={property}
									key={property._id?.toString()}
								/>
							))}
						</div>
					)}
				</h1>
			</div>
		</section>
	);
};

export default SavedPropertiesPage;
