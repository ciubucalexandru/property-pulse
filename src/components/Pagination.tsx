import React from "react";
import Link from "next/link";

type Props = {
	page: number;
	pageSize: number;
	totalItems: number;
};

const Pagination: React.FC<Props> = ({ page, pageSize, totalItems }) => {
	const totalPages = Math.ceil(totalItems / pageSize);

	console.log({ page, pageSize, totalItems, totalPages });
	return (
		<section className="container mx-auto flex justify-center items-center my-8">
			{page > 1 ? (
				<Link
					href={`/properties?page=${page - 1}&pageSize=${pageSize}`}
					className="mr-2 px-2 py-1 border border-gray-300 rounded"
				>
					Previous
				</Link>
			) : null}

			<span className="mx-2">
				Page {page} of {totalPages}
			</span>
			{page < totalPages ? (
				<Link
					href={`/properties?page=${page + 1}&pageSize=${pageSize}`}
					className="ml-2 px-2 py-1 border border-gray-300 rounded"
				>
					Next
				</Link>
			) : null}
		</section>
	);
};

export default Pagination;
