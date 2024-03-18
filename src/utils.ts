/**
 * Ensures a minimal delay for specified promise
 */
export const delayPromise = async <T>(
	promise: Promise<T>,
	minDelay: number = 300,
) => {
	const [response] = await Promise.all([
		promise,
		new Promise((resolve) => setTimeout(resolve, minDelay)),
	]);
	return response;
};

export const setViewTitle = (value: string, viewName: string) => {
	document.title = `${value} | ${viewName}`;
};
