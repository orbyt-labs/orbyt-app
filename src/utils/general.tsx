export const tlc = (str: any) => str?.toLowerCase?.();

/**
 * Fetch that fails after timeout
 *
 * @param url - Url to fetch
 * @param options - Options to send with the request
 * @param timeout - Timeout to fail request
 *
 * @returns - Promise resolving the request
 */
export function timeoutFetch(url: any, options: any, timeout = 500) {
	return Promise.race([
		fetch(url, options),
		new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
	]);
}

export function findRouteNameFromNavigatorState(routes: any) {
	let route = routes?.[routes.length - 1];
	if (route.state) {
		route = route.state;
	}
	while (route !== undefined && route.index !== undefined) {
		route = route?.routes?.[route.index];
		if (route.state) {
			route = route.state;
		}
	}

	let name = route?.name;

	// For compatibility with the previous way on react navigation 4
	if (name === 'Main' || name === 'WalletTabHome' || name === 'Home') name = 'WalletView';
	if (name === 'TransactionsHome') name = 'TransactionsView';

	return name;
}
export const capitalize = (str: any) => (str && str.charAt(0).toUpperCase() + str.slice(1)) || false;

export const toLowerCaseEquals = (a: any, b: any) => {
	if (!a && !b) return false;
	return tlc(a) === tlc(b);
};

export const shallowEqual = (object1: any, object2: any) => {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		if (object1[key] !== object2[key]) {
			return false;
		}
	}

	return true;
};

/**
 * Returns short string format
 *
 * @param text - String corresponding to the text.
 * @param chars - Number of characters to show at the end and beginning. Defaults to 4.
 * @returns String corresponding to short text format.
 */
export const renderShortText = (text: any, chars = 4) => {
	try {
		// The 5 constant represents the 2 extra chars and the 3 dots.
		if (text.length <= chars * 2 + 5) return text;
		return `${text.substr(0, chars + 2)}...${text.substr(-chars)}`;
	} catch {
		return text;
	}
};