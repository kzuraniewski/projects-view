import { useEffect, useState } from 'react';
import { getUrlParam } from '@/utils';

export type SearchParamPrimitive = string | number | null;

export type SearchParamParser<ReturnValue> = (param: string) => ReturnValue;

const useSearchParam = <ValueType extends SearchParamPrimitive = string>(
	key: string,
	defaultValue: ValueType,
	parser: SearchParamParser<ValueType>,
) => {
	const [value, setValue] = useState(() => {
		const param = getUrlParam(key);
		if (!param) return defaultValue;

		try {
			return parser(param);
		} catch {
			return defaultValue;
		}
	});

	const refreshUrl = () => {
		const url = new URL(window.location.href);

		if (value === null || value === '') {
			url.searchParams.delete(key);
		} else {
			url.searchParams.set(key, value.toString());
		}

		window.history.replaceState({}, '', url);
	};

	useEffect(refreshUrl, [value]);

	return [value, setValue] as const;
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

export default useSearchParam;
