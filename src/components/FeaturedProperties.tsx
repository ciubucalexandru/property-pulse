import connectDB from "@/config/database";
import Property from "@/models/Property";
import { IProperty } from "@/types/types";
import React from "react";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

const FeaturedProperties: React.FC = async () => {
	await connectDB();
	const properties = await Property.find({
		is_featured: true,
	}).lean<IProperty[]>();

	return properties.length > 0 ? (
		<section className="bg-blue-50 px--4 pt-6 pb 10">
			<div className="container-xl lg:container m-auto">
				<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
					Featured Properties
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{properties.map((property) => (
						<FeaturedPropertyCard
							key={property._id?.toString()}
							property={property}
						/>
					))}
				</div>
			</div>
		</section>
	) : null;
};

export default FeaturedProperties;
