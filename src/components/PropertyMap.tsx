"use client";

import React, { useEffect, useState } from "react";
import { IProperty } from "@/types/types";
import { fromAddress, OutputFormat, setDefaults } from "react-geocode";
import Map, { Marker } from "react-map-gl/mapbox";
import Image from "next/image";
import pin from "../../public/pin.svg";
import Spinner from "./Spinner";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {
	property: IProperty | null;
};

const PropertyMap: React.FC<Props> = ({ property }) => {
	const [lat, setLat] = useState(100);
	const [lng, setLng] = useState(40);
	const [loading, setLoading] = useState(true);
	const [geocodeError, setGeocodeError] = useState(false);

	setDefaults({
		key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
		language: "en",
		region: "us",
		outputFormat: OutputFormat.JSON,
	});

	if (!property) {
		return <div className="text-xl">No location data found</div>;
	}

	useEffect(() => {
		const fetchCoords = async () => {
			try {
				const res = await fromAddress(
					`${property.location?.street} ${property.location?.city} ${property.location?.state} ${property.location?.zipcode}`
				);

				if (res.results.length === 0) {
					setGeocodeError(true);
					return;
				}

				const { lat, lng } = res.results[0].geometry.location;
				setLat(lat);
				setLng(lng);
			} catch (error) {
				console.log(error);
				setGeocodeError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchCoords();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	if (geocodeError) {
		return <div className="text-xl">No location data found</div>;
	}

	return (
		<Map
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
			mapLib={import("mapbox-gl")}
			initialViewState={{
				longitude: lng,
				latitude: lat,
				zoom: 15,
			}}
			style={{ width: "100%", height: 500 }}
			mapStyle="mapbox://styles/mapbox/streets-v9"
		>
			<Marker longitude={lng} latitude={lat} anchor="bottom">
				<Image src={pin} alt="location" width={40} height={40} />
			</Marker>
		</Map>
	);
};

export default PropertyMap;
