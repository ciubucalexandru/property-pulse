import React from "react";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { IProperty } from "@/types/types";
import Pagination from "@/components/Pagination";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";

interface PropertiesPageProps {
	searchParams: Promise<{
		page?: string;
		pageSize?: string;
	}>;
}

const PropertiesPage: React.FC<PropertiesPageProps> = async ({
	searchParams,
}) => {
	await connectDB();
	const { page = "1", pageSize = "9" } = await searchParams;

	if (isNaN(parseInt(page)) || isNaN(parseInt(pageSize))) {
		redirect("/properties?page=1&pageSize=2", RedirectType.replace);
	}

	const skip = (parseInt(page) - 1) * parseInt(pageSize);
	const total = await Property.countDocuments({});

	const properties = await Property.find({})
		.skip(skip)
		.limit(parseInt(pageSize))
		.lean<IProperty[]>();

	const showPagination = total > parseInt(pageSize);

	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				{properties.length === 0 ? (
					<p>No properties found</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{properties.map((property: IProperty) => (
							<PropertyCard
								key={property._id?.toString()}
								property={property}
							/>
						))}
					</div>
				)}
				{showPagination && (
					<Pagination
						page={parseInt(page)}
						pageSize={parseInt(pageSize)}
						totalItems={total}
					/>
				)}
			</div>
		</section>
	);
};

export default PropertiesPage;
