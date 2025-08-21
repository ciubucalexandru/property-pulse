export const convertToSerializableObject = (
	leanDocument: Record<string, any> | null
) => {
	if (!leanDocument) {
		return null;
	}
	for (const key of Object.keys(leanDocument)) {
		if (leanDocument[key].toJSON && leanDocument[key].toString) {
			leanDocument[key] = leanDocument[key].toString();
		}
	}

	return leanDocument;
};
