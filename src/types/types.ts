import { Types } from "mongoose";

export interface IProperty {
	_id?: Types.ObjectId;
	owner: Types.ObjectId;
	name: string;
	type: string;
	description?: string;
	location?: {
		street?: string;
		city?: string;
		state?: string;
		zipcode?: string;
	};
	beds: number;
	baths: number;
	square_feet: number;
	amenities?: string[];
	rates?: {
		nightly?: number;
		weekly?: number;
		monthly?: number;
	};
	seller_info?: {
		name?: string;
		email?: string;
		phone?: string;
	};
	images?: string[];
	is_featured?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export type PropertyFormData = {
	type:
		| "Apartment"
		| "Condo"
		| "House"
		| "CabinOrCottage"
		| "Room"
		| "Studio"
		| "Other";

	name: string;
	description?: string;

	location: {
		street?: string;
		city: string;
		state: string;
		zipcode?: string;
	};

	beds: number;
	baths: number;
	square_feet: number;

	amenities?: string[];

	rates?: {
		weekly?: number;
		monthly?: number;
		nightly?: number;
	};

	seller_info: {
		name?: string;
		email: string;
		phone?: string;
	};

	images: File[]; // multiple file input
};
export interface IUser {
	_id?: Types.ObjectId;
	email: string;
	username: string;
	image?: string;
	bookmarks?: Types.ObjectId[]; // references Property[]
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IMessage {
	_id?: Types.ObjectId;
	sender: Types.ObjectId | IUser; // Reference to User
	recipient: Types.ObjectId | IUser; // Reference to User
	property: Types.ObjectId | IProperty; // Reference to Property
	name: string;
	email: string;
	phone?: string;
	body?: string;
	read?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
