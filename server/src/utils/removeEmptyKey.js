function removeEmptyKeys(obj) {
	for (const key in obj) {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			// Recursively call the function for nested objects
			removeEmptyKeys(obj[key]);
			if (Object.keys(obj[key]).length === 0) {
				// If the nested object is now empty, delete the key
				delete obj[key];
			}
		} else if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
			// Delete the key if it's empty, null, or undefined
			delete obj[key];
		}
	}
	return obj;
}
module.exports = {
	removeEmptyKeys,
};
