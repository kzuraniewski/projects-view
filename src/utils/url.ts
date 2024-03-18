export type SearchParamPrimitive = string | number | null;

export type SearchParamParser<ReturnValue> = (param: string) => ReturnValue;

export const getSearchParam = (key: string) => {
	const url = new URL(window.location.href);
	return url.searchParams.get(key);
};

export class SearchParamParseError extends Error {
	constructor(param: string) {
		super(`Failed to parse search param: ${param}`);
		this.name = 'SearchParamParseError';
	}
}

export const numberParser: SearchParamParser<number> = (param) => {
	const parsed = Number(param);

	if (!isNaN(parsed) && parsed > 0) return parsed;
	else throw new SearchParamParseError(param);
};
